import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xdpwlrajjrdiydikdztm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkcHdscmFqanJkaXlkaWtkenRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MzUxMTgsImV4cCI6MjA3MTIxMTExOH0.BnHkvRGmyzKpL7kPaeM8YdKdATX9hctMScnoj6pduWM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Product = {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  category: string
  style: string
  blue_light_filter_percentage: number
  stock_quantity: number
  featured: boolean
  created_at: string
  updated_at: string
}

export type Review = {
  id: number
  product_id: number
  customer_email: string
  customer_name: string
  rating: number
  review_text: string
  verified_purchase: boolean
  featured: boolean
  created_at: string
}

export type CartItem = {
  product_id: number
  product_name: string
  product_image_url: string
  price: number
  quantity: number
}

export type Order = {
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
}