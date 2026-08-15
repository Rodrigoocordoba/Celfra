import ProductCard from './ProductCard'

export default function ProductGrid({ products, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-warm-white rounded-2xl overflow-hidden border border-gold/10 animate-pulse">
            <div className="aspect-square bg-cream" />
            <div className="p-5 space-y-3">
              <div className="h-3 bg-cream rounded w-1/3" />
              <div className="h-5 bg-cream rounded w-2/3" />
              <div className="h-3 bg-cream rounded w-full" />
              <div className="h-3 bg-cream rounded w-3/4" />
              <div className="flex justify-between pt-3 border-t border-gold/10">
                <div className="h-6 bg-cream rounded w-1/4" />
                <div className="h-8 bg-cream rounded-full w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <span className="text-4xl mb-4 block">🔍</span>
        <p className="font-serif text-xl text-charcoal-light">No se encontraron productos</p>
        <p className="text-sm text-muted mt-2">Probá seleccionando otra categoría</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  )
}
