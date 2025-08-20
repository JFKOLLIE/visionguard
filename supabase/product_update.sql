-- First, clear existing products
DELETE FROM products;

-- Reset the ID sequence
ALTER SEQUENCE products_id_seq RESTART WITH 1;

-- Insert the 5 new variants of blue light glasses
INSERT INTO products (name, description, price, image_url, category, style, blue_light_filter_percentage, stock_quantity, featured)
VALUES
-- Variant 1
('Classic Black Frame Blue Light Glasses', 'Stylish black frame blue light blocking glasses that reduce eye strain and protect against digital eye fatigue. Perfect for professionals and students who spend long hours in front of screens.', 39.99, '/images/classic-black-frame.jpg', 'Blue Light Glasses', 'Classic Black', 65, 100, true),

-- Variant 2
('Oversized Clear Frame Blue Light Glasses', 'Trendy oversized clear frame glasses with anti-blue light technology. Fashion-forward design with premium eye protection. Ideal for all-day computer use and gaming.', 39.99, '/images/modern-clear-frame.jpg', 'Blue Light Glasses', 'Oversized Clear', 65, 100, true),

-- Variant 3
('Round Vintage Frame Blue Light Glasses', 'Retro-inspired round frame glasses with effective blue light filtering. Combines classic style with modern eye protection technology. Lightweight and comfortable for extended wear.', 39.99, '/images/round-frame-vintage.jpg', 'Blue Light Glasses', 'Round Vintage', 65, 100, true),

-- Variant 4
('Rectangular Professional Blue Light Glasses', 'Sophisticated rectangular frame designed for the working professional. Premium blue light blocking lenses in a sleek, business-appropriate style. Reduces eye strain during long work sessions.', 39.99, '/images/rectangular-men.jpg', 'Blue Light Glasses', 'Rectangular Professional', 65, 100, true),

-- Variant 5
('Premium Metal Frame Blue Light Glasses', 'Luxury metal frame glasses with advanced blue light filtering technology. Durable construction with adjustable nose pads for a perfect fit. Superior protection for demanding digital lifestyles.', 39.99, '/images/metal-frame-premium.jpg', 'Blue Light Glasses', 'Metal Frame', 65, 100, true);