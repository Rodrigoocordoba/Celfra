import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchCategories, fetchProducts } from '../../api/products'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([products, categories]) => {
        setStats({
          products: products.length,
          categories: categories.length
        })
        setLoading(false)
      })
      .catch(console.error)
  }, [])

  if (loading) return <div className="p-8 text-charcoal">Cargando dashboard...</div>

  return (
    <div className="p-8">
      <h1 className="text-3xl font-serif font-bold text-charcoal mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-warm-white p-6 rounded-2xl shadow-sm border border-gold/20">
          <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-2">Total Productos</h3>
          <p className="text-4xl font-bold text-charcoal mb-4">{stats.products}</p>
          <Link to="/admin/products" className="text-gold hover:text-gold-dark text-sm font-medium underline underline-offset-4">
            Gestionar productos &rarr;
          </Link>
        </div>

        <div className="bg-warm-white p-6 rounded-2xl shadow-sm border border-gold/20">
          <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-2">Categorías</h3>
          <p className="text-4xl font-bold text-charcoal mb-4">{stats.categories}</p>
          <Link to="/admin/categories" className="text-gold hover:text-gold-dark text-sm font-medium underline underline-offset-4">
            Gestionar categorías &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
