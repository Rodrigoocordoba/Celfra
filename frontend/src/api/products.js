// ---------------------------------------------------------------------------
// API Base URL — uses VITE_API_URL env var if set, otherwise defaults to Render
// For local dev, create a .env file with: VITE_API_URL=http://localhost:8000/api
// ---------------------------------------------------------------------------
const API_BASE = import.meta.env.VITE_API_URL || 'https://celfra.onrender.com/api';

console.log('[CelFra API] Base URL:', API_BASE);

// ---------------------------------------------------------------------------
// Fetch wrapper with 60s timeout to handle Render free-tier cold starts
// ---------------------------------------------------------------------------
async function fetchWithTimeout(url, timeoutMs = 60000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return res.json();
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error(
        'El servidor tardó demasiado en responder. Puede estar iniciándose — intentá de nuevo en unos segundos.'
      );
    }
    throw err;
  }
}

// ---------------------------------------------------------------------------
// Public API functions
// ---------------------------------------------------------------------------
export async function fetchCategories() {
  return fetchWithTimeout(`${API_BASE}/categories`);
}

export async function fetchProducts(category = null) {
  const url = category
    ? `${API_BASE}/products?category=${encodeURIComponent(category)}`
    : `${API_BASE}/products`;
  return fetchWithTimeout(url);
}
