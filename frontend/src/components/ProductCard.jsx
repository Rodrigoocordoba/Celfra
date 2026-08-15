import { WHATSAPP_NUMBER } from '../config'

// Import all product images statically
import afnan_9pm from '../assets/products/afnan_9pm.png'
import rasasi_hawas from '../assets/products/rasasi_hawas.png'
import armaf_cdni from '../assets/products/armaf_cdni.png'
import nautica_voyage from '../assets/products/nautica_voyage.png'
import ab_blue_seduction from '../assets/products/ab_blue_seduction.png'
import lancome_lveb from '../assets/products/lancome_lveb.png'
import ch_good_girl from '../assets/products/ch_good_girl.png'
import versace_eros from '../assets/products/versace_eros.png'
import serum_vitc from '../assets/products/serum_vitc.png'
import crema_hidratante from '../assets/products/crema_hidratante.png'
import aceite_rosa from '../assets/products/aceite_rosa.png'
import mascarilla_keratina from '../assets/products/mascarilla_keratina.png'

const IMAGE_MAP = {
  afnan_9pm,
  rasasi_hawas,
  armaf_cdni,
  nautica_voyage,
  ab_blue_seduction,
  lancome_lveb,
  ch_good_girl,
  versace_eros,
  serum_vitc,
  crema_hidratante,
  aceite_rosa,
  mascarilla_keratina,
}

function formatPrice(price) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(price)
}

export default function ProductCard({ product, index }) {
  const imageSrc = IMAGE_MAP[product.image] || null
  const whatsappMessage = `Hola! Me interesa el producto: ${product.name} (${product.brand}) - ${formatPrice(product.price)}`
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div
      className="group bg-warm-white rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/30 shadow-sm hover:shadow-xl hover:shadow-charcoal/5 transition-all duration-500 hover:-translate-y-1 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'backwards' }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-cream">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`${product.brand} ${product.name}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gold/30">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Gender badge */}
        <span className="absolute top-3 left-3 bg-warm-white/90 backdrop-blur-sm text-charcoal-light text-[10px] font-medium uppercase tracking-wider px-3 py-1 rounded-full border border-gold/10">
          {product.gender}
        </span>

        {/* Quick WhatsApp overlay on hover */}
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500 flex items-center justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 bg-whatsapp hover:bg-whatsapp-dark text-white rounded-full p-4 shadow-lg"
            aria-label={`Consultar ${product.name} por WhatsApp`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Product info */}
      <div className="p-5">
        {/* Brand */}
        <p className="text-[11px] uppercase tracking-[0.2em] text-gold font-medium mb-1">
          {product.brand}
        </p>

        {/* Name */}
        <h3 className="font-serif text-lg font-semibold text-charcoal mb-2 group-hover:text-gold-dark transition-colors duration-300">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Notes */}
        <p className="text-xs text-muted/70 italic mb-4">
          <span className="text-gold/60">♦</span> {product.notes}
        </p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-gold/10">
          <span className="font-serif text-xl font-bold text-charcoal">
            {formatPrice(product.price)}
          </span>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold/10 hover:bg-gold text-gold hover:text-warm-white text-xs font-medium uppercase tracking-wider px-4 py-2.5 rounded-full transition-all duration-300 hover:shadow-md hover:shadow-gold/20"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Consultar
          </a>
        </div>
      </div>
    </div>
  )
}
