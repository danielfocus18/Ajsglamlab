import { useState } from 'react'
import { ALL_SERVICES, type Service } from './Services'

type Step = 'datetime' | 'details' | 'payment' | 'waiting' | 'success'

interface BookingModalProps {
  selectedServiceIds: string[]
  onClose: () => void
}

const DEPOSIT = 20

// Generate next 14 days (skip none for demo)
function getDates() {
  const dates: Date[] = []
  const today = new Date()
  for (let i = 0; i < 14; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    dates.push(d)
  }
  return dates
}

const TIME_SLOTS = [
  { time: '9:00 AM', available: true },
  { time: '10:00 AM', available: false },
  { time: '11:00 AM', available: true },
  { time: '12:00 PM', available: false },
  { time: '1:00 PM', available: true },
  { time: '2:00 PM', available: true },
  { time: '3:00 PM', available: true },
  { time: '4:00 PM', available: false },
  { time: '5:00 PM', available: true },
  { time: '6:00 PM', available: true },
]

function formatDate(d: Date) {
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function formatDateShort(d: Date) {
  return d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })
}

export default function BookingModal({ selectedServiceIds, onClose }: BookingModalProps) {
  const [step, setStep] = useState<Step>('datetime')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [paymentRef] = useState(`AJG-${Math.random().toString(36).slice(2, 8).toUpperCase()}`)

  const services: Service[] = selectedServiceIds
    .map(id => ALL_SERVICES.find(s => s.id === id)!)
    .filter(Boolean)
  const subtotal = services.reduce((sum, s) => sum + s.price, 0)
  const dates = getDates()

  const canProceedDateTime = selectedDate !== null && selectedTime !== null
  const canProceedDetails = name.trim().length >= 2 && phone.trim().length >= 8

  function handlePayAndConfirm() {
    setStep('waiting')
    setTimeout(() => setStep('success'), 3500)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(45,36,39,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full sm:max-w-lg max-h-[95vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl flex flex-col"
        style={{ background: 'var(--background)', boxShadow: '0 32px 80px rgba(45,36,39,0.25)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 pt-5 pb-4 sticky top-0"
          style={{ background: 'var(--background)', borderBottom: '1px solid var(--border)', zIndex: 1 }}
        >
          <div>
            <h2
              className="text-xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: 'var(--foreground)' }}
            >
              {step === 'success' ? 'Booking Confirmed!' : step === 'waiting' ? 'Processing...' : 'Book Your Appointment'}
            </h2>
            {step !== 'success' && step !== 'waiting' && (
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                {step === 'datetime' && 'Step 1 of 3 · Choose date & time'}
                {step === 'details' && 'Step 2 of 3 · Your details'}
                {step === 'payment' && 'Step 3 of 3 · Confirm & pay'}
              </p>
            )}
          </div>
          {step !== 'waiting' && step !== 'success' && (
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:opacity-70 transition-opacity"
              style={{ background: 'var(--secondary)' }}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Progress bar */}
        {step !== 'success' && step !== 'waiting' && (
          <div className="px-6 pt-3 pb-0">
            <div className="h-1 rounded-full w-full" style={{ background: 'var(--border)' }}>
              <div
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: step === 'datetime' ? '33%' : step === 'details' ? '66%' : '100%',
                  background: 'linear-gradient(90deg, var(--primary), var(--accent))',
                }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          {/* ——— STEP 1: Date + Time ——— */}
          {step === 'datetime' && (
            <>
              {/* Services summary */}
              <div className="p-4 rounded-2xl" style={{ background: 'var(--secondary)' }}>
                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--muted-foreground)' }}>
                  Selected services
                </p>
                {services.map(s => (
                  <div key={s.id} className="flex justify-between items-center py-1.5 border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
                    <span className="text-sm" style={{ color: 'var(--foreground)' }}>{s.name}</span>
                    <span className="text-sm font-medium" style={{ color: 'var(--primary)' }}>${s.price}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2 mt-1">
                  <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Total</span>
                  <span
                    className="text-base font-bold"
                    style={{ color: 'var(--primary)', fontFamily: "'Playfair Display', serif" }}
                  >
                    ${subtotal}
                  </span>
                </div>
              </div>

              {/* Date picker */}
              <div>
                <p className="text-sm font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Choose a date</p>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {dates.map((date, i) => {
                    const isSelected = selectedDate?.toDateString() === date.toDateString()
                    const isToday = i === 0
                    return (
                      <button
                        key={i}
                        onClick={() => { setSelectedDate(date); setSelectedTime(null) }}
                        className="shrink-0 flex flex-col items-center px-3 py-3 rounded-2xl text-center transition-all"
                        style={{
                          minWidth: 60,
                          background: isSelected ? 'var(--primary)' : 'var(--card)',
                          border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                          color: isSelected ? '#fff' : 'var(--foreground)',
                        }}
                      >
                        <span className="text-xs font-medium">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <span className="text-lg font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {date.getDate()}
                        </span>
                        {isToday && (
                          <span
                            className="text-[9px] font-semibold"
                            style={{ color: isSelected ? 'rgba(255,255,255,0.7)' : 'var(--accent)' }}
                          >
                            Today
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Time slots */}
              {selectedDate && (
                <div>
                  <p className="text-sm font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                    Available times · {formatDate(selectedDate)}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map(slot => {
                      const isSelected = selectedTime === slot.time
                      return (
                        <button
                          key={slot.time}
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                          className="py-2.5 rounded-xl text-sm font-medium transition-all"
                          style={{
                            background: isSelected
                              ? 'var(--primary)'
                              : !slot.available
                              ? 'var(--secondary)'
                              : 'var(--card)',
                            color: isSelected
                              ? '#fff'
                              : !slot.available
                              ? 'var(--border)'
                              : 'var(--foreground)',
                            border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                            cursor: slot.available ? 'pointer' : 'not-allowed',
                            textDecoration: !slot.available ? 'line-through' : 'none',
                          }}
                        >
                          {slot.time}
                        </button>
                      )
                    })}
                  </div>
                  <p className="text-xs mt-3" style={{ color: 'var(--muted-foreground)' }}>
                    Crossed-out slots are already booked.
                  </p>
                </div>
              )}
            </>
          )}

          {/* ——— STEP 2: Client Details ——— */}
          {step === 'details' && (
            <>
              <div className="p-3 rounded-xl text-sm flex items-center gap-3" style={{ background: 'var(--secondary)' }}>
                <div className="text-2xl">📅</div>
                <div>
                  <p className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>
                    {formatDate(selectedDate!)} · {selectedTime}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                    {services.map(s => s.name).join(' + ')}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Amara Okafor"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: 'var(--card)',
                      border: '1.5px solid var(--border)',
                      color: 'var(--foreground)',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
                    Phone Number (WhatsApp preferred)
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: 'var(--card)',
                      border: '1.5px solid var(--border)',
                      color: 'var(--foreground)',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                  <p className="text-xs mt-1.5" style={{ color: 'var(--muted-foreground)' }}>
                    AJ's Glam Lab will send your booking confirmation via WhatsApp.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ——— STEP 3: Payment Summary ——— */}
          {step === 'payment' && (
            <>
              <div className="p-4 rounded-2xl" style={{ background: 'var(--secondary)' }}>
                <p className="text-xs font-semibold mb-3" style={{ color: 'var(--muted-foreground)' }}>Booking Summary</p>
                <div className="space-y-1.5 mb-3">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--foreground)' }}>Client</span>
                    <span className="font-medium" style={{ color: 'var(--foreground)' }}>{name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--muted-foreground)' }}>Date & Time</span>
                    <span style={{ color: 'var(--foreground)' }}>{formatDateShort(selectedDate!)} · {selectedTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--muted-foreground)' }}>Services</span>
                    <span className="text-right max-w-[160px]" style={{ color: 'var(--foreground)' }}>
                      {services.map(s => s.name).join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                    <span style={{ color: 'var(--muted-foreground)' }}>Total on the day</span>
                    <span className="font-medium" style={{ color: 'var(--foreground)' }}>${subtotal}</span>
                  </div>
                </div>
              </div>

              {/* Deposit callout */}
              <div
                className="p-4 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(196,84,122,0.1) 0%, rgba(201,169,110,0.1) 100%)',
                  border: '1.5px solid rgba(196,84,122,0.25)',
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'var(--primary)' }}
                  >
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                      Booking Fee: ${DEPOSIT}
                    </p>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      This is a <strong>non-refundable deposit</strong> that secures your slot. The remaining ${subtotal - DEPOSIT} balance is paid at your appointment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div>
                <p className="text-sm font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Pay via Mobile Money</p>
                <div
                  className="p-4 rounded-2xl flex items-center gap-4"
                  style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: 'var(--secondary)' }}
                  >
                    📱
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>MTN / Airtel Money</p>
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      Reference: <strong style={{ color: 'var(--primary)' }}>{paymentRef}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ——— WAITING ——— */}
          {step === 'waiting' && (
            <div className="flex flex-col items-center justify-center py-12 gap-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'var(--secondary)' }}
              >
                <div
                  className="w-10 h-10 border-4 rounded-full animate-spin"
                  style={{ borderColor: 'var(--border)', borderTopColor: 'var(--primary)' }}
                />
              </div>
              <div className="text-center">
                <p
                  className="text-xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif", color: 'var(--foreground)' }}
                >
                  Waiting for Payment
                </p>
                <p className="text-sm mt-2 max-w-xs" style={{ color: 'var(--muted-foreground)' }}>
                  Please complete the mobile money transfer of <strong style={{ color: 'var(--primary)' }}>${DEPOSIT}</strong> with reference <strong style={{ color: 'var(--primary)' }}>{paymentRef}</strong>
                </p>
                <p className="text-xs mt-4" style={{ color: 'var(--muted-foreground)' }}>
                  Confirming automatically...
                </p>
              </div>
            </div>
          )}

          {/* ——— SUCCESS ——— */}
          {step === 'success' && (
            <div className="flex flex-col items-center text-center py-8 gap-5">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
              >
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif", color: 'var(--foreground)' }}
                >
                  You're all booked! 🎉
                </p>
                <p className="text-sm mt-2" style={{ color: 'var(--muted-foreground)' }}>
                  See you soon, <strong style={{ color: 'var(--primary)' }}>{name}</strong>!
                </p>
              </div>

              <div
                className="w-full p-4 rounded-2xl text-left space-y-2"
                style={{ background: 'var(--secondary)', border: '1px solid var(--border)' }}
              >
                {[
                  { label: 'Date', value: formatDate(selectedDate!) },
                  { label: 'Time', value: selectedTime! },
                  { label: 'Service(s)', value: services.map(s => s.name).join(', ') },
                  { label: 'Deposit Paid', value: `$${DEPOSIT} (non-refundable)` },
                  { label: 'Balance Due', value: `$${subtotal - DEPOSIT} on the day` },
                  { label: 'Ref', value: paymentRef },
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-start gap-4 text-sm">
                    <span style={{ color: 'var(--muted-foreground)' }}>{row.label}</span>
                    <span className="font-medium text-right" style={{ color: 'var(--foreground)' }}>{row.value}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                AJ's Glam Lab will confirm via WhatsApp on <strong>{phone}</strong> shortly.
              </p>

              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ background: 'var(--primary)', color: '#fff' }}
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        {(step === 'datetime' || step === 'details' || step === 'payment') && (
          <div
            className="px-6 py-4 sticky bottom-0"
            style={{ background: 'var(--background)', borderTop: '1px solid var(--border)' }}
          >
            {step === 'datetime' && (
              <button
                disabled={!canProceedDateTime}
                onClick={() => setStep('details')}
                className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: 'var(--primary)', color: '#fff' }}
              >
                {canProceedDateTime ? 'Continue →' : 'Select a date and time'}
              </button>
            )}
            {step === 'details' && (
              <div className="flex gap-3">
                <button
                  onClick={() => setStep('datetime')}
                  className="px-5 py-3.5 rounded-2xl text-sm font-medium border transition-colors"
                  style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                >
                  ← Back
                </button>
                <button
                  disabled={!canProceedDetails}
                  onClick={() => setStep('payment')}
                  className="flex-1 py-3.5 rounded-2xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: 'var(--primary)', color: '#fff' }}
                >
                  {canProceedDetails ? 'Review & Pay →' : 'Fill in your details'}
                </button>
              </div>
            )}
            {step === 'payment' && (
              <div className="flex gap-3">
                <button
                  onClick={() => setStep('details')}
                  className="px-5 py-3.5 rounded-2xl text-sm font-medium border transition-colors"
                  style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                >
                  ← Back
                </button>
                <button
                  onClick={handlePayAndConfirm}
                  className="flex-1 py-3.5 rounded-2xl font-semibold text-sm transition-all hover:opacity-90"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary), #b8446c)',
                    color: '#fff',
                    boxShadow: '0 8px 24px rgba(196,84,122,0.35)',
                  }}
                >
                  Pay ${DEPOSIT} & Confirm
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
