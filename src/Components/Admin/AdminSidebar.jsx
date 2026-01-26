import React, { useEffect } from "react";
import { Car, Calendar, Plus, LogOut } from "lucide-react";

const AdminSidebar = ({ activeTab, setActiveTab }) => {

  return (
    <div className="w-64 bg-[#1a2332] text-white h-screen fixed left-0 top-0 flex flex-col z-50">
      
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <Car className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold">AutoGo</h2>
        </div>
        <p className="text-gray-400 text-sm">Administration</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">

          {/* Cars */}
          <li>
            <button
              onClick={() => setActiveTab("cars")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                activeTab === "cars"
                  ? "bg-orange-500 text-white"
                  : "text-gray-300 hover:bg-[#2a3442]"
              }`}
            >
              <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
                <div className="w-2 h-2 bg-current rounded-sm"></div>
                <div className="w-2 h-2 bg-current rounded-sm"></div>
                <div className="w-2 h-2 bg-current rounded-sm"></div>
                <div className="w-2 h-2 bg-current rounded-sm"></div>
              </div>
              Cars
            </button>
          </li>

          {/* Add Car */}
          <li>
            <button
              onClick={() => setActiveTab("add-vehicle")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                activeTab === "add-vehicle"
                  ? "bg-orange-500 text-white"
                  : "text-gray-300 hover:bg-[#2a3442]"
              }`}
            >
              <Plus className="w-5 h-5" />
              Add Car
            </button>
          </li>

          {/* Reservations */}
          <li>
            <button
              onClick={() => setActiveTab("reservations")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                activeTab === "reservations"
                  ? "bg-orange-500 text-white"
                  : "text-gray-300 hover:bg-[#2a3442]"
              }`}
            >
              <Calendar className="w-5 h-5" />
              Reservations
            </button>
          </li>

        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button className="w-full text-left px-4 py-3 text-gray-300 hover:bg-[#2a3442] rounded-lg transition-colors flex items-center gap-3">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
