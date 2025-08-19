CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id UUID,
    stripe_payment_intent_id VARCHAR(255) UNIQUE,
    status VARCHAR(50) DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'usd',
    shipping_address JSONB,
    billing_address JSONB,
    customer_email VARCHAR(255),
    tracking_number VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);