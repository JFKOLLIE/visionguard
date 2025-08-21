# PostureGuard Pro - Blue Light Blocking Glasses E-Commerce Store

## Overview

PostureGuard Pro is a modern e-commerce website specializing in premium blue light blocking glasses designed to protect your eyes and improve your digital wellness. Built with React and powered by Supabase, this application provides a seamless shopping experience for customers looking to reduce eye strain and improve sleep quality.

🌐 **Live Demo**: [https://nafex38sshi3.space.minimax.io](https://nafex38sshi3.space.minimax.io)

## Features

### 🛍️ E-Commerce Functionality
- **Product Catalog**: Browse our collection of premium blue light blocking glasses
- **Product Details**: Detailed product pages with specifications and benefits
- **Shopping Cart**: Add/remove items with persistent cart state
- **Secure Checkout**: Streamlined checkout process with form validation
- **Order Management**: Order confirmation and tracking

### 👤 User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Navigation**: Hash-based navigation with smooth scrolling between sections
- **Interactive UI**: Modern, clean interface with intuitive user interactions
- **Customer Reviews**: Real customer testimonials and reviews
- **Benefits Section**: Educational content about blue light protection

### 🔧 Technical Features
- **Real-time Database**: Supabase integration for dynamic product data
- **Form Handling**: Contact forms and checkout with validation
- **State Management**: React hooks for efficient state management
- **Modern Routing**: React Router DOM for single-page application navigation
- **Performance Optimized**: Fast loading times and smooth interactions

## Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **React Router DOM**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework for styling

### Backend
- **Supabase**: Backend-as-a-Service providing:
  - PostgreSQL Database
  - Real-time subscriptions
  - Authentication (if needed for future features)
  - RESTful APIs

### Deployment
- **Frontend**: Deployed on MiniMax hosting platform
- **Database**: Supabase cloud hosting
- **Version Control**: Git with GitHub repository

## Project Structure

```
postureguardpro/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable React components
│   │   ├── Header/       # Navigation header
│   │   ├── Footer/       # Footer component
│   │   ├── ProductCard/  # Product display cards
│   │   └── Cart/         # Shopping cart components
│   ├── pages/            # Page components
│   │   ├── HomePage/     # Main landing page
│   │   └── ProductPage/  # Individual product pages
│   ├── contexts/         # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript type definitions
│   └── App.tsx          # Main application component
├── package.json         # Project dependencies
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account (for database connection)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JFKOLLIE/postureguardpro.git
   cd postureguardpro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## Database Schema

The application uses the following Supabase database tables:

### Products Table
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  image_url VARCHAR,
  benefits TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR NOT NULL,
  customer_email VARCHAR NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Key Components

### HomePage Component
- Hero section with call-to-action
- Benefits explanation section
- Product showcase
- Customer testimonials
- Contact information

### ProductPage Component
- Individual product details
- Add to cart functionality
- Product specifications
- Customer reviews

### Header Component
- Site navigation with smooth scrolling
- Shopping cart icon with item count
- Mobile-responsive menu

## Recent Updates

### Bug Fixes (Latest)
- ✅ **Pricing Fix**: Updated homepage banner to show correct starting price ($39.99)
- ✅ **Navigation Fix**: Fixed header navigation links to work properly from all pages
- ✅ **Cross-page Navigation**: Implemented hash-based routing for seamless section navigation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Performance Considerations

- **Code Splitting**: Components are lazily loaded where appropriate
- **Image Optimization**: Images are optimized for web delivery
- **Bundle Size**: Dependencies are carefully chosen to minimize bundle size
- **Caching**: Proper browser caching headers for static assets

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is proprietary software. All rights reserved.

## Contact

**Developer**: JFKOLLIE  
**Email**: jfkollie@gmail.com  
**Repository**: [https://github.com/JFKOLLIE/postureguardpro](https://github.com/JFKOLLIE/postureguardpro)

---

## About PostureGuard Pro

PostureGuard Pro glasses are designed to:
- Block 99% of harmful blue light
- Reduce eye strain and fatigue
- Improve sleep quality
- Enhance focus and productivity
- Protect long-term eye health

**Protect your eyes. Enhance your life. Choose PostureGuard Pro.**