const photos = [
  {
    url: 'https://images.unsplash.com/photo-1639629509821-c54cdd984227?w=600&h=600&fit=crop&auto=format',
    alt: 'Volume lash extensions close up',
    label: 'Volume Lashes',
  },
  {
    url: 'https://images.unsplash.com/photo-1683719312734-e31de63957ab?w=600&h=600&fit=crop&auto=format',
    alt: 'Classic lash extensions',
    label: 'Classic Set',
  },
  {
    url: 'https://images.unsplash.com/photo-1772322586649-fc11154e76b9?w=600&h=600&fit=crop&auto=format',
    alt: 'Matte pink square gel nails',
    label: 'Gel Nails',
  },
  {
    url: 'https://images.unsplash.com/photo-1674049406467-824ea37c7184?w=600&h=600&fit=crop&auto=format',
    alt: 'Lash lift and tint result',
    label: 'Lash Lift',
  },
  {
    url: 'https://images.unsplash.com/photo-1772322586785-3a34772cbc61?w=600&h=600&fit=crop&auto=format',
    alt: 'Elegant white and marble nail art',
    label: 'Nail Art',
  },
  {
    url: 'https://images.unsplash.com/photo-1735151226446-1d364b4adc2f?w=600&h=600&fit=crop&auto=format',
    alt: 'Hybrid lash extensions',
    label: 'Hybrid Set',
  },
]

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 px-4" style={{ background: 'var(--secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ color: 'var(--accent)' }}
          >
            Our Work
          </p>
          <h2
            className="text-4xl sm:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: 'var(--foreground)' }}
          >
            The <span className="italic" style={{ color: 'var(--primary)' }}>Portfolio</span>
          </h2>
          <p className="mt-4 text-sm max-w-md mx-auto" style={{ color: 'var(--muted-foreground)' }}>
            Real results from real clients — every set crafted with precision and care.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
              style={{ background: 'var(--border)' }}
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, rgba(45,36,39,0.7) 0%, transparent 60%)' }}
              >
                <span className="text-xs font-semibold text-white">{photo.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: 'var(--primary)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            See more on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
