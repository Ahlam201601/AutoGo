import React, { useState } from 'react';
import AdminSidebar from "../../components/Admin/AdminSidebar"
import CarsList from './CarsList';
import AddCar from './AddCar';
import AdminReservations from './AdminReservations'


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("cars");

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="ml-64">
        <div className="p-8">
          {activeTab === 'cars' && <CarsList />}
          {activeTab === 'add-vehicle' && <AddCar />}
          {activeTab === 'reservations' && <AdminReservations />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;