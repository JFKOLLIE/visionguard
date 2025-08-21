// Admin authentication utilities

// Simple password hashing using built-in browser crypto API
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'visionguard-salt-2024')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// Verify password against stored hash
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const hashedInput = await hashPassword(password)
  return hashedInput === storedHash
}

// Admin credential storage keys
const ADMIN_EMAIL_KEY = 'visionguard_admin_email'
const ADMIN_PASSWORD_HASH_KEY = 'visionguard_admin_password_hash'
const ADMIN_SETUP_COMPLETE_KEY = 'visionguard_admin_setup_complete'

// Check if admin setup is complete
export function isAdminSetupComplete(): boolean {
  return localStorage.getItem(ADMIN_SETUP_COMPLETE_KEY) === 'true'
}

// Get stored admin email
export function getStoredAdminEmail(): string | null {
  return localStorage.getItem(ADMIN_EMAIL_KEY)
}

// Store admin credentials securely
export async function storeAdminCredentials(email: string, password: string): Promise<void> {
  const passwordHash = await hashPassword(password)
  localStorage.setItem(ADMIN_EMAIL_KEY, email)
  localStorage.setItem(ADMIN_PASSWORD_HASH_KEY, passwordHash)
  localStorage.setItem(ADMIN_SETUP_COMPLETE_KEY, 'true')
}

// Verify admin credentials
export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  const storedEmail = getStoredAdminEmail()
  const storedPasswordHash = localStorage.getItem(ADMIN_PASSWORD_HASH_KEY)
  
  if (!storedEmail || !storedPasswordHash) {
    return false
  }
  
  if (email !== storedEmail) {
    return false
  }
  
  return await verifyPassword(password, storedPasswordHash)
}

// Update admin credentials
export async function updateAdminCredentials(currentPassword: string, newEmail: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
  const storedEmail = getStoredAdminEmail()
  const storedPasswordHash = localStorage.getItem(ADMIN_PASSWORD_HASH_KEY)
  
  if (!storedEmail || !storedPasswordHash) {
    return { success: false, error: 'No admin credentials found' }
  }
  
  // Verify current password
  const isCurrentPasswordValid = await verifyPassword(currentPassword, storedPasswordHash)
  if (!isCurrentPasswordValid) {
    return { success: false, error: 'Current password is incorrect' }
  }
  
  // Store new credentials
  await storeAdminCredentials(newEmail, newPassword)
  return { success: true }
}

// Reset admin setup (for development/testing)
export function resetAdminSetup(): void {
  localStorage.removeItem(ADMIN_EMAIL_KEY)
  localStorage.removeItem(ADMIN_PASSWORD_HASH_KEY)
  localStorage.removeItem(ADMIN_SETUP_COMPLETE_KEY)
  localStorage.removeItem('visionguard_admin_session')
}