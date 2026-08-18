import { useState, useEffect } from 'react'
import { fetchCategories } from '../../api/products'
import { deleteCategory, createCategory } from '../../api/admin'

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const loadCategories = () => {
    setLoading(true)
    fetchCategories()
      .then(data => { setCategories(data); setLoading(false) })
      .catch(console.error)
  }

  useEffect(() => { loadCategories() }, [])

  if (loading && !categories.length) return <div className="p-8">Cargando categorías...</div>

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-charcoal">Categorías Principales</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(cat => (
          <div key={cat.id} className="bg-warm-white p-6 rounded-2xl border border-gold/20 shadow-sm relative group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{cat.icon}</span>
              <div>
                <h3 className="font-bold text-charcoal">{cat.name}</h3>
                <span className="text-xs text-muted uppercase tracking-wider">ID: {cat.id}</span>
              </div>
            </div>
            
            <p className="text-sm text-charcoal-light mb-4">{cat.description}</p>
            
            <div className="border-t border-gold/10 pt-4 mt-auto">
              <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Subcategorías:</h4>
              <ul className="flex flex-wrap gap-2">
                {cat.subcategories && cat.subcategories.length > 0 ? (
                  cat.subcategories.map(sub => (
                    <li key={sub.id} className="bg-cream px-2 py-1 rounded text-xs text-charcoal-light border border-gold/10">
                      {sub.name}
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-muted italic">Sin subcategorías</li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
