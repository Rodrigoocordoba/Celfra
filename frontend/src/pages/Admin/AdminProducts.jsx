import { useState, useEffect } from 'react'
import { fetchProducts } from '../../api/products'
import { deleteProduct, createProduct } from '../../api/admin'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  
  // Basic form state
  const [formData, setFormData] = useState({
    name: '', brand: '', category_id: 'perfumes', subcategory_id: 'arabes', 
    size: '100 ml', description: '', notes: '', image: '', gender: 'Unisex'
  })

  const loadProducts = () => {
    setLoading(true)
    fetchProducts()
      .then(data => { setProducts(data); setLoading(false) })
      .catch(console.error)
  }

  useEffect(() => { loadProducts() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que querés eliminar este producto?')) return
    try {
      await deleteProduct(id)
      loadProducts()
    } catch (err) {
      alert(err.message)
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await createProduct(formData)
      setIsAdding(false)
      setFormData({name: '', brand: '', category_id: 'perfumes', subcategory_id: 'arabes', size: '100 ml', description: '', notes: '', image: '', gender: 'Unisex'})
      loadProducts()
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading && !products.length) return <div className="p-8">Cargando productos...</div>

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-charcoal">Productos</h1>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-gold hover:bg-gold-dark text-warm-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {isAdding ? 'Cancelar' : '+ Nuevo Producto'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-warm-white p-6 rounded-2xl border border-gold/20 mb-8 shadow-sm">
          <h2 className="text-lg font-bold text-charcoal mb-4">Agregar Nuevo Producto</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required placeholder="Nombre" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="border p-2 rounded" />
            <input required placeholder="Marca" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="border p-2 rounded" />
            <select value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})} className="border p-2 rounded">
              <option value="perfumes">Perfumes</option>
              <option value="belleza">Belleza</option>
              <option value="combos">Combos</option>
            </select>
            <input required placeholder="Subcategoría ID (ej: arabes)" value={formData.subcategory_id} onChange={e => setFormData({...formData, subcategory_id: e.target.value})} className="border p-2 rounded" />
            <input placeholder="Tamaño (ej: 100 ml)" value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})} className="border p-2 rounded" />
            <input placeholder="Género (Masculino/Femenino/Unisex)" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="border p-2 rounded" />
            <input placeholder="ID Imagen (ej: ma_yeah_man)" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="border p-2 rounded md:col-span-2" />
            <textarea placeholder="Descripción" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="border p-2 rounded md:col-span-2" rows={3}></textarea>
            <input placeholder="Notas olfativas" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="border p-2 rounded md:col-span-2" />
            
            <button type="submit" className="bg-charcoal text-white px-4 py-2 rounded-lg font-medium md:col-span-2">Guardar Producto</button>
          </form>
        </div>
      )}

      <div className="bg-warm-white rounded-2xl shadow-sm border border-gold/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-cream-light border-b border-gold/10 text-sm uppercase tracking-wider text-muted">
              <th className="p-4 font-medium">Nombre</th>
              <th className="p-4 font-medium">Marca</th>
              <th className="p-4 font-medium">Categoría</th>
              <th className="p-4 font-medium">Tamaño</th>
              <th className="p-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b border-gold/5 hover:bg-cream-light/50 transition-colors">
                <td className="p-4 font-medium text-charcoal">{p.name}</td>
                <td className="p-4 text-charcoal-light">{p.brand}</td>
                <td className="p-4 text-charcoal-light text-sm">
                  <span className="bg-gold/10 text-gold px-2 py-1 rounded-full">{p.category_id}</span>
                </td>
                <td className="p-4 text-charcoal-light">{p.size}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(p.id)} className="text-soft-rose hover:text-red-700 font-medium text-sm">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
