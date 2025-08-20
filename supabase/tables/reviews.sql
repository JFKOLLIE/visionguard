CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    customer_email VARCHAR(255),
    customer_name VARCHAR(255),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    verified_purchase BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);