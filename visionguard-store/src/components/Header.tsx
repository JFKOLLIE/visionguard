import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, X, Eye, Shield } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getCartCount } = useCart()
  const cartCount = getCartCount()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 rounded-full p-2">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">VisionGuard</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <button onClick={() => scrollToSection('products')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Products
            </button>
            <button onClick={() => scrollToSection('benefits')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Benefits
            </button>
            <button onClick={() => scrollToSection('reviews')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Reviews
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Contact
            </button>

          </nav>

          {/* Cart Icon */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <button 
                onClick={() => { scrollToSection('products'); setIsMenuOpen(false); }}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-left"
              >
                Products
              </button>
              <button 
                onClick={() => { scrollToSection('benefits'); setIsMenuOpen(false); }}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-left"
              >
                Benefits
              </button>
              <button 
                onClick={() => { scrollToSection('reviews'); setIsMenuOpen(false); }}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-left"
              >
                Reviews
              </button>
              <button 
                onClick={() => { scrollToSection('contact'); setIsMenuOpen(false); }}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-left"
              >
                Contact
              </button>

            </nav>
          </div>
        )}
      </div>
    </header>
  )
}