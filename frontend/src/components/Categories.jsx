export default function Categories({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      {/* All products button */}
      <button
        onClick={() => onCategoryChange(null)}
        className={`group relative px-6 py-3 rounded-full text-sm font-medium uppercase tracking-widest transition-all duration-300 ${
          activeCategory === null
            ? 'bg-gold text-warm-white shadow-md shadow-gold/20'
            : 'bg-warm-white text-charcoal-light border border-gold/20 hover:border-gold/50 hover:text-gold'
        }`}
      >
        <span className="relative z-10">✨ Todos</span>
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`group relative px-6 py-3 rounded-full text-sm font-medium uppercase tracking-widest transition-all duration-300 ${
            activeCategory === cat.id
              ? 'bg-gold text-warm-white shadow-md shadow-gold/20'
              : 'bg-warm-white text-charcoal-light border border-gold/20 hover:border-gold/50 hover:text-gold'
          }`}
        >
          <span className="relative z-10">{cat.icon} {cat.name}</span>
        </button>
      ))}
    </div>
  )
}
