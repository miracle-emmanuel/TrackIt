import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import logo from '../src/logo.png'
// ---------- Supabase ----------
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

const generateUniqueTrackingId = () => {
  return Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join('')
}

// ---------- Header (UPDATED) ----------
function Header({ onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
             <img src={logo} alt="" srcset=""onClick={() => onNavigate('home')} className="w-32" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button onClick={() => onNavigate('home')} className="hover:text-teal-400 transition">Ship</button>
            <button onClick={() => onNavigate('track')} className="hover:text-teal-400 transition">Track</button>
            <button className="hover:text-teal-400 transition">Services</button>
            <button className="hover:text-teal-400 transition">Support</button>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              // Close Icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col gap-3 text-sm font-medium">
              <button
                onClick={() => {
                  onNavigate('home')
                  setIsMenuOpen(false)
                }}
                className="text-left hover:text-teal-400 transition py-2"
              >
                Ship
              </button>
              <button
                onClick={() => {
                  onNavigate('track')
                  setIsMenuOpen(false)
                }}
                className="text-left hover:text-teal-400 transition py-2"
              >
                Track
              </button>
              <button className="text-left hover:text-teal-400 transition py-2">
                Services
              </button>
              <button className="text-left hover:text-teal-400 transition py-2">
                Support
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

// ---------- Hero ----------
function Hero({ onTrackClick }) {
  return (
    <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
          Ship with confidence
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mb-10">Reliable delivery worldwide.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-3 rounded-lg transition">
            Get a quote
          </button>
          <button
            onClick={onTrackClick}
            className="border-2 border-teal-400 text-teal-400 font-semibold px-8 py-3 rounded-lg hover:bg-teal-400/10 transition"
          >
            Track shipment
          </button>
        </div>
      </div>
    </section>
  )
}

// ---------- Live Tracking ----------
function LiveTracking({ onTrack }) {
  const [trackingNumber, setTrackingNumber] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (trackingNumber.trim()) onTrack(trackingNumber.trim())
  }

  return (
    <section className="max-w-4xl mx-auto px-4 -mt-10 relative z-10">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-100">
        <p className="text-teal-600 text-xs font-semibold tracking-wider uppercase mb-2">Live Tracking</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Track your shipment</h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter tracking number"
            className="flex-1 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            Track →
          </button>
        </form>
      </div>
    </section>
  )
}

// ---------- Services ----------
function Services() {
  const services = [
    { title: 'Express', desc: 'Fast delivery', price: '$12' },
    { title: 'Ground', desc: 'Economy option', price: '$8' },
    { title: 'Freight', desc: 'Heavy shipments', price: 'Quote' },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
      <p className="text-teal-600 text-xs font-semibold tracking-wider uppercase mb-2">Our Services</p>
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Shipping Made Simple</h2>
      <p className="text-slate-600 mb-10">Choose the service that fits your needs</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.title} className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition bg-white">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">{s.title}</h3>
            <p className="text-slate-500 text-sm mb-4">{s.desc}</p>
            <p className="text-teal-600 font-semibold text-lg">{s.price}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ---------- Footer ----------
function Footer({ onNavigate }) {
  return (
    <footer className="bg-slate-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-6">
          <center>
               <img src={logo} alt="" srcset=""onClick={() => onNavigate('home')} className="w-32" />
          </center>
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <button onClick={() => onNavigate('home')} className="hover:text-teal-400">Ship</button>
            <button onClick={() => onNavigate('track')} className="hover:text-teal-400">Track</button>
            <button className="hover:text-teal-400">Services</button>
            <button className="hover:text-teal-400">About</button>
            <button className="hover:text-teal-400">Support</button>
            <button className="hover:text-teal-400">Privacy</button>
          </nav>
        </div>

        <p className="text-center text-sm text-slate-400 mb-4">
          © TrackIT 2026. All rights reserved.
        </p>

        <div className="text-center">
          <button
            onClick={() => onNavigate('admin')}
            className="text-xs text-slate-500 hover:text-teal-400 transition"
          >
            Admin
          </button>
        </div>
      </div>
    </footer>
  )
}

// ---------- Tracking Result ----------
function TrackingResult({ shipment, onBack }) {
  if (!shipment) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Shipment not found</h2>
        <button onClick={onBack} className="text-teal-600 hover:underline">← Back to tracking</button>
      </div>
    )
  }

  const isSuspended = shipment.status === 'Suspended'

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-1">Delivery Status</p>
        <h1 className="text-3xl font-bold text-slate-900">{shipment.status}</h1>
      </div>

      <div className={`border rounded-xl p-4 mb-8 flex gap-3 ${isSuspended ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isSuspended ? 'bg-red-200' : 'bg-slate-200'}`}>
          <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-slate-800 text-sm uppercase">
            {isSuspended ? 'SUSPENDED' : 'CURRENT STATUS'}
          </p>
          <p className="text-sm text-slate-600">
            {isSuspended
              ? 'Shipment is currently suspended. Payment is required to continue shipping.'
              : shipment.status_detail || "Shipment created -- awaiting pickup."}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-1">Tracking ID</p>
        <p className="text-xl font-mono font-medium text-slate-900">{shipment.tracking_number}</p>
      </div>

      <div className="relative pl-8 mb-10">
        <div className="absolute left-3 top-2 bottom-0 w-0.5 bg-slate-200"></div>

        <div className="relative mb-8">
          <div className={`absolute -left-5 w-6 h-6 rounded-full flex items-center justify-center ${isSuspended ? 'bg-red-500' : 'bg-teal-500'}`}>
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="font-bold text-slate-900">{shipment.status?.toUpperCase()}</p>
            {shipment.current_location && (
              <p className="text-sm font-medium text-slate-800 mt-1">📍 {shipment.current_location}</p>
            )}
            <p className="text-sm text-slate-600 mt-1">{shipment.origin_country || '—'}</p>
            <p className="text-sm text-slate-500 mb-3">Vendor and shipping fee</p>

            {isSuspended && shipment.pay_amount && (
              <div className="mt-3">
                <button className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
                  Pay {shipment.pay_amount} to continue shipping
                </button>
                <p className="text-xs text-slate-500 mt-2">After payment, the admin will remove the suspension.</p>
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-5 w-6 h-6 bg-slate-300 rounded-full border-4 border-white"></div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">To</p>
            <p className="font-bold text-slate-900">{shipment.destination_country || '—'}</p>
            <p className="text-sm text-teal-600 font-medium">Est. delivery: {shipment.est_delivery || '—'}</p>
          </div>
        </div>
      </div>

      {shipment.package_photo_url && (
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-3">Package Photo</p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
            <img src={shipment.package_photo_url} alt={shipment.package_name || 'Package'} className="w-full h-64 object-cover" />
          </div>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Shipment facts</h3>
        <div className="space-y-3 text-sm">
          {[
            ['Tracking number', shipment.tracking_number],
            ['Service', shipment.service],
            ['Weight', shipment.weight],
            ['Sender', shipment.sender],
            ['Sender location', shipment.sender_location],
            ['Recipient', shipment.recipient],
            ['Destination', shipment.destination_address],
            ['Current Location', shipment.current_location],
            ['Package', shipment.package_name],
            ['Est. delivery', shipment.est_delivery],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">{label}</span>
              <span className="font-medium text-slate-900 text-right max-w-[60%]">{value || '—'}</span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onBack} className="text-teal-600 font-medium hover:underline">← Back to tracking</button>
    </div>
  )
}

// ---------- ADMIN PANEL ----------
function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('admin_authenticated') === 'true')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [uploading, setUploading] = useState(false)

  const emptyForm = {
    tracking_number: '',
    status: 'Pending',
    status_detail: "Shipment created -- awaiting pickup. The package hasn't started moving yet.",
    origin_country: '',
    origin_datetime: '',
    destination_country: '',
    est_delivery: '',
    service: '',
    weight: '',
    sender: '',
    sender_location: '',
    recipient: '',
    destination_address: '',
    package_name: '',
    package_photo_url: '',
    pay_amount: '',
    current_location: '',
  }

  const [shipments, setShipments] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!supabase) {
      setPasswordError('Supabase is not configured')
      return
    }
    setIsLoggingIn(true)
    setPasswordError('')

    try {
      const { data, error } = await supabase.from('admin_settings').select('password').eq('id', 1).single()
      if (error || !data) {
        setPasswordError('Could not verify password. Did you run the SQL setup?')
        setIsLoggingIn(false)
        return
      }
      if (password === data.password) {
        setIsAuthenticated(true)
        sessionStorage.setItem('admin_authenticated', 'true')
      } else {
        setPasswordError('Incorrect password')
      }
    } catch {
      setPasswordError('Login failed')
    }
    setIsLoggingIn(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_authenticated')
  }

  const loadShipments = async () => {
    if (!supabase) return
    setLoading(true)
    const { data } = await supabase.from('shipments').select('*').order('created_at', { ascending: false })
    setShipments(data || [])
    setLoading(false)
  }

  useEffect(() => {
    if (isAuthenticated) loadShipments()
  }, [isAuthenticated])

  const handleGenerateTrackingId = () => {
    setForm(prev => ({ ...prev, tracking_number: generateUniqueTrackingId() }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file || !supabase) return
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB')
      return
    }
    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const { error } = await supabase.storage.from('package-photos').upload(fileName, file)
      if (error) throw error
      const { data } = supabase.storage.from('package-photos').getPublicUrl(fileName)
      setForm(prev => ({ ...prev, package_photo_url: data.publicUrl }))
    } catch (err) {
      alert('Upload failed: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!supabase) return alert('Supabase not configured')
    if (!form.tracking_number) return alert('Generate a Tracking ID first')

    if (editingId) {
      const { error } = await supabase.from('shipments').update(form).eq('id', editingId)
      if (error) alert(error.message)
      else {
        setEditingId(null)
        setForm(emptyForm)
        loadShipments()
        alert('Updated!')
      }
    } else {
      const { error } = await supabase.from('shipments').insert([form])
      if (error) alert(error.message)
      else {
        loadShipments()
        alert('Created!')
        setForm(emptyForm)
      }
    }
  }

  const editShipment = (s) => {
    setForm({ ...s })
    setEditingId(s.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deleteShipment = async (id) => {
    if (!confirm('Delete this shipment?')) return
    await supabase.from('shipments').delete().eq('id', id)
    loadShipments()
  }

  const removeSuspension = async (s) => {
    await supabase.from('shipments').update({
      status: 'In Transit',
      status_detail: 'Payment received. Shipment is now moving.'
    }).eq('id', s.id)
    loadShipments()
    alert('Suspension removed!')
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white border rounded-2xl p-8 shadow-xl">
          <h1 className="text-2xl font-bold text-center mb-2 text-slate-900">Admin Login</h1>
          <p className="text-center text-slate-500 text-sm mb-8">Enter the password you set in Supabase</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter admin password"
                autoFocus
              />
              {passwordError && <p className="text-red-600 text-sm mt-2">{passwordError}</p>}
            </div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white py-3 rounded-lg font-medium"
            >
              {isLoggingIn ? 'Checking...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Panel</h1>
        <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">Logout</button>
      </div>

      <div className="bg-slate-50 border rounded-xl p-5 mb-10 flex items-center gap-3">
        {supabase ? (
          <>
            <span className="text-teal-600 text-xl">✓</span>
            <div>
              <p className="font-medium text-teal-700">Connected to Supabase</p>
              <p className="text-sm text-slate-500">Credentials from .env • Password from database</p>
            </div>
          </>
        ) : (
          <p className="text-red-600">Supabase not configured – check your .env file</p>
        )}
      </div>

      <div className="bg-white border rounded-xl p-6 mb-10 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 text-slate-900">
          {editingId ? 'Edit Shipment' : 'Create New Shipment'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Tracking ID *</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={form.tracking_number}
                readOnly
                className="flex-1 border rounded-lg px-3 py-2 bg-slate-50 font-mono"
                placeholder="Click Generate"
              />
              <button
                type="button"
                onClick={handleGenerateTrackingId}
                className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-medium"
              >
                Generate Tracking ID
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Payment Amount</label>
              <input
                type="text"
                value={form.pay_amount}
                onChange={(e) => setForm({ ...form, pay_amount: e.target.value })}
                placeholder="50.00 EUR"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Current Location</label>
            <input
              type="text"
              value={form.current_location}
              onChange={(e) => setForm({ ...form, current_location: e.target.value })}
              placeholder="New York Sorting Facility"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Package Photo</label>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <label className="cursor-pointer inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium">
                {uploading ? 'Uploading...' : 'Upload from Device'}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
              </label>
              {form.package_photo_url && (
                <div className="relative">
                  <img src={form.package_photo_url} alt="Preview" className="w-28 h-28 object-cover rounded-lg border" />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, package_photo_url: '' })}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            <input
              type="url"
              value={form.package_photo_url}
              onChange={(e) => setForm({ ...form, package_photo_url: e.target.value })}
              placeholder="Or paste image URL"
              className="w-full border rounded-lg px-3 py-2 mt-3 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Service</label>
              <input type="text" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Weight</label>
              <input type="text" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sender</label>
              <input type="text" value={form.sender} onChange={(e) => setForm({ ...form, sender: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sender Location</label>
              <input type="text" value={form.sender_location} onChange={(e) => setForm({ ...form, sender_location: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Recipient</label>
              <input type="text" value={form.recipient} onChange={(e) => setForm({ ...form, recipient: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Destination Address</label>
              <input type="text" value={form.destination_address} onChange={(e) => setForm({ ...form, destination_address: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Destination Country</label>
              <input type="text" value={form.destination_country} onChange={(e) => setForm({ ...form, destination_country: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Origin Country</label>
              <input type="text" value={form.origin_country} onChange={(e) => setForm({ ...form, origin_country: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Package Name</label>
              <input type="text" value={form.package_name} onChange={(e) => setForm({ ...form, package_name: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Estimated Delivery</label>
              <input type="text" value={form.est_delivery} onChange={(e) => setForm({ ...form, est_delivery: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Status Detail</label>
              <input type="text" value={form.status_detail} onChange={(e) => setForm({ ...form, status_detail: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-2.5 rounded-lg font-medium">
              {editingId ? 'Update Shipment' : 'Create Shipment'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm) }} className="border px-6 py-2.5 rounded-lg">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-slate-900">All Shipments ({shipments.length})</h2>
        {loading ? <p>Loading...</p> : shipments.length === 0 ? (
          <p className="text-slate-500">No shipments yet.</p>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm border">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="p-3 text-left">Tracking #</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Location</th>
                    <th className="p-3 text-left">Recipient</th>
                    <th className="p-3 text-left">Pay</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map((s) => (
                    <tr key={s.id} className="border-t">
                      <td className="p-3 font-mono text-sm">{s.tracking_number}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          s.status === 'Suspended' ? 'bg-red-100 text-red-700' :
                          s.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          s.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>{s.status}</span>
                      </td>
                      <td className="p-3">{s.current_location || '—'}</td>
                      <td className="p-3">{s.recipient}</td>
                      <td className="p-3">{s.pay_amount || '—'}</td>
                      <td className="p-3 flex gap-2">
                        <button onClick={() => editShipment(s)} className="text-teal-600 hover:underline text-sm">Edit</button>
                        {s.status === 'Suspended' && (
                          <button onClick={() => removeSuspension(s)} className="text-green-600 hover:underline text-sm">Remove Suspension</button>
                        )}
                        <button onClick={() => deleteShipment(s.id)} className="text-red-600 hover:underline text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4">
              {shipments.map((s) => (
                <div key={s.id} className="bg-white border rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <p className="font-mono text-sm break-all">{s.tracking_number}</p>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      s.status === 'Suspended' ? 'bg-red-100 text-red-700' :
                      s.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      s.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>{s.status}</span>
                  </div>
                  <div className="space-y-1 text-sm mb-4">
                    <p><span className="text-slate-500">Recipient:</span> {s.recipient || '—'}</p>
                    <p><span className="text-slate-500">Location:</span> {s.current_location || '—'}</p>
                    <p><span className="text-slate-500">Pay:</span> {s.pay_amount || '—'}</p>
                  </div>
                  <div className="flex gap-3 pt-3 border-t">
                    <button onClick={() => editShipment(s)} className="text-teal-600 text-sm font-medium">Edit</button>
                    {s.status === 'Suspended' && (
                      <button onClick={() => removeSuspension(s)} className="text-green-600 text-sm font-medium">Remove Suspension</button>
                    )}
                    <button onClick={() => deleteShipment(s.id)} className="text-red-600 text-sm font-medium">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ---------- MAIN APP ----------
export default function App() {
  const [page, setPage] = useState('home')
  const [shipment, setShipment] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleTrack = async (trackingNumber) => {
    if (!supabase) {
      alert('System not configured')
      return
    }
    setLoading(true)
    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .eq('tracking_number', trackingNumber)
      .single()
    setShipment(error ? null : data)
    setPage('result')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header onNavigate={setPage} />

      {page === 'home' && (
        <>
          <Hero onTrackClick={() => setPage('track')} />
          <LiveTracking onTrack={handleTrack} />
          <Services />
        </>
      )}

      {page === 'track' && (
        <div className="flex-1 py-10">
          <LiveTracking onTrack={handleTrack} />
        </div>
      )}

      {page === 'result' && (
        loading ? (
          <div className="flex-1 flex items-center justify-center">Loading...</div>
        ) : (
          <TrackingResult shipment={shipment} onBack={() => setPage('track')} />
        )
      )}

      {page === 'admin' && <AdminPanel />}

      <Footer onNavigate={setPage} />
    </div>
  )
}
