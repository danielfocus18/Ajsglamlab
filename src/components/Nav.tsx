import { useState } from 'react'
import logoUrl from '../assets/aj-glam-lab-logo.jpg'

interface NavProps {
  onBookNow: () => void
  onAdminClick: () => void
  isAdmin: boolean
}

export default function Nav({ onBookNow, onAdminClick, isAdmin }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#footer' },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(253,248,245,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false) }} className="flex items-center gap-2 focus:outline-none">
          <img
            src={logoUrl}
            alt="AJ's Glam Lab"
            className="h-10 w-16 object-contain mix-blend-multiply"
          />
          <span
            className="text-lg font-semibold hidden sm:block"
            style={{ fontFamily: "'Playfair Display', serif", color: 'var(--primary)' }}
          >
            AJ's Glam Lab
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--muted-foreground)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={onAdminClick}
            className="text-xs px-3 py-1 rounded-full border transition-colors"
            style={{
              borderColor: 'var(--border)',
              color: isAdmin ? 'var(--primary)' : 'var(--muted-foreground)',
              background: isAdmin ? 'var(--secondary)' : 'transparent',
            }}
          >
            {isAdmin ? '← Client View' : 'Admin'}
          </button>
          {!isAdmin && (
            <button
              onClick={onBookNow}
              className="text-sm font-semibold px-5 py-2 rounded-full transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
            >
              Book Now
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-3">
          {!isAdmin && (
            <button
              onClick={onBookNow}
              className="text-xs font-semibold px-4 py-2 rounded-full"
              style={{ background: 'var(--primary)', color: '#fff' }}
            >
              Book
            </button>
          )}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="p-2 rounded-lg"
            style={{ color: 'var(--foreground)' }}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-4 pb-4 flex flex-col gap-2"
          style={{ background: 'rgba(253,248,245,0.98)' }}
        >
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="py-2 text-sm font-medium border-b"
              style={{ color: 'var(--foreground)', borderColor: 'var(--border)' }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { onAdminClick(); setMenuOpen(false) }}
            className="py-2 text-sm text-left"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {isAdmin ? '← Client View' : 'Admin Dashboard'}
          </button>
        </div>
      )}
    </nav>
  )
}
