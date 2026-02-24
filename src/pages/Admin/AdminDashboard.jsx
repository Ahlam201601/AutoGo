import React, { useState } from 'react';
import AdminSidebar from "../../Components/Admin/AdminSidebar"
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header - only visible below lg */}
      <div className="lg:hidden bg-[#1a2332] text-white p-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white">
            <span className="font-bold">A</span>
          </div>
          <span className="font-bold">AutoGo Admin</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 hover:bg-[#2a3442] rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Controlled Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 min-h-screen transition-all duration-300">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;