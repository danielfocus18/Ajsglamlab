interface HeroProps {
  onBookNow: () => void
}

export default function Hero({ onBookNow }: HeroProps) {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
      style={{ background: 'var(--background)' }}
    >
      {/* Soft radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(196,84,122,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="text-center md:text-left">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: 'var(--accent)' }}
          >
            Premium Lash & Nail Studio
          </p>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: 'var(--foreground)' }}
          >
            <span style={{ color: 'var(--primary)' }}>AJ's</span>
            <br />
            <span className="italic">Glam Lab</span>
          </h1>
          <p
            className="text-base sm:text-lg leading-relaxed mb-8 max-w-md mx-auto md:mx-0"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Classic, hybrid & volume lash extensions — plus nail sets that turn heads.
            Look effortlessly beautiful every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-start">
            <button
              onClick={onBookNow}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold transition-all hover:opacity-90 active:scale-95 shadow-lg"
              style={{
                background: 'var(--primary)',
                color: '#fff',
                boxShadow: '0 8px 24px rgba(196,84,122,0.3)',
              }}
            >
              Book Your Appointment
            </button>
            <a
              href="#services"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-medium border-2 text-center transition-all hover:opacity-80"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              View Services
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex gap-6 mt-10 justify-center md:justify-start">
            {[
              { num: '500+', label: 'Happy Clients' },
              { num: '4.9★', label: 'Rating' },
              { num: '3yrs', label: 'Experience' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p
                  className="text-xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif", color: 'var(--primary)' }}
                >
                  {s.num}
                </p>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image */}
        <div className="relative flex justify-center">
          <div
            className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-full md:h-[480px] rounded-3xl overflow-hidden"
            style={{
              boxShadow: '0 24px 64px rgba(196,84,122,0.2)',
              background: 'var(--secondary)',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?w=800&h=960&fit=crop&auto=format"
              alt="Professional lash extensions being applied"
              className="w-full h-full object-cover"
            />
            {/* Soft overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, transparent 60%, rgba(45,36,39,0.3) 100%)',
              }}
            />
          </div>

          {/* Floating badge */}
          <div
            className="absolute -bottom-4 -left-4 sm:bottom-6 sm:left-6 px-4 py-3 rounded-2xl shadow-xl"
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              boxShadow: '0 12px 32px rgba(45,36,39,0.12)',
            }}
          >
            <p className="text-xs font-semibold" style={{ color: 'var(--muted-foreground)' }}>Next Available</p>
            <p className="text-sm font-bold" style={{ color: 'var(--primary)', fontFamily: "'Playfair Display', serif" }}>
              Today · 3:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
        <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Scroll</span>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--muted-foreground)' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
