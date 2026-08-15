const API_BASE = 'http://localhost:8000/api';

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error('Error al cargar categorías');
  return res.json();
}

export async function fetchProducts(category = null) {
  const url = category
    ? `${API_BASE}/products?category=${encodeURIComponent(category)}`
    : `${API_BASE}/products`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al cargar productos');
  return res.json();
}
