import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import ProductGrid from '../components/ProductGrid'
import { fetchCategories, fetchProducts } from '../api/products'

export default function Catalog() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [activeSubcategory, setActiveSubcategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load categories on mount
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => console.error('Error loading categories:', err))
  }, [])

  // Load products when category or subcategory changes
  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchProducts(activeCategory, activeSubcategory)
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error loading products:', err)
        setError('No se pudieron cargar los productos. Asegurate de que el servidor esté corriendo.')
        setLoading(false)
      })
  }, [activeCategory, activeSubcategory])

  const handleRetry = () => {
    // Force re-fetch
    setLoading(true)
    setError(null)
    fetchProducts(activeCategory, activeSubcategory)
      .then((data) => { setProducts(data); setLoading(false); })
      .catch((err) => {
        setError('No se pudieron cargar los productos. Asegurate de que el servidor esté corriendo.')
        setLoading(false)
      })
  }

  return (
    <>
      <Hero />
      <section id="catalogo" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-gold/30" />
              <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium">
                Nuestros Productos
              </span>
              <div className="w-8 h-[1px] bg-gold/30" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal mb-4">
              Catálogo
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Explorá nuestra selección de fragancias importadas y productos de belleza premium.
            </p>
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

          {error && (
            <div className="text-center py-12 bg-soft-rose/20 rounded-2xl border border-soft-rose/30 mb-8">
              <span className="text-3xl mb-3 block">⚠️</span>
              <p className="text-charcoal-light font-medium mb-1">Error de conexión</p>
              <p className="text-sm text-muted">{error}</p>
              <button
                onClick={handleRetry}
                className="mt-4 text-sm text-gold hover:text-gold-dark underline underline-offset-4 transition-colors"
              >
                Reintentar
              </button>
            </div>
          )}

          <ProductGrid products={products} loading={loading} />
        </div>
      </section>
    </>
  )
}
