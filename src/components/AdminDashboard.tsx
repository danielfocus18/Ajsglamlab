import { useState } from 'react'
import logoUrl from '../assets/logo.png'

type PaymentStatus = 'paid' | 'pending' | 'failed'
type ViewMode = 'list' | 'calendar'

interface Booking {
  id: string
  clientName: string
  phone: string
  service: string
  date: string
  time: string
  amount: number
  deposit: number
  status: PaymentStatus
  isNew: boolean
}

const MOCK_BOOKINGS: Booking[] = [
  { id: 'LBR-A1B2C3', clientName: 'Amara Okafor', phone: '+234 803 111 2222', service: 'Volume Lash Extensions', date: 'Today', time: '9:00 AM', amount: 110, deposit: 20, status: 'paid', isNew: true },
  { id: 'LBR-D4E5F6', clientName: 'Chidinma Eze', phone: '+234 806 333 4444', service: 'Hybrid Lashes + Gel Nails', date: 'Today', time: '11:00 AM', amount: 140, deposit: 20, status: 'paid', isNew: true },
  { id: 'LBR-G7H8I9', clientName: 'Fatima Ibrahim', phone: '+234 812 555 6666', service: 'Lash Lift & Tint', date: 'Today', time: '2:00 PM', amount: 65, deposit: 20, status: 'pending', isNew: false },
  { id: 'LBR-J1K2L3', clientName: 'Blessing Nwosu', phone: '+234 817 777 8888', service: 'Classic Lash Extensions', date: 'Tomorrow', time: '10:00 AM', amount: 80, deposit: 20, status: 'paid', isNew: false },
  { id: 'LBR-M4N5O6', clientName: 'Adaeze Chukwu', phone: '+234 809 999 0000', service: 'Acrylic Nail Set', date: 'Tomorrow', time: '1:00 PM', amount: 55, deposit: 20, status: 'paid', isNew: false },
  { id: 'LBR-P7Q8R9', clientName: 'Yetunde Adeyemi', phone: '+234 802 123 4567', service: 'Volume Lashes + Nail Art', date: 'Fri, Sep 20', time: '11:00 AM', amount: 125, deposit: 20, status: 'pending', isNew: false },
  { id: 'LBR-S1T2U3', clientName: 'Ngozi Obi', phone: '+234 815 234 5678', service: 'Lash Fill (2 weeks)', date: 'Fri, Sep 20', time: '3:00 PM', amount: 55, deposit: 20, status: 'failed', isNew: false },
  { id: 'LBR-V4W5X6', clientName: 'Kemi Fashola', phone: '+234 808 345 6789', service: 'Hybrid Lash Extensions', date: 'Sat, Sep 21', time: '9:00 AM', amount: 95, deposit: 20, status: 'paid', isNew: false },
]

const STATUS_STYLES: Record<PaymentStatus, { bg: string; color: string; label: string }> = {
  paid: { bg: 'rgba(34,197,94,0.12)', color: '#16a34a', label: 'Deposit Paid' },
  pending: { bg: 'rgba(201,169,110,0.15)', color: '#a07a30', label: 'Awaiting Payment' },
  failed: { bg: 'rgba(239,68,68,0.1)', color: '#dc2626', label: 'Payment Failed' },
}

