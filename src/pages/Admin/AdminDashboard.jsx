import { useState } from "react";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

const AdminDashboard = () => {

  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Mobile Header */}
      <div className="lg:hidden bg-[#1a2332] text-white p-4 flex justify-between items-center">

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 flex justify-center items-center rounded">
            A
          </div>

          <span className="font-bold">AutoGo Admin</span>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="p-2 hover:bg-[#2a3442] rounded cursor-pointer"
        >
          <Menu size={24} />
        </button>

      </div>

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