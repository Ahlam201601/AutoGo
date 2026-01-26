import React, { useState } from 'react';
import AdminSidebar from "../../Components/Admin/AdminSidebar"
import CarsList from './CarsList';
import AddCar from './AddCar';
import AdminReservations from './AdminReservations'


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          {activeTab === 'cars' && <CarsList />}
          {activeTab === 'add-vehicle' && <AddCar />}
          {activeTab === 'reservations' && <AdminReservations />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;