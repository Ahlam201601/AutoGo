import React from 'react';
import AdminSidebar from "../../Components/Admin/AdminSidebar"
import { Outlet } from 'react-router-dom';


const AdminDashboard = () => {

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="ml-64">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;