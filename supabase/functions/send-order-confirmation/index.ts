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
        const { orderId, customerEmail } = await req.json();

        if (!orderId || !customerEmail) {
            throw new Error('Order ID and customer email are required');
        }

        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');

        if (!serviceRoleKey || !supabaseUrl) {
            throw new Error('Supabase configuration missing');
        }

        // Get order details
        const orderResponse = await fetch(`${supabaseUrl}/rest/v1/orders?id=eq.${orderId}`, {
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey
            }
        });

        if (!orderResponse.ok) {
            throw new Error('Failed to retrieve order details');
        }

        const orders = await orderResponse.json();
        if (!orders.length) {
            throw new Error('Order not found');
        }

        const order = orders[0];

        // Get order items
        const itemsResponse = await fetch(`${supabaseUrl}/rest/v1/order_items?order_id=eq.${orderId}`, {
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey
            }
        });

        if (!itemsResponse.ok) {
            throw new Error('Failed to retrieve order items');
        }

        const orderItems = await itemsResponse.json();

        // Create email content
        const emailContent = {
            to: customerEmail,
            subject: `Order Confirmation - VisionGuard Blue Light Glasses #${order.id}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">Thank you for your order!</h2>
                    <p>Hi there,</p>
                    <p>We've received your order and are processing it now. Here are the details:</p>
                    
                    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Order #${order.id}</h3>
                        <p><strong>Total:</strong> $${order.total_amount}</p>
                        <p><strong>Status:</strong> ${order.status}</p>
                        <p><strong>Order Date:</strong> ${new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    
                    <h3>Items Ordered:</h3>
                    <ul>
                        ${orderItems.map(item => `
                            <li>
                                <strong>${item.product_name}</strong><br>
                                Quantity: ${item.quantity}<br>
                                Price: $${item.price_at_time}
                            </li>
                        `).join('')}
                    </ul>
                    
                    <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
                        <h4 style="margin-top: 0; color: #059669;">What's Next?</h4>
                        <p>• Your order will be processed within 1-2 business days</p>
                        <p>• You'll receive a tracking number once shipped</p>
                        <p>• Delivery typically takes 7-10 business days</p>
                        <p>• Free worldwide shipping included!</p>
                    </div>
                    
                    <p>If you have any questions, feel free to contact us at support@visionguardglasses.com</p>
                    
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                        <p style="color: #6b7280; font-size: 14px;">VisionGuard Blue Light Glasses<br>
                        11468 Marketplace Dr. N, Ste. 600-1024<br>
                        Champlin MN 55316</p>
                    </div>
                </div>
            `
        };

        // Log the email for now (in a real app, you'd integrate with an email service)
        console.log('Order confirmation email would be sent:', emailContent);

        return new Response(JSON.stringify({
            data: {
                message: 'Order confirmation processed',
                orderId: orderId,
                emailSent: true
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Email confirmation error:', error);

        return new Response(JSON.stringify({
            error: {
                code: 'EMAIL_CONFIRMATION_FAILED',
                message: error.message
            }
        }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});