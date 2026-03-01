import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-white/5 py-20 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          
          {/* BRANDING */}
          <div className="space-y-8">
            <Link to="/" className="text-2xl font-black tracking-tighter text-white">
              <span className="text-orange-500">Auto</span>Go
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Elevating the rental experience with a curated selection of world-class automobiles. Excellence in every journey, since 2024.
            </p>
            <div className="flex gap-6 text-gray-500">
              <a href="#" className="hover:text-orange-500 transition-colors"><FiInstagram size={20} /></a>
              <a href="#" className="hover:text-orange-500 transition-colors"><FiTwitter size={20} /></a>
              <a href="#" className="hover:text-orange-500 transition-colors"><FiFacebook size={20} /></a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-8">
            <h4 className="text-white font-black uppercase text-xs tracking-[0.3em]">Navigation</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Experience Home</Link></li>
              <li><Link to="/cars" className="text-gray-400 hover:text-white transition-colors">The Showroom</Link></li>
              <li><Link to="/recommendations" className="text-gray-400 hover:text-white transition-colors">AI Curator</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Reservations</Link></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div className="space-y-8">
            <h4 className="text-white font-black uppercase text-xs tracking-[0.3em]">Corporate</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Signature</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Elite Membership</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="space-y-8">
            <h4 className="text-white font-black uppercase text-xs tracking-[0.3em]">Contact</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3 text-gray-400">
                <FiMapPin size={18} className="text-orange-500" />
                <span>123 Nouaceur, Casablanca</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FiPhone size={18} className="text-orange-500" />
                <span>+212 6 75 45 67 89</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FiMail size={18} className="text-orange-500" />
                <span>concierge@autogo.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-white/5 text-center">
          <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.6em]">
            © 2026 AutoGo Signature Series. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}