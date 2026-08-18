import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogin } from '../../api/admin'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await adminLogin(password)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal">
      <div className="bg-warm-white p-8 rounded-2xl shadow-2xl max-w-sm w-full border border-gold/20">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl font-bold text-charcoal">CelFra Admin</h2>
          <p className="text-muted text-sm mt-2">Ingresá tu contraseña para acceder al panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-charcoal-light mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gold/30 focus:outline-none focus:ring-2 focus:ring-gold/50 bg-cream-light"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-soft-rose text-sm font-medium text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold hover:bg-gold-dark text-warm-white font-medium py-3 rounded-lg transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? 'Verificando...' : 'Entrar al Panel'}
          </button>
        </form>
      </div>
    </div>
  )
}
