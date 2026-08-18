import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import logo from '../assets/logo.jpg'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Inicio', href: isHome ? '#inicio' : '/' },
    { label: 'Catálogo', href: isHome ? '#catalogo' : '/#catalogo' },
    { label: 'Contacto', href: isHome ? '#contacto' : '/#contacto' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? 'bg-cream-light/95 backdrop-blur-md shadow-lg shadow-charcoal/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href={isHome ? '#inicio' : '/'} className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="CelFra Perfumes"
              className="h-14 w-14 rounded-full object-cover border-2 border-gold/30 group-hover:border-gold transition-colors duration-300"
            />
            <div className="hidden sm:block">
              <span className="font-serif text-xl font-semibold text-charcoal tracking-wide">
                Cel<span className="text-gold">Fra</span>
              </span>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted -mt-0.5">Perfumes</p>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium text-charcoal-light hover:text-gold transition-colors duration-300 uppercase tracking-widest after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 group"
            aria-label="Menú"
          >
            <span className={`block w-6 h-0.5 bg-charcoal transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-charcoal transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-charcoal transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-400 overflow-hidden ${
          menuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        } bg-cream-light/98 backdrop-blur-md`}
      >
        <div className="px-6 py-4 space-y-4 border-t border-gold/10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-medium text-charcoal-light hover:text-gold transition-colors uppercase tracking-widest"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
