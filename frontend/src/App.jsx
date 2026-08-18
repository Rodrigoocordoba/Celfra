import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import ProductGrid from './components/ProductGrid'
import WhatsAppFloat from './components/WhatsAppFloat'
import Footer from './components/Footer'
import { fetchCategories, fetchProducts } from './api/products'

// Admin Pages
import AdminLogin from './pages/Admin/AdminLogin'
import AdminLayout from './pages/Admin/AdminLayout'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminProducts from './pages/Admin/AdminProducts'
import AdminCategories from './pages/Admin/AdminCategories'

function PublicCatalog() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [activeSubcategory, setActiveSubcategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCategories().then(setCategories).catch(err => console.error('Error loading categories:', err))
  }, [])

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchProducts(activeCategory, activeSubcategory)
      .then((data) => { setProducts(data); setLoading(false) })
      .catch((err) => {
        console.error('Error loading products:', err)
        setError('No se pudieron cargar los productos.')
        setLoading(false)
      })
  }, [activeCategory, activeSubcategory])

  return (
    <div className="min-h-screen bg-cream-light">
      <Navbar />
      <Hero />
      <section id="catalogo" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal mb-4">Catálogo</h2>
            <p className="text-muted max-w-xl mx-auto">Explorá nuestra selección de fragancias importadas y productos de belleza premium.</p>
          </div>

          <div className="mb-10">
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              activeSubcategory={activeSubcategory}
              onCategoryChange={setActiveCategory}
              onSubcategoryChange={setActiveSubcategory}
            />
          </div>

          {error && <div className="text-center py-12 text-soft-rose">{error}</div>}
          <ProductGrid products={products} loading={loading} />
        </div>
      </section>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<PublicCatalog />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        
        {/* Protected Admin Layout */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
        </Route>
      </Routes>
    </Router>
  )
}
