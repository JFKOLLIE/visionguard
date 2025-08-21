import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Package, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Search,
  Filter,
  Download,
  Eye,
  LogOut,
  RefreshCw,
  Calendar,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import toast from 'react-hot-toast'

type OrderWithItems = {
  id: number
  user_id?: string
  stripe_payment_intent_id: string
  status: string
  total_amount: number
  currency: string
  shipping_address?: any
  billing_address?: any
  customer_email?: string
  tracking_number?: string
  created_at: string
  updated_at: string
  order_items?: {
    id: number
    product_name: string
    quantity: number
    price_at_time: number
  }[]
}

export function AdminDashboardPage() {
  const { user, signOut, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState<OrderWithItems[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0
  })

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login')
      return
    }
    fetchOrders()
    fetchStats()
  }, [isAdmin, navigate])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      
      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (ordersError) throw ordersError

      // Fetch order items for each order
      const ordersWithItems = await Promise.all(
        (ordersData || []).map(async (order) => {
          const { data: itemsData } = await supabase
            .from('order_items')
            .select('*')
            .eq('order_id', order.id)

          return {
            ...order,
            order_items: itemsData || []
          }
        })
      )

      setOrders(ordersWithItems)
    } catch (error: any) {
      console.error('Error fetching orders:', error)
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      // Get total orders and revenue
      const { data: ordersData } = await supabase
        .from('orders')
        .select('status, total_amount')

      if (ordersData) {
        const totalOrders = ordersData.length
        const totalRevenue = ordersData.reduce((sum, order) => sum + order.total_amount, 0)
        const pendingOrders = ordersData.filter(order => order.status === 'pending').length
        const completedOrders = ordersData.filter(order => order.status === 'confirmed').length

        setStats({
          totalOrders,
          totalRevenue,
          pendingOrders,
          completedOrders
        })
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)

      if (error) throw error

      toast.success('Order status updated successfully')
      fetchOrders()
      fetchStats()
    } catch (error: any) {
      toast.error('Failed to update order status')
    }
  }

  const updateTrackingNumber = async (orderId: number, trackingNumber: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          tracking_number: trackingNumber,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)

      if (error) throw error

      toast.success('Tracking number updated successfully')
      fetchOrders()
    } catch (error: any) {
      toast.error('Failed to update tracking number')
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/admin/login')
    } catch (error) {
      toast.error('Failed to sign out')
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm) ||
      order.stripe_payment_intent_id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    
    const matchesDate = (() => {
      if (dateFilter === 'all') return true
      const orderDate = new Date(order.created_at)
      const now = new Date()
      
      switch (dateFilter) {
        case 'today':
          return orderDate.toDateString() === now.toDateString()
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          return orderDate >= weekAgo
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          return orderDate >= monthAgo
        default:
          return true
      }
    })()
    
    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-full p-2">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">VisionGuard Admin</h1>
                <p className="text-sm text-gray-600">Order Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <Link 
                to="/"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View Store
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-full p-3">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedOrders}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by order ID, email, or payment ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="failed">Failed</option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

            <button
              onClick={fetchOrders}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Orders ({filteredOrders.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-8 text-center">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No orders found matching your criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            Order #{order.id}
                          </div>
                          <div className="text-sm text-gray-500">
                            ${order.total_amount.toFixed(2)}
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(order.created_at).toLocaleDateString()}
                          </div>
                          {order.tracking_number && (
                            <div className="text-xs text-blue-600">
                              Tracking: {order.tracking_number}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm text-gray-900">
                            {order.customer_email}
                          </div>
                          {order.shipping_address && (
                            <div className="text-xs text-gray-500 mt-1">
                              {order.shipping_address.name}<br />
                              {order.shipping_address.line1}<br />
                              {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          {order.order_items?.map((item, index) => (
                            <div key={index} className="mb-1">
                              <span className="text-gray-900">{item.product_name}</span>
                              <br />
                              <span className="text-gray-500 text-xs">
                                Qty: {item.quantity} × ${item.price_at_time.toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)} border-0`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="failed">Failed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="Add tracking number"
                            defaultValue={order.tracking_number || ''}
                            onBlur={(e) => {
                              if (e.target.value !== (order.tracking_number || '')) {
                                updateTrackingNumber(order.id, e.target.value)
                              }
                            }}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                          />
                          <div className="flex space-x-1">
                            <button
                              onClick={() => navigator.clipboard.writeText(order.customer_email || '')}
                              className="text-blue-600 hover:text-blue-700"
                              title="Copy email"
                            >
                              <Mail className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => navigator.clipboard.writeText(`Order #${order.id}`)}
                              className="text-gray-600 hover:text-gray-700"
                              title="Copy order ID"
                            >
                              <Package className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}