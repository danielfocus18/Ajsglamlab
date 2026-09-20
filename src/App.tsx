import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import AdminDashboard from './components/AdminDashboard'

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  function toggleService(id: string) {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  function openBooking() {
    setBookingOpen(true)
  }

  if (isAdmin) {
    return <AdminDashboard onClientView={() => setIsAdmin(false)} />
  }

  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
      <Nav
        onBookNow={openBooking}
        onAdminClick={() => setIsAdmin(true)}
        isAdmin={false}
      />

      <main>
        <Hero onBookNow={openBooking} />
        <Services
          selected={selectedServices}
          onToggle={toggleService}
          onBookNow={openBooking}
        />
        <Gallery />
        <Testimonials />
      </main>

      <Footer />

      {bookingOpen && (
        <BookingModal
          selectedServiceIds={selectedServices.length > 0 ? selectedServices : ['classic']}
          onClose={() => setBookingOpen(false)}
        />
      )}
    </div>
  )
}
