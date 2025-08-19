Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Credentials': 'false'
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
        const { paymentIntentId } = await req.json();

        if (!paymentIntentId) {
            throw new Error('Payment intent ID is required');
        }

        // Get environment variables
        const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');

        if (!stripeSecretKey || !serviceRoleKey || !supabaseUrl) {
            throw new Error('Missing environment configuration');
        }

        // Retrieve payment intent from Stripe
        const stripeResponse = await fetch(`https://api.stripe.com/v1/payment_intents/${paymentIntentId}`, {
            headers: {
                'Authorization': `Bearer ${stripeSecretKey}`
            }
        });

        if (!stripeResponse.ok) {
            const errorData = await stripeResponse.text();
            throw new Error(`Failed to retrieve payment intent: ${errorData}`);
        }

        const paymentIntent = await stripeResponse.json();

        // Update order status based on payment intent status
        let orderStatus = 'pending';
        if (paymentIntent.status === 'succeeded') {
            orderStatus = 'confirmed';
        } else if (paymentIntent.status === 'canceled' || paymentIntent.status === 'payment_failed') {
            orderStatus = 'failed';
        }

        // Update order in database
        const updateResponse = await fetch(`${supabaseUrl}/rest/v1/orders?stripe_payment_intent_id=eq.${paymentIntentId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                status: orderStatus,
                updated_at: new Date().toISOString()
            })
        });

        if (!updateResponse.ok) {
            const errorText = await updateResponse.text();
            throw new Error(`Failed to update order: ${errorText}`);
        }

        const updatedOrder = await updateResponse.json();

        return new Response(JSON.stringify({
            data: {
                paymentStatus: paymentIntent.status,
                orderStatus: orderStatus,
                order: updatedOrder[0] || null
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Payment confirmation error:', error);

        return new Response(JSON.stringify({
            error: {
                code: 'PAYMENT_CONFIRMATION_FAILED',
                message: error.message
            }
        }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});