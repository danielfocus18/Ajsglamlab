const reviews = [
  {
    name: 'Amara O.',
    service: 'Volume Lashes',
    text: "Ruby is an absolute queen! My lashes have never looked so full and natural. I get compliments every single day. Worth every penny.",
    rating: 5,
    date: 'Sep 2026',
  },
  {
    name: 'Chidinma E.',
    service: 'Hybrid Set + Gel Nails',
    text: "I came in for lashes and ended up getting my nails done too — best decision ever. The studio is so cozy and Ruby is so talented.",
    rating: 5,
    date: 'Aug 2026',
  },
  {
    name: 'Fatima I.',
    service: 'Lash Lift & Tint',
    text: "The lash lift completely transformed my eyes. Low maintenance and looks so elegant. Ruby took her time and the result is stunning.",
    rating: 5,
    date: 'Aug 2026',
  },
  {
    name: 'Blessing N.',
    service: 'Classic Extensions',
    text: "I was nervous about lash extensions for the first time, but Ruby made me feel so comfortable. They look so real and gorgeous!",
    rating: 5,
    date: 'Jul 2026',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style={{ color: 'var(--accent)' }}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4" style={{ background: 'var(--background)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ color: 'var(--accent)' }}
          >
            Client Love
          </p>
          <h2
            className="text-4xl sm:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: 'var(--foreground)' }}
          >
            What They <span className="italic" style={{ color: 'var(--primary)' }}>Say</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                boxShadow: '0 4px 20px rgba(45,36,39,0.06)',
              }}
            >
              <StarRating count={r.rating} />
              <p
                className="mt-4 text-sm leading-relaxed"
                style={{ color: 'var(--foreground)', fontStyle: 'italic' }}
              >
                "{r.text}"
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{r.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--accent)' }}>{r.service}</p>
                </div>
                <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{r.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Overall rating */}
        <div
          className="mt-8 p-6 rounded-2xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(196,84,122,0.08) 0%, rgba(201,169,110,0.08) 100%)',
            border: '1px solid var(--border)',
          }}
        >
          <p
            className="text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: 'var(--primary)' }}
          >
            4.9
          </p>
          <StarRating count={5} />
          <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
            Based on 120+ verified reviews · Google & Instagram
          </p>
        </div>
      </div>
    </section>
  )
}
