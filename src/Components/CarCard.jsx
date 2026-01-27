import { FiEdit, FiTrash2, FiSettings, FiDroplet, FiTag } from "react-icons/fi";
import { useState } from "react";
import EditCar from "../pages/Admin/EditCar";

export default function CarCard({ car, isAdmin, onDeleteClick }) {
  const [editCar, setEditCar] = useState(false);
  const [currentCar, setCurrentCar] = useState(car);

  const handleUpdate = (updatedCar) => {
    setCurrentCar(updatedCar);
  };

  return (
    <>
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md group max-w-sm">
      {/* IMAGE SECTION */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={car.image || "/car-placeholder.jpg"}
          alt={car.model}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* CATEGORY BADGE */}
        <div className="absolute top-3 left-3 bg-[#1A202C]/80 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-lg shadow-lg">
          {car.category}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* TITLE & PRICE */}
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-[#1A202C] font-bold text-lg leading-tight">
            {car.brand}{" "}
            <span className="text-gray-500 font-medium">{car.model}</span>
          </h3>
          <div className="flex flex-col items-end">
            <span className="text-[#F97316] font-bold text-lg">
              {car.pricePerDay} DH
            </span>
            <span className="text-[#F97316] text-[12px] -mt-1">/ day</span>
          </div>
        </div>

        {/* YEAR */}
        <p className="text-gray-400 text-xs mb-4">{car.year}</p>

        {/* FEATURES */}
        <div className="flex flex-wrap gap-3 text-gray-600 text-sm mb-5">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
            <FiSettings className="text-gray-500" size={16} />
            <span className="font-medium">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
            <FiDroplet className="text-gray-500" size={16} />
            <span className="font-medium">{car.fuel}</span>
          </div>
          {car.seats && (
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
              <FiTag className="text-gray-500" size={16} />
              <span className="font-medium">{car.seats} seats</span>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2">
          {isAdmin ? (
            <>
              <button
                onClick={() => setEditCar(true)}
                className="flex-3 flex items-center justify-center gap-2 py-2 px-3 bg-white border border-gray-200 text-[#1A202C] text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                <FiEdit size={16} />
                Edit
              </button>

              <button
                onClick={() => onDeleteClick(currentCar.id)}
                className="flex-1 flex items-center justify-center p-2 border border-red-500 text-red-500 rounded-xl hover:bg-red-50 transition-colors"
              >
                <FiTrash2 size={18} />
              </button>
            </>
          ) : (
            <button className="w-full py-2.5 bg-[#F97316] text-white text-sm font-bold rounded-xl hover:bg-orange-600 transition-all shadow-md shadow-orange-100 active:scale-95">
              Rent Now
            </button>
          )}
        </div>
      </div>
    </div>

    {/* EDIT POPUP */}
      {editCar && (
        <EditCar 
          car={currentCar} 
          onClose={() => setEditCar(false)} 
          onUpdate={handleUpdate} 
        />
      )}
    </>

    
  );
}
