import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, MessageSquare, Briefcase, Camera } from 'lucide-react'

export function Footer() {
  const footerLinks = {
    Product: ['Features', 'Integrations', 'Pricing', 'Changelog'],
    Resources: ['Documentation', 'Blog', 'Community', 'Guides'],
    Company: ['About us', 'Careers', 'Contact', 'Partners'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  }

  return (
    <footer className="w-full px-4 pb-4 pt-20">
      <div className="bg-navy rounded-[2.5rem] px-8 py-12 md:px-16 md:py-16 max-w-[calc(100%-2rem)] md:max-w-7xl mx-auto flex flex-col gap-12 text-slate-300 shadow-xl relative z-10">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24">
          
          {/* Logo & Info */}
          <div className="flex flex-col gap-6 max-w-xs shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="text-primary-400 transition-colors">
                <Sparkles className="w-7 h-7" />
              </div>
              <span className="font-semibold text-2xl text-white tracking-tight">re-level</span>
            </Link>
            <p className="text-[15px] leading-relaxed text-slate-400">
              The ultimate tool to streamline your process and boost your productivity. Designed for modern teams.
            </p>
            
            {/* Socials */}
            <div className="flex items-center gap-5 mt-2">
              <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Twitter/X"><MessageSquare className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn"><Briefcase className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Instagram"><Camera className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 w-full">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="flex flex-col gap-4">
                <h4 className="text-white font-medium mb-1 text-[15px]">{category}</h4>
                <div className="flex flex-col gap-3">
                  {links.map((link) => (
                    <a key={link} href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 pt-8 mt-4 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/disclosures" className="hover:text-white transition-colors">AI Disclosures & Data Use</Link>
            <a href="#" className="hover:text-white transition-colors">Terms and Conditions</a>
          </div>
          <p className="text-center">© 2020 - 2025 Re-Level. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
