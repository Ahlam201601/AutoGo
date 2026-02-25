import { Link, NavLink } from "react-router-dom";
import { FiHeart, FiLogIn, FiMenu, FiX } from "react-icons/fi"; 
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { total } = useSelector(state => state.wishlist);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900/80 backdrop-blur-md z-50 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="text-xl sm:text-2xl font-extrabold">
            <span className="text-orange-500">Auto</span>
            <span className="text-white">Go</span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-colors hover:text-orange-500 ${isActive ? "text-orange-500" : "text-white"}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/cars"
              className={({ isActive }) =>
                `transition-colors hover:text-orange-500 ${isActive ? "text-orange-500" : "text-white"}`
              }
            >
              Cars
            </NavLink>

            <NavLink
              to="/recommendations"
              className={({ isActive }) =>
                `transition-colors hover:text-orange-500 ${isActive ? "text-orange-500" : "text-white"}`
              }
            >
              Recommendations
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `transition-colors hover:text-orange-500 ${isActive ? "text-orange-500" : "text-white"}`
              }
            >
              Contact
            </NavLink>
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/wishlist"
              className="relative text-white hover:text-orange-500 transition-colors"
            >
              <FiHeart size={22} /> {/* <-- Heart icon */}
              {total > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {total}
                </span>
              )}
            </Link>

            <Link
              to="/login"
              className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-orange-600 transition-all duration-300"
            >
              <FiLogIn size={18} />
              Admin
            </Link>
          </div>

          {/* MOBILE BUTTONS */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              to="/wishlist"
              className="relative text-white hover:text-orange-500 transition-colors"
            >
              <FiHeart size={22} /> {/* <-- Heart icon */}
              {total > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {total}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-orange-500 transition-colors p-2"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
            <div className="flex flex-col gap-4">
              <NavLink to="/" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-orange-500">
                Home
              </NavLink>

              <NavLink to="/cars" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-orange-500">
                Cars
              </NavLink>

              <NavLink to="/recommendations" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-orange-500">
                Recommendations
              </NavLink>

              <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-orange-500">
                Contact
              </NavLink>

              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-orange-600 transition-all duration-300 w-fit"
              >
                <FiLogIn size={18} />
                Admin
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
