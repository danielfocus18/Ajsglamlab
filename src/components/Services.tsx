export interface Service {
  id: string
  name: string
  category: string
  price: number
  duration: string
  description: string
}

export const ALL_SERVICES: Service[] = [
  { id: 'classic', name: 'Classic Lash Extensions', category: 'Lashes', price: 80, duration: '90 min', description: 'One extension per natural lash for a clean, mascara-like finish.' },
  { id: 'hybrid', name: 'Hybrid Lash Extensions', category: 'Lashes', price: 95, duration: '100 min', description: 'Mix of classic and volume fans for textured, dramatic length.' },
  { id: 'volume', name: 'Volume Lash Extensions', category: 'Lashes', price: 110, duration: '120 min', description: 'Ultra-fluffy mega fans for a bold, glamorous look.' },
  { id: 'lift', name: 'Lash Lift & Tint', category: 'Lashes', price: 65, duration: '60 min', description: 'Lifts and darkens your natural lashes — no extensions needed.' },
  { id: 'fill', name: 'Lash Fill (2 weeks)', category: 'Lashes', price: 55, duration: '60 min', description: 'Maintenance fill for existing lash extensions at 2 weeks.' },
  { id: 'gel', name: 'Gel Nail Set', category: 'Nails', price: 45, duration: '45 min', description: 'Long-lasting gel polish on natural nails with your choice of color.' },
  { id: 'acrylic', name: 'Acrylic Nail Set', category: 'Nails', price: 55, duration: '60 min', description: 'Full acrylic set with length and shaping to your preference.' },
  { id: 'nail-art', name: 'Nail Art Add-on', category: 'Nails', price: 15, duration: '+ 15 min', description: 'Custom nail art design — per nail, starting price.' },
]

interface ServicesProps {
  selected: string[]
  onToggle: (id: string) => void
  onBookNow: () => void
}

export default function Services({ selected, onToggle, onBookNow }: ServicesProps) {
  const categories = ['Lashes', 'Nails']
  const total = ALL_SERVICES.filter(s => selected.includes(s.id)).reduce((sum, s) => sum + s.price, 0)

  return (
    <section id="services" className="py-20 px-4" style={{ background: 'var(--background)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ color: 'var(--accent)' }}
          >
            What We Offer
          </p>
          <h2
            className="text-4xl sm:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: 'var(--foreground)' }}
          >
            Our <span className="italic" style={{ color: 'var(--primary)' }}>Services</span>
          </h2>
          <p className="mt-4 text-sm max-w-sm mx-auto" style={{ color: 'var(--muted-foreground)' }}>
            Select the services you'd like and book in one go.
          </p>
        </div>

        {categories.map(cat => (
          <div key={cat} className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                style={{ background: 'var(--secondary)', color: 'var(--accent)' }}
              >
                {cat}
              </span>
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ALL_SERVICES.filter(s => s.category === cat).map(service => {
                const isSelected = selected.includes(service.id)
                return (
                  <button
                    key={service.id}
                    onClick={() => onToggle(service.id)}
                    className="text-left p-5 rounded-2xl transition-all duration-200 group"
                    style={{
                      background: isSelected ? 'linear-gradient(135deg, rgba(196,84,122,0.08) 0%, rgba(201,169,110,0.06) 100%)' : 'var(--card)',
                      border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                      boxShadow: isSelected ? '0 8px 24px rgba(196,84,122,0.15)' : '0 2px 8px rgba(45,36,39,0.04)',
                      transform: isSelected ? 'translateY(-2px)' : undefined,
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3
                        className="text-sm font-semibold leading-snug"
                        style={{ color: 'var(--foreground)', fontFamily: "'Playfair Display', serif" }}
                      >
                        {service.name}
                      </h3>
                      {/* Checkbox */}
                      <div
                        className="shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ml-2 mt-0.5"
                        style={{
                          borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                          background: isSelected ? 'var(--primary)' : 'transparent',
                        }}
                      >
                        {isSelected && (
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--muted-foreground)' }}>
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-base font-bold"
                        style={{ color: 'var(--primary)', fontFamily: "'Playfair Display', serif" }}
                      >
                        ${service.price}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--secondary)', color: 'var(--muted-foreground)' }}
                      >
                        {service.duration}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {/* Sticky CTA when services are selected */}
        {selected.length > 0 && (
          <div
            className="sticky bottom-4 left-0 right-0 mx-auto max-w-sm mt-8 p-4 rounded-2xl shadow-2xl flex items-center justify-between"
            style={{
              background: 'var(--foreground)',
              boxShadow: '0 16px 48px rgba(45,36,39,0.25)',
            }}
          >
            <div>
              <p className="text-xs text-white opacity-60">{selected.length} service{selected.length > 1 ? 's' : ''} selected</p>
              <p
                className="text-lg font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                ${total} total
              </p>
            </div>
            <button
              onClick={onBookNow}
              className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: 'var(--primary)', color: '#fff' }}
            >
              Book Now →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
