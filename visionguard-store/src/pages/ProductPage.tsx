import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, ShoppingCart, Shield, Truck, RotateCcw, Eye, ArrowLeft } from 'lucide-react'
import { supabase, Product, Review } from '@/lib/supabase'
import { useCart } from '@/contexts/CartContext'
import toast from 'react-hot-toast'

export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return

      try {
        setLoading(true)

        // Fetch product details
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', parseInt(id))
          .maybeSingle()

        if (productError) throw productError
        if (!productData) {
          toast.error('Product not found')
          return
        }
        setProduct(productData)

        // Fetch product reviews
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select('*')
          .eq('product_id', parseInt(id))
          .order('created_at', { ascending: false })

        if (reviewsError) throw reviewsError
        setReviews(reviewsData || [])
      } catch (error) {
        console.error('Error fetching product:', error)
        toast.error('Failed to load product details')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (!product) return
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
            <div className="bg-gray-200 h-96 rounded-lg"></div>
            <div className="space-y-4">
              <div className="bg-gray-200 h-8 rounded"></div>
              <div className="bg-gray-200 h-6 rounded w-3/4"></div>
              <div className="bg-gray-200 h-20 rounded"></div>
              <div className="bg-gray-200 h-12 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-semibold">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <img 
              src={product.image_url}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-gray-600">({reviews.length} reviews)</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  {product.blue_light_filter_percentage}% Blue Light Filter
                </span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Benefits</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">Reduces digital eye strain and fatigue</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">Filters {product.blue_light_filter_percentage}% of harmful blue light</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">Improves sleep quality and comfort</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">Lightweight and stylish design</span>
                </li>
              </ul>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-bold text-blue-600">${product.price}</span>
                <span className="text-green-600 font-semibold">Free Shipping Worldwide</span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <label htmlFor="quantity" className="text-gray-700 font-medium">Quantity:</label>
                <select 
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  {[...Array(5)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 mb-4"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add {quantity} to Cart - ${(product.price * quantity).toFixed(2)}</span>
              </button>

              <Link 
                to="/cart"
                className="w-full border-2 border-blue-600 text-blue-600 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
              >
                <span>View Cart & Checkout</span>
              </Link>
            </div>

            {/* Guarantees */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">30-Day Guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Blue Light Filter</h3>
              <p className="text-gray-600">{product.blue_light_filter_percentage}% filtration</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Frame Style</h3>
              <p className="text-gray-600">{product.style}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Category</h3>
              <p className="text-gray-600">{product.category}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Weight</h3>
              <p className="text-gray-600">~20g (ultra-lightweight)</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{averageRating.toFixed(1)}/5</div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${
                      i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600">{reviews.length} reviews</div>
            </div>
          </div>

          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{review.customer_name}</span>
                      {review.verified_purchase && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.review_text}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </div>

        {/* Back to Products */}
        <div className="mt-12 text-center">
          <Link 
            to="/"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>
    </div>
  )
}