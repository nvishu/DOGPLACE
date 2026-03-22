'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, ChevronDown, User, LogOut, Shield } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import DogLogo from '@/components/ui/DogLogo'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('dop_user')
    if (stored) setUser(JSON.parse(stored))
  }, [pathname])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const logout = () => {
    localStorage.removeItem('dop_user')
    setUser(null)
    setUserMenuOpen(false)
    router.push('/')
  }

  const isAdmin = user?.role === 'admin'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-warm py-2' : 'bg-transparent py-4'
    }`}>
      <div className="page-container">
        <div className="flex items-center justify-between">
          <Link href="/" className="group">
            <DogLogo size={42} showText={true} className="group-hover:scale-[1.03] transition-transform duration-200" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href}
                className={`nav-link text-sm ${pathname === link.href || pathname.startsWith(link.href + '/') ? 'text-brand-primary after:w-full' : ''}`}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-light text-brand-dark font-semibold hover:bg-orange-100 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-sm font-bold">
                    {user.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span>{user.name?.split(' ')[0]}</span>
                  {isAdmin && <Shield size={13} className="text-brand-primary" />}
                  <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-warm-lg border border-orange-100 overflow-hidden animate-fade-in">
                    {isAdmin && (
                      <Link href="/admin" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50 transition-colors text-amber-700 font-bold text-sm border-b border-orange-100">
                        <Shield size={15}/> Admin Panel
                      </Link>
                    )}
                    <Link href="/dashboard" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-brand-light transition-colors text-brand-dark font-medium">
                      <User size={16} /> Dashboard
                    </Link>
                    <Link href="/dashboard/dogs" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-brand-light transition-colors text-brand-dark font-medium">
                      🐕 My Dogs
                    </Link>
                    <Link href="/dashboard/appointments" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-brand-light transition-colors text-brand-dark font-medium">
                      📅 Appointments
                    </Link>
                    <hr className="border-orange-100" />
                    <button onClick={logout}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600 font-medium w-full text-left">
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="btn-secondary text-sm px-5 py-2">Login</Link>
                <Link href="/auth/register" className="btn-primary text-sm px-5 py-2">Get Started 🐾</Link>
              </>
            )}
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-brand-dark">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-4 pb-4 bg-white rounded-2xl shadow-warm-lg p-4 animate-fade-in">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                className={`block py-3 px-4 rounded-xl font-semibold transition-colors ${
                  pathname === link.href ? 'bg-brand-light text-brand-primary' : 'text-brand-dark hover:bg-brand-light hover:text-brand-primary'
                }`}>
                {link.label}
              </Link>
            ))}
            <hr className="my-3 border-orange-100" />
            {user ? (
              <>
                {isAdmin && (
                  <Link href="/admin" onClick={() => setOpen(false)}
                    className="block py-3 px-4 rounded-xl font-bold text-amber-700 bg-amber-50 mb-1 hover:bg-amber-100 transition-colors">
                    🛡️ Admin Panel
                  </Link>
                )}
                <Link href="/dashboard" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-xl font-semibold text-brand-dark hover:bg-brand-light transition-colors">Dashboard</Link>
                <button onClick={logout} className="block py-3 px-4 rounded-xl font-semibold text-red-600 hover:bg-red-50 transition-colors w-full text-left">Sign Out</button>
              </>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <Link href="/auth/login" onClick={() => setOpen(false)} className="btn-secondary justify-center">Login</Link>
                <Link href="/auth/register" onClick={() => setOpen(false)} className="btn-primary justify-center">Get Started 🐾</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
