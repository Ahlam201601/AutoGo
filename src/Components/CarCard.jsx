import {
  FiEdit,
  FiTrash2,
  FiSettings,
  FiDroplet,
  FiUsers,
  FiZap,
  FiBattery,
} from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditCar from "../pages/Admin/EditCar";

export default function CarCard({ car, isAdmin, onDeleteClick }) {
  const [editCar, setEditCar] = useState(false);
  const [currentCar, setCurrentCar] = useState(car);
  const navigate = useNavigate();

  const handleUpdate = (updatedCar) => {
    setCurrentCar(updatedCar);
  };

  // Fonction pour retourner l'icône de transmission appropriée
  const getTransmissionIcon = () => {
    if (car.transmission?.toLowerCase().includes("auto")) {
      return <FiZap className="text-gray-500" size={16} />;
    }
    return <FiSettings className="text-gray-500" size={16} />;
  };

  // Fonction pour retourner l'icône de carburant appropriée
  const getFuelIcon = () => {
    const fuel = car.fuel?.toLowerCase();
    if (
      fuel?.includes("hybrid") ||
      fuel?.includes("électrique") ||
      fuel?.includes("electric")
    ) {
      return <FiBattery className="text-gray-500" size={16} />;
    }
    return <FiDroplet className="text-gray-500" size={16} />;
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
          <p className="text-gray-400 text-xs mb-3">{car.year}</p>

          {/* FEATURES - Sur une seule ligne sans fond */}
          <div className="flex items-center justify-between mb-4">
            {/* Transmission */}
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="text-gray-500">{getTransmissionIcon()}</div>
              <span className="text-xs font-medium text-gray-700">
                {car.transmission?.includes("Auto") ? "Auto" : "Manual"}
              </span>
            </div>

            {/* Carburant */}
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="text-gray-500">{getFuelIcon()}</div>
              <span className="text-xs font-medium text-gray-700">
                {car.fuel}
              </span>
            </div>

            {/* Sièges */}
            <div className="flex flex-col items-center gap-1 text-center">
              <FiUsers className="text-gray-500" size={16} />
              <span className="text-xs font-medium text-gray-700">
                {car.seats || 4} seats
              </span>
            </div>
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
              <button
                onClick={() => navigate(`/cars/${car.id}`)}
                className="w-full py-2.5 mt-4 bg-[#F97316] text-white text-sm font-bold rounded-xl hover:bg-orange-600 transition-all shadow-md shadow-orange-100 active:scale-95"
              >
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
