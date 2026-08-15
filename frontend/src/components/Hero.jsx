export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-light via-cream to-cream-dark" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-soft-rose/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gold/3 rounded-full blur-2xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Decorative top line */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in">
          <div className="w-12 h-[1px] bg-gold/40" />
          <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium">
            Tu Esencia, Tu Historia
          </span>
          <div className="w-12 h-[1px] bg-gold/40" />
        </div>

        {/* Main title */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-charcoal mb-6 animate-fade-in-up leading-tight">
          Cel<span className="gold-shimmer">Fra</span>
        </h1>

        <p className="font-serif text-lg sm:text-xl md:text-2xl text-charcoal-light/80 mb-4 animate-fade-in-up delay-100 italic">
          Perfumes
        </p>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200 leading-relaxed">
          Descubrí fragancias que cuentan tu historia. Perfumes importados y productos 
          de belleza seleccionados con la más alta calidad para vos.
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in-up delay-300">
          <a
            href="#catalogo"
            className="group inline-flex items-center gap-3 bg-gold hover:bg-gold-dark text-warm-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5 text-sm uppercase tracking-widest"
          >
            Ver Catálogo
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

        {/* Decorative bottom sparkles */}
        <div className="mt-16 flex justify-center gap-8 animate-fade-in delay-500">
          <span className="text-gold/30 text-2xl animate-float">✦</span>
          <span className="text-gold/20 text-lg animate-float delay-200">✦</span>
          <span className="text-gold/30 text-2xl animate-float delay-400">✦</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in delay-500">
        <div className="w-6 h-10 border-2 border-gold/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-gold/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
