import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Truck, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 rounded-full p-2">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">VisionGuard</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Premium blue light glasses designed to protect your eyes and enhance your digital lifestyle. 
              Reduce eye strain, improve sleep, and work comfortably longer.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#products" className="text-gray-300 hover:text-white transition-colors">Our Products</a></li>
              <li><a href="#benefits" className="text-gray-300 hover:text-white transition-colors">Benefits</a></li>
              <li><a href="#reviews" className="text-gray-300 hover:text-white transition-colors">Customer Reviews</a></li>
              <li><a href="#how-to-use" className="text-gray-300 hover:text-white transition-colors">How to Use</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">30-Day Money Back Guarantee</li>
              <li className="text-gray-300">Free Worldwide Shipping</li>
              <li className="text-gray-300">24/7 Customer Support</li>
              <li className="text-gray-300">1-2 Day Processing Time</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">support@visionguardglasses.store</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">+1 2027737185</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5" />
                <span className="text-gray-300">
                  11468 Marketplace Dr. N, Ste. 600-1024<br />
                  Champlin MN 55316
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 VisionGuard. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="flex items-center space-x-1">
                <Truck className="h-4 w-4" />
                <span>FREE Shipping Worldwide</span>
              </span>
              <span className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>30-Day Guarantee</span>
              </span>
              <Link to="/admin/login" className="text-gray-500 hover:text-gray-400 text-xs ml-4 opacity-50">
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}