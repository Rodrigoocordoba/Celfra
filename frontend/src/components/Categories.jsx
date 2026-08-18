export default function Categories({ categories, activeCategory, activeSubcategory, onCategoryChange, onSubcategoryChange }) {
  // Find the active parent category to show its subcategories
  const activeParent = categories.find((c) => c.id === activeCategory)

  return (
    <div className="space-y-4">
      {/* Main categories */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {/* All products button */}
        <button
          onClick={() => { onCategoryChange(null); onSubcategoryChange(null); }}
          className={`group relative px-6 py-3 rounded-full text-sm font-medium uppercase tracking-widest transition-all duration-300 ${
            activeCategory === null
              ? 'bg-gold text-warm-white shadow-md shadow-gold/20'
              : 'bg-warm-white text-charcoal-light border border-gold/20 hover:border-gold/50 hover:text-gold'
          }`}
        >
          ✨ Todos
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { onCategoryChange(cat.id); onSubcategoryChange(null); }}
            className={`group relative px-6 py-3 rounded-full text-sm font-medium uppercase tracking-widest transition-all duration-300 ${
              activeCategory === cat.id
                ? 'bg-gold text-warm-white shadow-md shadow-gold/20'
                : 'bg-warm-white text-charcoal-light border border-gold/20 hover:border-gold/50 hover:text-gold'
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Subcategories — only show when a parent with subcategories is selected */}
      {activeParent && activeParent.subcategories && activeParent.subcategories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-2 animate-fade-in">
          <button
            onClick={() => onSubcategoryChange(null)}
            className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
              activeSubcategory === null
                ? 'bg-charcoal text-cream-light shadow-sm'
                : 'bg-cream text-charcoal-light border border-gold/15 hover:border-gold/40 hover:text-gold'
            }`}
          >
            Todos
          </button>

          {activeParent.subcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => onSubcategoryChange(sub.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                activeSubcategory === sub.id
                  ? 'bg-charcoal text-cream-light shadow-sm'
                  : 'bg-cream text-charcoal-light border border-gold/15 hover:border-gold/40 hover:text-gold'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
