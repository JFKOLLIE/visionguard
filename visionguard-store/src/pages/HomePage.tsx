import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Star, ShoppingCart, Eye, Moon, Monitor, Clock, Shield, Truck, RotateCcw, Mail, Phone } from 'lucide-react'
import { supabase, Product, Review } from '@/lib/supabase'
import { useCart } from '@/contexts/CartContext'
import toast from 'react-hot-toast'

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const location = useLocation()

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

  // Handle hash-based navigation
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1) // Remove the '#' prefix
      const element = document.getElementById(sectionId)
      if (element) {
        // Small delay to ensure the page is fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [location.hash])

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
      <section className="bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-full text-sm font-semibold">
                  <Shield className="h-4 w-4 mr-2" />
                  URGENT: Protect Your Eyes Now
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  <span className="text-red-600">STOP</span> Digital Eye Strain<br/>
                  <span className="text-teal-600">Before It Stops You</span>
                </h1>
                <p className="text-2xl text-gray-700 leading-relaxed font-medium">
                  The <span className="text-blue-600 font-bold">#1 Anti-Blue Light Glasses</span> trusted by 50,000+ professionals. 
                  Protect your eyes from harmful computer light - <span className="text-green-600 font-bold">Work longer, sleep better, eliminate headaches.</span>
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">✅ Clinically Proven Results in 7 Days:</h3>
                <ul className="space-y-2 text-lg text-gray-700">
                  <li className="flex items-center"><span className="text-green-500 mr-2">•</span> 89% reduction in eye strain symptoms</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">•</span> 67% improvement in sleep quality</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">•</span> 73% fewer headaches from screens</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('products')}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-10 py-5 rounded-xl font-bold text-xl hover:from-blue-700 hover:to-teal-700 transition-all shadow-lg transform hover:scale-105"
                >
                  🛡️ Get Eye Protection - Only $39.99
                </button>
                <button 
                  onClick={() => scrollToSection('benefits')}
                  className="border-3 border-blue-600 text-blue-600 px-8 py-5 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors"
                >
                  See the Science Behind It
                </button>
              </div>
              
              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="font-semibold">30-Day Money Back Guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-green-500" />
                  <span className="font-semibold">FREE Worldwide Shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold">4.9/5 Stars (1,247+ Reviews)</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="/images/blue-light-glasses-computer-screen-reflection-eye-close-up.jpg" 
                  alt="Anti-Blue Light Glasses Protection" 
                  className="w-full h-96 object-cover rounded-2xl"
                />
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full font-bold text-lg transform rotate-12 shadow-lg">
                  BLOCKS 65% BLUE LIGHT
                </div>
                <div className="absolute -bottom-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
                  ✅ Eye Strain Relief Guaranteed
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
            <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-4">
              ⚠️ HEALTH ALERT: Digital Eye Strain Epidemic
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Your Eyes Are <span className="text-red-600">In Danger</span> Right Now
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              <span className="text-red-600 font-bold">WARNING:</span> Harmful blue light from screens causes permanent eye damage, 
              chronic headaches, and disrupts sleep patterns. <span className="text-blue-600 font-bold">Anti-blue light glasses</span> 
              provide immediate protection and relief.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="relative">
              <img 
                src="/images/professional_man_digital_eye_strain_red_eyes_computer.jpg" 
                alt="Digital Eye Strain Symptoms" 
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-red-500 bg-opacity-20 rounded-2xl flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-bold text-red-600 mb-2">❌ WITHOUT PROTECTION</h3>
                  <ul className="text-sm text-gray-700">
                    <li>• Chronic eye strain & headaches</li>
                    <li>• Dry, irritated, red eyes</li>
                    <li>• Poor sleep quality</li>
                    <li>• Reduced productivity</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/images/person-blue-light-glasses-working-laptop-comfortable-lifestyle.jpg" 
                alt="Comfortable Work with Blue Light Glasses" 
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-green-500 bg-opacity-20 rounded-b-2xl flex items-end justify-center pb-6">
                <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-bold text-green-600 mb-2">✅ WITH ANTI-BLUE LIGHT</h3>
                  <ul className="text-sm text-gray-700">
                    <li>• Comfortable 12+ hour work sessions</li>
                    <li>• Clear, relaxed vision</li>
                    <li>• Better sleep & energy</li>
                    <li>• Enhanced focus & productivity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 p-6 bg-blue-50 rounded-xl">
              <div className="bg-red-500 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">BLOCK Harmful Blue Light</h3>
              <p className="text-gray-600">
                Filter 50-65% of dangerous blue light wavelengths (400-490nm) that cause permanent retinal damage and macular degeneration.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 bg-purple-50 rounded-xl">
              <div className="bg-purple-600 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Moon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">RESTORE Sleep Quality</h3>
              <p className="text-gray-600">
                Protect natural melatonin production disrupted by blue light. Fall asleep faster and wake up refreshed.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 bg-green-50 rounded-xl">
              <div className="bg-green-600 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Monitor className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">ELIMINATE Eye Strain</h3>
              <p className="text-gray-600">
                Stop headaches, dry eyes, and blurred vision instantly. Work comfortably for 12+ hours without fatigue.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 bg-orange-50 rounded-xl">
              <div className="bg-orange-600 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">PREVENT Long-term Damage</h3>
              <p className="text-gray-600">
                Protect against cataracts, macular degeneration, and premature aging of your eyes from screen exposure.
              </p>
            </div>
          </div>

          {/* Customer Success Stories */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-12 text-white">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">👥 Join Thousands Who've Transformed Their Digital Life</h3>
              <p className="text-xl opacity-90">Real results from real customers who chose eye protection</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white bg-opacity-20 rounded-xl p-6">
                <div className="text-5xl font-bold mb-2">12+</div>
                <div className="text-lg font-semibold">Hours Comfortable Screen Time</div>
                <div className="text-sm opacity-80">Work all day without eye fatigue</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-6">
                <div className="text-5xl font-bold mb-2">30min</div>
                <div className="text-lg font-semibold">Faster Sleep</div>
                <div className="text-sm opacity-80">Fall asleep naturally after screen time</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-6">
                <div className="text-5xl font-bold mb-2">90%</div>
                <div className="text-lg font-semibold">Fewer Headaches</div>
                <div className="text-sm opacity-80">Say goodbye to screen-induced pain</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              ✨ PREMIUM COLLECTION
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Choose Your <span className="text-blue-600">Perfect Style</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Five stunning frame styles, all featuring the same premium blue light protection technology. 
              <span className="text-blue-600 font-bold">Every pair is $39.99</span> with 
              <span className="text-green-600 font-bold">free worldwide shipping</span>.
            </p>
          </div>

          {/* Product Video Section */}
          <div className="mb-16 bg-white rounded-3xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                🎥 Experience the Blue Light Protection Difference
              </h3>
              <p className="text-xl text-gray-600 mb-6">
                See how our premium anti-blue light glasses protect your eyes and transform your digital experience
              </p>
            </div>
            
            <div className="relative max-w-4xl mx-auto mb-8">
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative w-full h-0" style={{paddingBottom: '56.25%'}}>
                  <video
                    src="/videos/blue-light-glasses-demo.mp4"
                    controls
                    className="absolute top-0 left-0 w-full h-full rounded-2xl object-cover"
                    poster="/images/hero-main-blue-light-glasses.png"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white text-center">
              <h4 className="text-xl font-bold mb-4">What You'll Discover:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="text-3xl mb-2">😌</div>
                  <div className="text-sm font-semibold">All-Day Comfort</div>
                  <div className="text-xs opacity-80 mt-1">Work without eye strain</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="text-3xl mb-2">😴</div>
                  <div className="text-sm font-semibold">Better Sleep</div>
                  <div className="text-xs opacity-80 mt-1">Fall asleep faster naturally</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-sm font-semibold">Enhanced Focus</div>
                  <div className="text-xs opacity-80 mt-1">Stay productive longer</div>
                </div>
              </div>
            </div>
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
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    <span className="text-blue-600 font-bold">ANTI-BLUE LIGHT:</span> {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      🛡️ {product.blue_light_filter_percentage}% Protection
                    </span>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Protect My Eyes Now</span>
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
              <a href="mailto:support@visionguardglasses.store" className="text-blue-600 hover:text-blue-700 font-semibold">
                support@visionguardglasses.store
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