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
        // Get environment variables
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');

        if (!serviceRoleKey || !supabaseUrl) {
            throw new Error('Supabase configuration missing');
        }

        // Update the main product with AliExpress information
        const updateResponse = await fetch(`${supabaseUrl}/rest/v1/products?id=eq.1`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                name: 'Unisex Anti-Blue Light Glasses',
                description: 'Premium quality classic square frame blue light blocking glasses with clear and black frame options. Perfect for computer work, gaming, and digital device use. Features advanced blue light filtering technology to reduce eye strain and improve sleep quality. Unisex design with comfortable fit suitable for all-day wear. Lightweight and durable construction.',
                price: 12.99,
                image_url: '/images/aliexpress-product-main.avif',
                category: 'Blue Light Glasses',
                style: 'Classic Square Frame',
                blue_light_filter_percentage: 90,
                stock_quantity: 1000,
                featured: true,
                updated_at: new Date().toISOString()
            })
        });

        if (!updateResponse.ok) {
            // If update failed, try insert
            const insertResponse = await fetch(`${supabaseUrl}/rest/v1/products`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({
                    name: 'Unisex Anti-Blue Light Glasses',
                    description: 'Premium quality classic square frame blue light blocking glasses with clear and black frame options. Perfect for computer work, gaming, and digital device use. Features advanced blue light filtering technology to reduce eye strain and improve sleep quality. Unisex design with comfortable fit suitable for all-day wear. Lightweight and durable construction.',
                    price: 12.99,
                    image_url: '/images/aliexpress-product-main.avif',
                    category: 'Blue Light Glasses',
                    style: 'Classic Square Frame',
                    blue_light_filter_percentage: 90,
                    stock_quantity: 1000,
                    featured: true
                })
            });

            if (!insertResponse.ok) {
                const errorText = await insertResponse.text();
                throw new Error(`Failed to insert product: ${errorText}`);
            }

            const insertedProduct = await insertResponse.json();
            console.log('Product inserted:', insertedProduct);
        } else {
            const updatedProduct = await updateResponse.json();
            console.log('Product updated:', updatedProduct);
        }

        // Also update all featured products to competitive pricing
        const updateFeaturedResponse = await fetch(`${supabaseUrl}/rest/v1/products?featured=eq.true&price=gt.15`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price: 12.99,
                updated_at: new Date().toISOString()
            })
        });

        // Return success response
        return new Response(JSON.stringify({ 
            success: true,
            message: 'Product information updated successfully'
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error updating product:', error);
        
        // Return error response
        const errorResponse = {
            error: {
                code: 'UPDATE_ERROR',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});