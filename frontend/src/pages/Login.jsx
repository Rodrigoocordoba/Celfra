import { useState } from 'react'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === 'admincelfra' && password === 'franquete123') {
      onLogin()
    } else {
      setError('Credenciales incorrectas')
    }
  }

  return (
    <div className="min-h-screen bg-cream-light flex items-center justify-center p-4">
      <div className="bg-warm-white p-8 rounded-2xl shadow-xl border border-gold/20 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl font-bold text-charcoal">CelFra Admin</h2>
          <p className="text-muted mt-2 text-sm">Ingresá tus credenciales para continuar</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center mb-4 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-muted uppercase mb-1">Usuario</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gold/30 rounded-lg p-3 outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted uppercase mb-1">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gold/30 rounded-lg p-3 outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-charcoal hover:bg-gold text-warm-white font-medium py-3 rounded-xl transition-colors mt-2"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}
