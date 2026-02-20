import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import { Check } from "lucide-react";

import { addToWishlist, removeFromWishlist } from "../redux/Slices/wishlistSlice";
import {
  FiArrowLeft,
  FiHeart,
  FiDroplet,
  FiUsers,
  FiSettings,
  FiCalendar,
  FiStar,
} from "react-icons/fi";

export default function CarDetailsPage() {
  const { id } = useParams();
  const { cars } = useSelector((state) => state.cars);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const car = cars.find((c) => c.id === id);
  if (!car) return null;


  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white pt-26 px-4 md:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* BACK BUTTON */}
          <div className="mb-6">
            <Link
              to="/cars"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
              <FiArrowLeft size={20} />
              <span className="text-base font-medium">Back to Cars</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* LEFT COLUMN - IMAGE */}
            <div className="relative">
              <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-64 sm:h-80 md:h-96 object-cover"
                />
              </div>

              {/* FAVORITE */}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <FiHeart
                  size={24}
                  className={
                    isFavorite
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600"
                  }
                />
              </button>
              
            </div>

            {/* RIGHT COLUMN - DETAILS */}
            <div className="space-y-8">
              {/* TITLE & PRICE */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {car.brand} {car.model}
                </h1>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-bold text-orange-500">
                    {car.pricePerDay} DH
                  </span>
                  <span className="text-gray-500 text-lg">/ day</span>
                </div>
                <p className="text-gray-500 mt-2">
                  Comprehensive insurance included
                </p>
              </div>

              {/* DESCRIPTION */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {car.description}
                </p>
              </div>

              {/* SPECIFICATIONS */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                  <FiDroplet className="text-orange-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Fuel</p>
                    <p className="font-semibold text-gray-900">{car.fuel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                  <FiUsers className="text-orange-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Seats</p>
                    <p className="font-semibold text-gray-900">{car.seats} seats</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                  <FiSettings className="text-orange-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Transmission</p>
                    <p className="font-semibold text-gray-900">{car.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                  <FiCalendar className="text-orange-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Year</p>
                    <p className="font-semibold text-gray-900">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                  <FiDroplet className="text-orange-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Consumption</p>
                    <p className="font-semibold text-gray-900">{car.consumption || "8.2 L / 100km"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                  <FiStar className="text-orange-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Color</p>
                    <p className="font-semibold text-gray-900">{car.color}</p>
                  </div>
                </div>
              </div>

              {/* DIVIDER */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* EQUIPMENT */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Equipment
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3">
    {car.equipments?.map((item, index) => (
      <div
        key={index}
        className="flex items-center gap-2 text-gray-700"
      >
        <svg
          className="w-5 h-5 text-orange-500 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>

        <span className="text-sm">{item}</span>
      </div>
    ))}
  </div>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link
                  to={`/reservation/${car.id}`}
                  className="flex-1 bg-orange-500 text-white py-4 px-6 rounded-xl font-bold text-center hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl"
                >
                  Reserve this car
                </Link>

                <button className="flex-1 border-2 border-orange-500 text-orange-500 py-4 px-6 rounded-xl font-bold hover:bg-orange-50 transition-all"
                  onClick={()=>navigate("/contact")}>
                  Contact us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}