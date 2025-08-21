import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type User = {
  id: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Simple, reliable admin credentials
const ADMIN_EMAIL = 'admin@visionguardglasses.store'
const ADMIN_PASSWORD = 'admin123'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Load user on mount (one-time check)
  useEffect(() => {
    const loadUser = () => {
      try {
        // Check for admin session in localStorage
        const adminSession = localStorage.getItem('visionguard_admin_session')
        
        if (adminSession) {
          const sessionData = JSON.parse(adminSession)
          
          // Check if session is still valid (24 hour expiry)
          const expiryTime = new Date(sessionData.created_at)
          expiryTime.setHours(expiryTime.getHours() + 24)
          
          if (expiryTime > new Date() && sessionData.email === ADMIN_EMAIL) {
            setUser({
              id: 'admin-user',
              email: sessionData.email,
              role: 'admin'
            })
          } else {
            // Session expired or invalid, clean up
            localStorage.removeItem('visionguard_admin_session')
            setUser(null)
          }
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error loading user session:', error)
        localStorage.removeItem('visionguard_admin_session')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    
    loadUser()
  }, [])

  // Simple admin sign-in method
  async function signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Simple credential check
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const sessionData = {
          email: ADMIN_EMAIL,
          created_at: new Date().toISOString()
        }
        
        localStorage.setItem('visionguard_admin_session', JSON.stringify(sessionData))
        
        setUser({
          id: 'admin-user',
          email: ADMIN_EMAIL,
          role: 'admin'
        })
        
        return { success: true }
      } else {
        return { success: false, error: 'Invalid credentials' }
      }
    } catch (error) {
      console.error('Sign-in error:', error)
      return { success: false, error: 'Sign-in failed' }
    }
  }

  async function signOut(): Promise<void> {
    try {
      localStorage.removeItem('visionguard_admin_session')
      setUser(null)
    } catch (error) {
      console.error('Sign-out error:', error)
    }
  }

  const isAdmin = user?.role === 'admin'

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}