export default function AdminDashboard({ onClientView }: { onClientView: () => void }) {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [filter, setFilter] = useState<'all' | PaymentStatus>('all')
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  const newBookings = MOCK_BOOKINGS.filter(b => b.isNew && !dismissed.has(b.id))
  const filtered = filter === 'all' ? MOCK_BOOKINGS : MOCK_BOOKINGS.filter(b => b.status === filter)

  const grouped = filtered.reduce<Record<string, Booking[]>>((acc, b) => {
    if (!acc[b.date]) acc[b.date] = []
    acc[b.date].push(b)
    return acc
  }, {})

  const revenue = MOCK_BOOKINGS.filter(b => b.status === 'paid').reduce((sum, b) => sum + b.deposit, 0)
  const pending = MOCK_BOOKINGS.filter(b => b.status === 'pending').length

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--secondary)' }}
    >
      {/* Admin header */}
      <div
        className="sticky top-0 z-10 px-4 py-3 flex items-center justify-between"
        style={{
          background: 'rgba(253,248,245,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="flex items-center gap-2">
          <img src={logoUrl} alt="Lashed by Ruby" className="w-8 h-8 rounded-full object-cover" />
          <div>
            <p
              className="text-sm font-bold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: 'var(--foreground)' }}
            >
              Admin Dashboard
            </p>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Ruby's Bookings</p>
          </div>
          {newBookings.length > 0 && (
            <span
              className="ml-1 text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'var(--primary)', color: '#fff' }}
            >
              {newBookings.length} new
            </span>
          )}
        </div>
        <button
          onClick={onClientView}
          className="text-xs px-3 py-1.5 rounded-full border font-medium transition-colors"
          style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
        >
          ← Client View
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">

        {/* New booking alerts */}
        {newBookings.length > 0 && (
          <div className="space-y-2">
            {newBookings.map(b => (
              <div
                key={b.id}
                className="flex items-center justify-between p-3 rounded-xl"
                style={{
                  background: 'rgba(196,84,122,0.08)',
                  border: '1px solid rgba(196,84,122,0.2)',
                }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--primary)' }} />
                  <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                    New booking: <strong>{b.clientName}</strong> — {b.service}
                  </p>
                </div>
                <button
                  onClick={() => setDismissed(d => new Set([...d, b.id]))}
                  className="text-xs px-2 py-1 rounded-lg"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Dismiss
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Today's Bookings", value: MOCK_BOOKINGS.filter(b => b.date === 'Today').length, accent: false },
            { label: 'Deposits Collected', value: `$${revenue}`, accent: true },
            { label: 'Awaiting Payment', value: pending, accent: false },
          ].map(stat => (
            <div
              key={stat.label}
              className="p-3 rounded-2xl text-center"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                boxShadow: '0 2px 8px rgba(45,36,39,0.05)',
              }}
            >
              <p
                className="text-xl sm:text-2xl font-bold"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: stat.accent ? 'var(--accent)' : 'var(--primary)',
                }}
              >
                {stat.value}
              </p>
              <p className="text-xs mt-0.5 leading-tight" style={{ color: 'var(--muted-foreground)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* View toggle + Filter */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
            {(['list', 'calendar'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className="px-4 py-2 text-xs font-medium capitalize transition-all"
                style={{
                  background: viewMode === mode ? 'var(--primary)' : 'var(--card)',
                  color: viewMode === mode ? '#fff' : 'var(--muted-foreground)',
                }}
              >
                {mode === 'list' ? '☰ List' : '📅 Calendar'}
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['all', 'paid', 'pending', 'failed'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all capitalize"
                style={{
                  background: filter === f ? 'var(--foreground)' : 'var(--card)',
                  color: filter === f ? '#fff' : 'var(--muted-foreground)',
                  border: '1px solid var(--border)',
                }}
              >
                {f === 'all' ? 'All' : STATUS_STYLES[f as PaymentStatus].label}
              </button>
            ))}
          </div>
        </div>

        {/* List view */}
        {viewMode === 'list' && (
          <div className="space-y-6">
            {Object.entries(grouped).map(([date, bookings]) => (
              <div key={date}>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full"
                    style={{ background: 'var(--foreground)', color: '#fff' }}
                  >
                    {date}
                  </span>
                  <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
                  <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    {bookings.length} appointment{bookings.length > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="space-y-3">
                  {bookings.map(b => {
                    const st = STATUS_STYLES[b.status]
                    return (
                      <div
                        key={b.id}
                        className="p-4 rounded-2xl flex items-start justify-between gap-4"
                        style={{
                          background: 'var(--card)',
                          border: '1px solid var(--border)',
                          boxShadow: '0 2px 8px rgba(45,36,39,0.04)',
                        }}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {b.isNew && !dismissed.has(b.id) && (
                              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--primary)' }} />
                            )}
                            <p
                              className="text-sm font-semibold truncate"
                              style={{ fontFamily: "'Playfair Display', serif", color: 'var(--foreground)' }}
                            >
                              {b.clientName}
                            </p>
                          </div>
                          <p className="text-xs truncate" style={{ color: 'var(--primary)' }}>{b.service}</p>
                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {b.time}
                            </span>
                            <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              {b.phone}
                            </span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span
                            className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full"
                            style={{ background: st.bg, color: st.color }}
                          >
                            {st.label}
                          </span>
                          <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
                            Deposit: <strong style={{ color: 'var(--accent)' }}>${b.deposit}</strong>
                          </p>
                          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                            Total: ${b.amount}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Calendar view */}
        {viewMode === 'calendar' && (
          <div className="space-y-3">
            <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              Week of Sep 19 – 25, 2026
            </p>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, di) => {
              const dateLabel = ['Today', 'Tomorrow', 'Wed, Sep 21', 'Thu, Sep 22', 'Fri, Sep 20', 'Sat, Sep 21'][di]
              const dayBookings = MOCK_BOOKINGS.filter(b =>
                b.date === dateLabel || (di === 0 && b.date === 'Today') || (di === 1 && b.date === 'Tomorrow')
              )

              return (
                <div
                  key={day}
                  className="p-4 rounded-2xl"
                  style={{
                    background: 'var(--card)',
                    border: `1px solid ${dayBookings.length > 0 ? 'var(--border)' : 'transparent'}`,
                    opacity: dayBookings.length === 0 ? 0.5 : 1,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-bold"
                        style={{ color: di < 2 ? 'var(--primary)' : 'var(--muted-foreground)' }}
                      >
                        {day}
                      </span>
                      {di < 2 && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: 'var(--primary)', color: '#fff' }}
                        >
                          {dateLabel}
                        </span>
                      )}
                    </div>
                    <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      {dayBookings.length} booking{dayBookings.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  {dayBookings.length > 0 ? (
                    <div className="space-y-2">
                      {dayBookings.map(b => (
                        <div
                          key={b.id}
                          className="flex items-center justify-between p-2.5 rounded-xl"
                          style={{ background: 'var(--secondary)' }}
                        >
                          <div>
                            <p className="text-xs font-medium" style={{ color: 'var(--foreground)' }}>{b.time} · {b.clientName}</p>
                            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{b.service}</p>
                          </div>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{ background: STATUS_STYLES[b.status].bg, color: STATUS_STYLES[b.status].color }}
                          >
                            {b.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>No bookings</p>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
