import { useState, useEffect } from 'react'
import { fetchProducts, createProduct, updateProduct, deleteProduct, fetchCategories } from '../api/products'

export default function Admin({ onLogout }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category_id: 'perfumes',
    subcategory_id: 'arabes',
    size: '',
    description: '',
    notes: '',
    gender: 'Unisex'
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const cats = await fetchCategories()
      setCategories(cats)
      const prods = await fetchProducts()
      setProducts(prods)
    } catch (err) {
      console.error('Error loading data:', err)
      alert('Error cargando datos del backend')
    }
    setLoading(false)
  }

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingId(product.id)
      setFormData(product)
    } else {
      setEditingId(null)
      setFormData({
        name: '', brand: '', category_id: 'perfumes', subcategory_id: 'arabes',
        size: '', description: '', notes: '', gender: 'Unisex'
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => {
      const newData = { ...prev, [name]: value }
      
      // Auto-select first subcategory if category changes
      if (name === 'category_id') {
        const cat = categories.find(c => c.id === value)
        newData.subcategory_id = (cat && cat.subcategories.length > 0) ? cat.subcategories[0].id : ''
        
        // Clean up specific fields if not perfume
        if (value !== 'perfumes') {
          newData.size = ''
          newData.notes = ''
          newData.gender = 'Unisex'
        }
      }
      return newData
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Ensure missing image property doesn't break backend payload
      const payload = { ...formData, image: '' }
      
      if (editingId) {
        await updateProduct(editingId, payload)
      } else {
        await createProduct(payload)
      }
      handleCloseModal()
      loadData()
    } catch (err) {
      console.error(err)
      alert('Error guardando el producto')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await deleteProduct(id)
        loadData()
      } catch (err) {
        console.error(err)
        alert('Error eliminando el producto')
      }
    }
  }

  // Derived state for dynamic form
  const activeCategoryObj = categories.find(c => c.id === formData.category_id)
  const availableSubcategories = activeCategoryObj ? activeCategoryObj.subcategories : []
  const isPerfume = formData.category_id === 'perfumes'

  const perfumeSizes = ['', '30 ml', '60 ml', '90 ml', '100 ml', '120 ml', '200 ml']

  if (loading) {
    return <div className="p-10 text-center text-charcoal pt-32">Cargando panel de administración...</div>
  }

  return (
    <div className="min-h-screen bg-cream-light p-6 md:p-12 pt-24 md:pt-32">
      <div className="max-w-6xl mx-auto bg-warm-white rounded-2xl shadow-xl overflow-hidden border border-gold/20">
        <div className="p-6 md:p-8 flex justify-between items-center border-b border-gold/20 bg-cream">
          <div>
            <h1 className="text-2xl font-serif font-bold text-charcoal">Backoffice CelFra</h1>
            <p className="text-muted text-sm mt-1">Gestión del Catálogo de Productos</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onLogout}
              className="bg-transparent border border-gold/30 text-charcoal px-5 py-2 rounded-full font-medium text-sm hover:bg-cream-light transition-colors"
            >
              Cerrar Sesión
            </button>
            <button 
              onClick={() => handleOpenModal()}
              className="bg-charcoal text-warm-white px-5 py-2 rounded-full font-medium text-sm hover:bg-gold hover:text-white transition-colors"
            >
              + Nuevo Producto
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cream-light text-muted text-xs uppercase tracking-wider">
                <th className="p-4 font-medium border-b border-gold/10">ID</th>
                <th className="p-4 font-medium border-b border-gold/10">Nombre</th>
                <th className="p-4 font-medium border-b border-gold/10">Marca</th>
                <th className="p-4 font-medium border-b border-gold/10">Categoría</th>
                <th className="p-4 font-medium border-b border-gold/10">Tamaño</th>
                <th className="p-4 font-medium border-b border-gold/10">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {products.map(product => (
                <tr key={product.id} className="border-b border-gold/10 hover:bg-cream/50 transition-colors">
                  <td className="p-4 text-muted">{product.id}</td>
                  <td className="p-4 font-medium text-charcoal">{product.name}</td>
                  <td className="p-4">{product.brand}</td>
                  <td className="p-4">
                    <span className="bg-gold/10 text-gold px-2 py-1 rounded-md text-xs">
                      {product.category_id} {product.subcategory_id && `/ ${product.subcategory_id}`}
                    </span>
                  </td>
                  <td className="p-4">{product.size || '-'}</td>
                  <td className="p-4 flex gap-3">
                    <button onClick={() => handleOpenModal(product)} className="text-gold hover:text-charcoal font-medium">Editar</button>
                    <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700 font-medium">Borrar</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-muted">No hay productos cargados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm">
          <div className="bg-warm-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gold/20">
            <div className="p-6 border-b border-gold/20 flex justify-between items-center sticky top-0 bg-warm-white z-10">
              <h2 className="text-xl font-serif font-bold text-charcoal">
                {editingId ? 'Editar Producto' : 'Crear Producto'}
              </h2>
              <button onClick={handleCloseModal} className="text-muted hover:text-charcoal text-2xl leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-muted uppercase mb-1">Nombre</label>
                  <input required name="name" value={formData.name} onChange={handleChange} className="w-full border border-gold/30 rounded-lg p-2.5 outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted uppercase mb-1">Marca</label>
                  <input required name="brand" value={formData.brand} onChange={handleChange} className="w-full border border-gold/30 rounded-lg p-2.5 outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-transparent" />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-muted uppercase mb-1">Categoría</label>
                  <select required name="category_id" value={formData.category_id} onChange={handleChange} className="w-full border border-gold/30 rounded-lg p-2.5 outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-transparent">
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted uppercase mb-1">Subcategoría</label>
                  <select 
                    required={availableSubcategories.length > 0} 
                    name="subcategory_id" 
                    value={formData.subcategory_id} 
                    onChange={handleChange} 
                    className="w-full border border-gold/30 rounded-lg p-2.5 outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-transparent"
                    disabled={availableSubcategories.length === 0}
                  >
                    {availableSubcategories.length === 0 && <option value="">Sin subcategorías</option>}
                    {availableSubcategories.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>

                {/* Conditional Fields for Perfumes */}
                {isPerfume && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-muted uppercase mb-1">Tamaño</label>
                      <select name="size" value={formData.size} onChange={handleChange} className="w-full border border-gold/30 rounded-lg p-2.5 outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-transparent">
                        {perfumeSizes.map(size => (
                          <option key={size} value={size}>{size || 'Seleccionar...'}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted uppercase mb-1">Género</label>
                      <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-gold/30 rounded-lg p-2.5 outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-transparent">
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Unisex">Unisex</option>
                      </select>
                    </div>
                  </>
                )}

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-muted uppercase mb-1">Descripción</label>
                  <textarea required name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full border border-gold/30 rounded-lg p-2.5 outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-transparent"></textarea>
                </div>

                {isPerfume && (
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-muted uppercase mb-1">Notas Olfativas</label>
                    <input name="notes" value={formData.notes} onChange={handleChange} placeholder="Ej: Vainilla, Ámbar, Cedro" className="w-full border border-gold/30 rounded-lg p-2.5 outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-transparent" />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gold/20 mt-6">
                <button type="button" onClick={handleCloseModal} className="px-5 py-2 rounded-full text-sm font-medium text-charcoal border border-gold/30 hover:bg-cream transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="px-5 py-2 rounded-full text-sm font-medium text-warm-white bg-gold hover:bg-gold-dark shadow-md transition-colors">
                  Guardar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
