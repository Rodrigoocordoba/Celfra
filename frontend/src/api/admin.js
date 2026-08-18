const API_BASE = import.meta.env.VITE_API_URL || 'https://celfra.onrender.com/api'

// Helper to get auth headers
const getHeaders = () => {
  const token = localStorage.getItem('celfra_admin_token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }
}

// ---------------------------------------------------------------------------
// Authentication
// ---------------------------------------------------------------------------

export async function adminLogin(password) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  })

  if (!res.ok) {
    throw new Error('Contraseña incorrecta')
  }

  const data = await res.json()
  localStorage.setItem('celfra_admin_token', data.access_token)
  return data
}

export function adminLogout() {
  localStorage.removeItem('celfra_admin_token')
}

export function isAuthenticated() {
  return !!localStorage.getItem('celfra_admin_token')
}

// ---------------------------------------------------------------------------
// Products CRUD
// ---------------------------------------------------------------------------

export async function createProduct(productData) {
  const res = await fetch(`${API_BASE}/admin/products`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(productData)
  })
  if (!res.ok) throw new Error('Error al crear producto')
  return res.json()
}

export async function updateProduct(id, productData) {
  const res = await fetch(`${API_BASE}/admin/products/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(productData)
  })
  if (!res.ok) throw new Error('Error al actualizar producto')
  return res.json()
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_BASE}/admin/products/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  })
  if (!res.ok) throw new Error('Error al eliminar producto')
  return res.json()
}

// ---------------------------------------------------------------------------
// Categories CRUD
// ---------------------------------------------------------------------------

export async function createCategory(categoryData) {
  const res = await fetch(`${API_BASE}/admin/categories`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(categoryData)
  })
  if (!res.ok) throw new Error('Error al crear categoría')
  return res.json()
}

export async function deleteCategory(id) {
  const res = await fetch(`${API_BASE}/admin/categories/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  })
  if (!res.ok) throw new Error('Error al eliminar categoría')
  return res.json()
}
