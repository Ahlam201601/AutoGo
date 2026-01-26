import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Heart, LogIn } from "lucide-react";
import logo from '../../public/images/logo.svg'

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0b1d3a]/95 backdrop-blur-md py-3 shadow-xl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <img
                src={logo}
                alt="AutoGo"
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute -inset-2 bg-linear-to-r from-orange-400/20 to-transparent rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="ml-3 text-2xl font-bold bg-linear-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
              AutoGo
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center space-x-2">

            {/* Accueil (active) */}
            <div className="relative px-2 group">
              <Link to="/" className="px-4 py-2 font-medium text-orange-400">
                Accueil
              </Link>
              <span className="absolute left-1/2 -bottom-1 h-0.5 w-4/5 bg-linear-to-r from-orange-400 to-orange-300 -translate-x-1/2 rounded-full"></span>
            </div>

            {/* Voitures */}
            <div className="relative px-2 group">
              <Link to="/voitures" className="px-4 py-2 font-medium text-gray-300 hover:text-orange-300 transition">
                Voitures
              </Link>
              <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 group-hover:w-4/5 bg-linear-to-r from-orange-400 to-orange-300 -translate-x-1/2 transition-all duration-300 rounded-full"></span>
            </div>

            {/* IA */}
            <div className="relative px-2 group">
              <Link to="/ia" className="px-4 py-2 font-medium text-gray-300 hover:text-orange-300 transition">
                Recommandations IA
              </Link>
              <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 group-hover:w-4/5 bg-linear-to-r from-orange-400 to-orange-300 -translate-x-1/2 transition-all duration-300 rounded-full"></span>
            </div>

            {/* Contact */}
            <div className="relative px-2 group">
              <Link to="/contact" className="px-4 py-2 font-medium text-gray-300 hover:text-orange-300 transition">
                Contact
              </Link>
              <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 group-hover:w-4/5 bg-linear-to-r from-orange-400 to-orange-300 -translate-x-1/2 transition-all duration-300 rounded-full"></span>
            </div>

          </div>

          {/* ACTIONS */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Wishlist */}
            <button onClick={()=>{navigate("/wishlist")}}
            className="relative p-3 rounded-full bg-orange-400/10 text-orange-400 hover:bg-orange-400/20 hover:scale-105 transition">
              <Heart size={22} />
            </button>

            {/* Login */}
            <Link
              to="/login"
              className="flex items-center gap-2 bg-linear-to-r from-orange-400 to-orange-500 text-white px-6 py-2.5 rounded-full hover:from-orange-500 hover:to-orange-600 transition"
            >
              <LogIn size={18} />
              <span className="font-medium">Admin</span>
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg bg-orange-400/10 text-orange-400 hover:bg-orange-400/20 transition"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${open ? "max-h-96 mt-4" : "max-h-0"}`}>
          <div className="py-4 px-3 bg-linear-to-r from-[#0b1d3a] to-[#0a1a35] rounded-xl border border-orange-400/20 shadow-2xl space-y-2">

            <Link to="/" onClick={() => setOpen(false)} className="block px-4 py-3 text-orange-400 bg-orange-400/10 border-l-4 border-orange-400 rounded-lg">
              Accueil
            </Link>

            <Link to="/voitures" onClick={() => setOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-orange-300 hover:bg-orange-400/5 rounded-lg">
              Voitures
            </Link>

            <Link to="/ia" onClick={() => setOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-orange-300 hover:bg-orange-400/5 rounded-lg">
              Recommandations IA
            </Link>

            <Link to="/contact" onClick={() => setOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-orange-300 hover:bg-orange-400/5 rounded-lg">
              Contact
            </Link>

            <div className="pt-4 border-t border-orange-400/20 space-y-3">
              <button className="w-full flex justify-center py-3 bg-orange-400/10 text-orange-400 rounded-xl">
                <Heart size={20} />
              </button>

              <Link
                to="/login"
                className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-orange-400 to-orange-500 text-white py-3 rounded-xl"
              >
                <LogIn size={18} />
                Admin
              </Link>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}
