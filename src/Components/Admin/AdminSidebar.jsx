import { Car, Calendar, Plus, LogOut, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/Slices/authSlice";
import toast from "react-hot-toast";

const AdminSidebar = ({ isOpen, closeSidebar }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Logout */
  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logout successful");
    navigate("/login");
  };

  return (
    <>

      {/* Overlay Mobile */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 w-64 h-screen bg-[#1a2332] text-white z-50
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}>

        {/* Header */}
        <div className="flex justify-between p-6 border-b border-gray-700">

          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 bg-orange-500 flex justify-center items-center rounded">
              <Car size={22}/>
            </div>

            <h2 className="text-xl font-bold">AutoGo</h2>
          </div>

          <button onClick={closeSidebar} className="lg:hidden cursor-pointer">
            <X size={22}/>
          </button>

        </div>

        {/* Menu */}
        <div className="p-4 space-y-2">

          <NavLink
            to="/admin"
            end
            onClick={closeSidebar}
            className={({isActive}) =>
              `flex gap-3 p-3 rounded
              ${isActive ? "bg-orange-500 text-white" : "text-gray-300 hover:bg-[#2a3442]"}`
            }
          >
            <Car size={20}/>
            Cars
          </NavLink>

          <NavLink
            to="/admin/add"
            onClick={closeSidebar}
            className={({isActive}) =>
              `flex gap-3 p-3 rounded
              ${isActive ? "bg-orange-500 text-white" : "text-gray-300 hover:bg-[#2a3442]"}`
            }
          >
            <Plus size={20}/>
            Add Car
          </NavLink>

          <NavLink
            to="/admin/reservation"
            onClick={closeSidebar}
            className={({isActive}) =>
              `flex gap-3 p-3 rounded
              ${isActive ? "bg-orange-500 text-white" : "text-gray-300 hover:bg-[#2a3442]"}`
            }
          >
            <Calendar size={20}/>
            Reservations
          </NavLink>

        </div>

        {/* Logout */}
        <div className="absolute bottom-0 w-full border-t border-gray-700 p-4">

          <button
            onClick={logoutHandler}
            className="w-full flex gap-3 p-3 text-gray-300 hover:bg-[#2a3442] rounded cursor-pointer"
          >
            <LogOut size={20}/>
            Logout
          </button>

        </div>

      </div>
    </>
  );
};

export default AdminSidebar;