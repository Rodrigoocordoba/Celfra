import { Navigate, Outlet, Link, useLocation } from 'react-router-dom'
import { isAuthenticated, adminLogout } from '../../api/admin'

export default function AdminLayout() {
  const location = useLocation()

  if (!isAuthenticated()) {
    return <Navigate to="/admin" replace />
  }

  const handleLogout = () => {
    adminLogout()
    window.location.href = '/' // Redirect to public home
  }

  const navItemClass = (path) => 
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      location.pathname === path 
        ? 'bg-gold text-warm-white' 
        : 'text-charcoal-light hover:bg-gold/10 hover:text-gold'
    }`

  return (
    <div className="min-h-screen bg-cream-light flex">
      {/* Sidebar */}
      <aside className="w-64 bg-warm-white border-r border-gold/20 flex flex-col">
        <div className="p-6 border-b border-gold/10">
          <h2 className="font-serif text-2xl font-bold text-charcoal">CelFra Admin</h2>
          <p className="text-xs tracking-wider text-muted uppercase mt-1">Backoffice</p>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link to="/admin/dashboard" className={navItemClass('/admin/dashboard')}>
            Dashboard
          </Link>
          <Link to="/admin/products" className={navItemClass('/admin/products')}>
            📦 Productos
          </Link>
          <Link to="/admin/categories" className={navItemClass('/admin/categories')}>
            🏷️ Categorías
          </Link>
        </nav>

        <div className="p-4 border-t border-gold/10">
          <button 
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm font-medium text-soft-rose hover:bg-soft-rose/10 rounded-lg transition-colors text-left"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
