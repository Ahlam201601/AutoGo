import { Car, Calendar, Plus, LogOut, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/Slices/authSlice";
import toast from "react-hot-toast";

const AdminSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 cursor-pointer ${
      isActive ? "bg-orange-500 text-white" : "text-gray-300 hover:bg-[#2a3442]"
    }`;

  return (
    <>
      {/* Backdrop for Mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-[40] backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div className={`w-64 bg-[#1a2332] text-white h-screen fixed left-0 top-0 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {/* Header (with close button for mobile) */}
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">AutoGo</h2>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {/* Cars */}
            <li>
              <NavLink to="/admin" end className={linkClass} onClick={onClose}>
                <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                </div>
                Cars
              </NavLink>
            </li>

            {/* Add Car */}
            <li>
              <NavLink to="/admin/add" className={linkClass} onClick={onClose}>
                <Plus className="w-5 h-5" />
                Add Car
              </NavLink>
            </li>

            {/* Reservations */}
            <li>
              <NavLink to="/admin/reservation" className={linkClass} onClick={onClose}>
                <Calendar className="w-5 h-5" />
                Reservations
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button 
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-gray-300 hover:bg-[#2a3442] rounded-lg transition-colors flex items-center gap-3 cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
