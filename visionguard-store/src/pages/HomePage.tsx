import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, ShoppingCart, Eye, Moon, Monitor, Clock, Shield, Truck, RotateCcw, Mail, Phone } from 'lucide-react'
import { supabase, Product, Review } from '@/lib/supabase'
import { useCart } from '@/contexts/CartContext'
import toast from 'react-hot-toast'

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch featured products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('featured', true)
          .order('created_at', { ascending: false })

        if (productsError) throw productsError
        setProducts(productsData || [])

        // Fetch featured reviews
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select('*')
          .eq('featured', true)
          .order('created_at', { ascending: false })

        if (reviewsError) throw reviewsError
        setReviews(reviewsData || [])
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Reduce Digital Eye Strain & Work Comfortably Longer
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Professional blue light glasses that protect your eyes from harmful screen exposure. 
                Eliminate headaches, improve sleep quality, and enhance your productivity with style.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('products')}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Shop Now - $29.99
                </button>
                <button 
                  onClick={() => scrollToSection('benefits')}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Learn More
                </button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span>30-Day Guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-green-500" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <img 
                  src="/images/classic-black-frame.jpg" 
                  alt="Blue Light Glasses" 
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold transform rotate-12">
                  50% Blue Light Blocked
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why 63% of Remote Workers Choose VisionGuard
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scientific research shows that digital eye strain affects millions. Our premium blue light glasses 
              provide immediate relief and long-term eye health protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Reduce Eye Strain</h3>
              <p className="text-gray-600">
                Filter 50-65% of harmful blue light to eliminate dry eyes, blurred vision, and fatigue.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Moon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Better Sleep</h3>
              <p className="text-gray-600">
                Maintain natural melatonin production for deeper, more restful sleep cycles.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Monitor className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Enhanced Productivity</h3>
              <p className="text-gray-600">
                Work comfortably for hours without headaches or visual discomfort.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">All-Day Comfort</h3>
              <p className="text-gray-600">
                Lightweight design you'll forget you're wearing - only 20 grams.
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="mt-16 bg-gray-50 rounded-2xl p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">63%</div>
                <div className="text-gray-700">of workers report digital eye strain</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">43%</div>
                <div className="text-gray-700">spend 13+ hours daily on screens</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">89%</div>
                <div className="text-gray-700">report immediate relief with blue light glasses</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Eye Protection That Complements Your Style
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our curated collection of premium blue light glasses. Each frame combines 
              advanced eye protection technology with modern, fashionable designs.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-3 rounded mb-4"></div>
                  <div className="bg-gray-200 h-8 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6">
                  <Link to={`/product/${product.id}`}>
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg mb-4 hover:scale-105 transition-transform"
                    />
                  </Link>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {product.blue_light_filter_percentage}% Filter
                    </span>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link 
              to="/#products"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              <span>View All Products</span>
              <ShoppingCart className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section id="how-to-use" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How to Maximize Your Eye Protection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get the most benefit from your VisionGuard glasses with these simple usage guidelines 
              backed by optical health research.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Wear During Screen Time</h3>
              <p className="text-gray-600">
                Put on your glasses before starting any digital work. Ideal for computer work, 
                gaming, or mobile device use for 2+ hours.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Evening Protection</h3>
              <p className="text-gray-600">
                Wear 2-3 hours before bedtime when using devices to maintain healthy sleep cycles 
                and natural melatonin production.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Care & Maintenance</h3>
              <p className="text-gray-600">
                Clean with provided microfiber cloth. Store in protective case when not in use. 
                Avoid harsh chemicals or paper towels.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-blue-50 rounded-2xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pro Tips for Maximum Benefit</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="bg-green-500 rounded-full w-2 h-2 mt-2"></div>
                    <span className="text-gray-700">Take 20-second breaks every 20 minutes to look at something 20 feet away</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-green-500 rounded-full w-2 h-2 mt-2"></div>
                    <span className="text-gray-700">Adjust screen brightness to match your surroundings</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-green-500 rounded-full w-2 h-2 mt-2"></div>
                    <span className="text-gray-700">Position screens 20-24 inches from your eyes</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="bg-green-500 rounded-full w-2 h-2 mt-2"></div>
                    <span className="text-gray-700">Blink frequently to keep eyes naturally lubricated</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-green-500 rounded-full w-2 h-2 mt-2"></div>
                    <span className="text-gray-700">Use glasses consistently for 1-2 weeks to see full benefits</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-green-500 rounded-full w-2 h-2 mt-2"></div>
                    <span className="text-gray-700">Keep a pair at work and one at home for convenience</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied customers who have transformed their digital experience 
              with VisionGuard blue light glasses.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                  <div className="flex space-x-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="bg-gray-200 h-5 w-5 rounded"></div>
                    ))}
                  </div>
                  <div className="bg-gray-200 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${
                          i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">"{review.review_text}"</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{review.customer_name}</span>
                    {review.verified_purchase && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <div className="bg-white rounded-xl p-8 shadow-sm max-w-md mx-auto">
              <div className="text-4xl font-bold text-blue-600 mb-2">4.9/5</div>
              <div className="flex justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600">Based on 1,247+ verified reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Risk-Free 30-Day Money Back Guarantee
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
              Try VisionGuard glasses risk-free. If you don't experience reduced eye strain and improved 
              comfort within 30 days, we'll refund your purchase completely.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Truck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Free Worldwide Shipping</h3>
                <p className="opacity-90">No shipping fees. Delivered to your door in 7-10 business days.</p>
              </div>

              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <RotateCcw className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
                <p className="opacity-90">Simple return process. No questions asked within 30 days.</p>
              </div>

              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
                <p className="opacity-90">Premium materials and construction backed by our quality promise.</p>
              </div>
            </div>

            <button 
              onClick={() => scrollToSection('products')}
              className="bg-white text-blue-600 px-12 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Start Your Risk-Free Trial - $29.99
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Questions? We're Here to Help
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our customer service team is available 24/7 to help you choose the perfect blue light glasses 
              and answer any questions about your eye health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Email Support</h3>
              <p className="text-gray-600">Get detailed answers to your questions</p>
              <a href="mailto:support@visionguardglasses.com" className="text-blue-600 hover:text-blue-700 font-semibold">
                support@visionguardglasses.com
              </a>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Phone Support</h3>
              <p className="text-gray-600">Speak directly with our experts</p>
              <a href="tel:+12027737185" className="text-blue-600 hover:text-blue-700 font-semibold">
                +1 (202) 773-7185
              </a>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Fast Response</h3>
              <p className="text-gray-600">Average response time under 2 hours</p>
              <span className="text-gray-700 font-semibold">Available 24/7</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}