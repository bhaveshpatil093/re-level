import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sparkles, UserCircle } from 'lucide-react'

export function Navbar({ isApp = false }) {
  const [isOpen, setIsOpen] = useState(false)
  
  const navLinks = [
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact us', href: '#contact' },
  ]

  return (
    <>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-max">
        <div className="bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 px-4 py-2.5 flex items-center justify-between md:gap-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0 pl-2">
            <div className="text-primary-500 transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-semibold text-lg text-navy tracking-tight">re-level</span>
          </Link>

          {/* Desktop Nav */}
          {!isApp && (
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-[15px] font-medium text-slate-600 hover:text-navy transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          )}

          {/* Desktop Actions */}
          <div className="flex items-center shrink-0">
            {isApp ? (
              <button className="text-slate-500 hover:text-navy transition-colors px-2">
                <UserCircle className="w-7 h-7" />
              </button>
            ) : (
              <div className="hidden md:flex items-center shrink-0">
                <Link 
                  to="/login"
                  className="bg-navy text-white hover:bg-slate-800 transition-colors px-6 py-2 rounded-full text-[15px] font-medium"
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          {!isApp && (
            <div className="flex items-center md:hidden pr-2 ml-4 border-l border-slate-100 pl-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-600 hover:text-navy transition-colors"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {(!isApp && isOpen) && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-sm md:hidden flex flex-col pt-24 px-6">
          <div className="flex flex-col space-y-6 text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-2xl font-medium text-navy hover:text-primary-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-8 flex flex-col gap-4 w-full max-w-sm mx-auto">
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)}
                className="bg-navy text-white hover:bg-slate-800 transition-colors px-6 py-4 rounded-full text-lg font-medium w-full text-center"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
