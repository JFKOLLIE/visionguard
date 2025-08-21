import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { supabase, CartItem } from '@/lib/supabase'
import { useCart } from '@/contexts/CartContext'
import toast from 'react-hot-toast'
import { Loader2, CreditCard, User, MapPin } from 'lucide-react'

interface CheckoutFormProps {
  total: number
  cartItems: CartItem[]
}

export function CheckoutForm({ total, cartItems }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const { clearCart } = useCart()

  const [processing, setProcessing] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  })
  const [shippingAddress, setShippingAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US'
  })
  const [billingAddress, setBillingAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US'
  })
  const [sameBilling, setSameBilling] = useState(true)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      toast.error('Stripe is not loaded yet. Please try again.')
      return
    }

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      toast.error('Card information is required.')
      return
    }

    // Validate required fields
    if (!customerInfo.email || !customerInfo.firstName || !customerInfo.lastName) {
      toast.error('Please fill in all required customer information.')
      return
    }

    if (!shippingAddress.line1 || !shippingAddress.city || !shippingAddress.state || !shippingAddress.postal_code) {
      toast.error('Please fill in all required shipping address fields.')
      return
    }

    setProcessing(true)

    try {
      // Create payment intent
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          amount: total,
          currency: 'usd',
          cartItems: cartItems,
          customerEmail: customerInfo.email,
          shippingAddress: {
            ...shippingAddress,
            name: `${customerInfo.firstName} ${customerInfo.lastName}`
          },
          billingAddress: sameBilling ? {
            ...shippingAddress,
            name: `${customerInfo.firstName} ${customerInfo.lastName}`
          } : {
            ...billingAddress,
            name: `${customerInfo.firstName} ${customerInfo.lastName}`
          }
        }
      })

      if (paymentError) {
        throw new Error(paymentError.message || 'Failed to create payment intent')
      }

      const { clientSecret, orderId } = paymentData.data

      // Confirm payment with Stripe
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${customerInfo.firstName} ${customerInfo.lastName}`,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address: sameBilling ? {
              line1: shippingAddress.line1,
              line2: shippingAddress.line2,
              city: shippingAddress.city,
              state: shippingAddress.state,
              postal_code: shippingAddress.postal_code,
              country: shippingAddress.country
            } : {
              line1: billingAddress.line1,
              line2: billingAddress.line2,
              city: billingAddress.city,
              state: billingAddress.state,
              postal_code: billingAddress.postal_code,
              country: billingAddress.country
            }
          }
        }
      })

      if (confirmError) {
        throw new Error(confirmError.message || 'Payment failed')
      }

      if (paymentIntent.status === 'succeeded') {
        // Confirm payment with backend
        await supabase.functions.invoke('confirm-payment', {
          body: {
            paymentIntentId: paymentIntent.id
          }
        })

        // Send order confirmation email
        await supabase.functions.invoke('send-order-confirmation', {
          body: {
            orderId: orderId,
            customerEmail: customerInfo.email
          }
        })

        // Clear cart and redirect to success page
        clearCart()
        toast.success('Payment successful! Order confirmation sent to your email.')
        navigate(`/success?order=${orderId}&payment=${paymentIntent.id}`)
      } else {
        throw new Error('Payment was not successful')
      }
    } catch (error: any) {
      console.error('Payment error:', error)
      toast.error(error.message || 'Payment failed. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#374151',
        '::placeholder': {
          color: '#9CA3AF',
        },
      },
      invalid: {
        color: '#EF4444',
      },
    },
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Customer Information */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <User className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              value={customerInfo.firstName}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, firstName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              value={customerInfo.lastName}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, lastName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Shipping Address */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <MapPin className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>
        </div>

        <div>
          <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-2">
            Address Line 1 *
          </label>
          <input
            type="text"
            id="address1"
            value={shippingAddress.line1}
            onChange={(e) => setShippingAddress(prev => ({ ...prev, line1: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-2">
            Address Line 2 (Optional)
          </label>
          <input
            type="text"
            id="address2"
            value={shippingAddress.line2}
            onChange={(e) => setShippingAddress(prev => ({ ...prev, line2: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              id="city"
              value={shippingAddress.city}
              onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>
            <input
              type="text"
              id="state"
              value={shippingAddress.state}
              onChange={(e) => setShippingAddress(prev => ({ ...prev, state: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
              Postal Code *
            </label>
            <input
              type="text"
              id="postalCode"
              value={shippingAddress.postal_code}
              onChange={(e) => setShippingAddress(prev => ({ ...prev, postal_code: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
            Country *
          </label>
          <select
            id="country"
            value={shippingAddress.country}
            onChange={(e) => setShippingAddress(prev => ({ ...prev, country: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="IT">Italy</option>
            <option value="ES">Spain</option>
            <option value="NL">Netherlands</option>
            <option value="SE">Sweden</option>
            <option value="NO">Norway</option>
            <option value="DK">Denmark</option>
            <option value="FI">Finland</option>
            <option value="BE">Belgium</option>
            <option value="AT">Austria</option>
            <option value="CH">Switzerland</option>
            <option value="IE">Ireland</option>
            <option value="NZ">New Zealand</option>
            <option value="JP">Japan</option>
            <option value="SG">Singapore</option>
          </select>
        </div>
      </div>

      {/* Billing Address */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="sameBilling"
            checked={sameBilling}
            onChange={(e) => setSameBilling(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="sameBilling" className="text-sm font-medium text-gray-700">
            Billing address is the same as shipping address
          </label>
        </div>

        {!sameBilling && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Billing Address</h3>
            {/* Billing address fields (similar to shipping) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Line 1 *
              </label>
              <input
                type="text"
                value={billingAddress.line1}
                onChange={(e) => setBillingAddress(prev => ({ ...prev, line1: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required={!sameBilling}
              />
            </div>
            {/* Add other billing address fields as needed */}
          </div>
        )}
      </div>

      {/* Payment Information */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <CreditCard className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
        </div>

        <div className="p-4 border border-gray-300 rounded-lg">
          <CardElement options={cardElementOptions} />
        </div>

        <div className="text-sm text-gray-600">
          <p>Your payment information is encrypted and secure. We use Stripe for payment processing.</p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
      >
        {processing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Processing Payment...</span>
          </>
        ) : (
          <>
            <CreditCard className="h-5 w-5" />
            <span>Complete Order - ${total.toFixed(2)}</span>
          </>
        )}
      </button>

      <div className="text-center text-sm text-gray-600">
        <p>By placing your order, you agree to our terms of service and privacy policy.</p>
        <p className="mt-2">You will receive an order confirmation email shortly after payment.</p>
      </div>
    </form>
  )
}