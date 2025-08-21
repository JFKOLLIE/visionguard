import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle, Package, Truck, Mail, Phone, ArrowRight } from 'lucide-react'

export function SuccessPage() {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('order')
  const paymentId = searchParams.get('payment')

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600">
            Thank you for your purchase. Your VisionGuard blue light glasses are on their way!
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Information</h3>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium">Order Number:</span> #{orderId}</p>
                <p><span className="font-medium">Payment ID:</span> {paymentId}</p>
                <p><span className="font-medium">Order Date:</span> {new Date().toLocaleDateString()}</p>
                <p><span className="font-medium">Status:</span> <span className="text-green-600 font-semibold">Confirmed</span></p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delivery Information</h3>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium">Processing Time:</span> 1-2 business days</p>
                <p><span className="font-medium">Shipping Method:</span> Standard (FREE)</p>
                <p><span className="font-medium">Estimated Delivery:</span> 7-10 business days</p>
                <p><span className="font-medium">Tracking:</span> Email will be sent when shipped</p>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-blue-50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <div className="bg-white rounded-lg p-4">
                <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">Order Processing</h3>
                <p className="text-gray-600 text-sm">
                  We'll prepare your order within 1-2 business days and send you a confirmation email.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <div className="bg-white rounded-lg p-4">
                <Truck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">Shipping</h3>
                <p className="text-gray-600 text-sm">
                  Your glasses will be shipped with tracking information sent to your email.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <div className="bg-white rounded-lg p-4">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">Enjoy!</h3>
                <p className="text-gray-600 text-sm">
                  Start protecting your eyes and improving your digital experience immediately.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips for New Users */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started with Your Blue Light Glasses</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">First Week Tips</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="bg-green-500 rounded-full w-2 h-2 mt-2"></div>
                  <span className="text-gray-700">Wear consistently during screen time for best results</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="bg-green-500 rounded-full w-2 h-2 mt-2"></div>
                  <span className="text-gray-700">Use 2-3 hours before bedtime when on devices</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="bg-green-500 rounded-full w-2 h-2 mt-2"></div>
                  <span className="text-gray-700">Clean with provided microfiber cloth daily</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="bg-green-500 rounded-full w-2 h-2 mt-2"></div>
                  <span className="text-gray-700">Give yourself 1-2 weeks to notice full benefits</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Care Instructions</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="bg-blue-500 rounded-full w-2 h-2 mt-2"></div>
                  <span className="text-gray-700">Store in provided protective case when not in use</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="bg-blue-500 rounded-full w-2 h-2 mt-2"></div>
                  <span className="text-gray-700">Avoid harsh chemicals or paper towels for cleaning</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="bg-blue-500 rounded-full w-2 h-2 mt-2"></div>
                  <span className="text-gray-700">Handle by the frames, not the lenses</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="bg-blue-500 rounded-full w-2 h-2 mt-2"></div>
                  <span className="text-gray-700">Keep away from extreme temperatures</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Customer Support */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Need Help?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-3">Get detailed answers to your questions</p>
              <a href="mailto:support@visionguardglasses.store" className="text-blue-600 hover:text-blue-700 font-semibold">
                support@visionguardglasses.store
              </a>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-3">Speak directly with our experts</p>
              <a href="tel:+12027737185" className="text-blue-600 hover:text-blue-700 font-semibold">
                +1 (202) 773-7185
              </a>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">30-Day Guarantee</h3>
              <p className="text-gray-600 mb-3">Not satisfied? Full refund within 30 days</p>
              <span className="text-gray-700 font-semibold">No questions asked</span>
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Want to protect more eyes? Share the benefits with family and friends!
          </p>
          <Link 
            to="/"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}