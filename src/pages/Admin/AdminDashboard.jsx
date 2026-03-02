import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import AdminSidebar from "../../Components/Admin/AdminSidebar";

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 relative">

      {/* Mobile Header - ONLY MENU ICON */}
      <div className="lg:hidden bg-[#1a2332] text-white p-4 flex justify-end items-center">
        <button
          onClick={() => setOpen(true)}
          className="p-2 hover:bg-[#2a3442] rounded transition cursor-pointer"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay (Mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <AdminSidebar
        isOpen={open}
        closeSidebar={() => setOpen(false)}
      />

      {/* Content */}
      <div className="lg:ml-64 p-6">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminDashboard;