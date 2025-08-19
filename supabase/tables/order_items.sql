CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price_at_time DECIMAL(10,2) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);