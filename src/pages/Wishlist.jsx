import {
  FiTrash2,
  FiSettings,
  FiDroplet,
  FiUsers,
  FiZap,
  FiBattery,
  FiHeart,
  FiArrowLeft,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../redux/Slices/wishlistSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { total } = useSelector(state => state.wishlist);

  const getTransmissionIcon = (transmission) => {
    if (transmission?.toLowerCase().includes("auto")) {
      return <FiZap className="text-gray-500" size={16} />;
    }
    return <FiSettings className="text-gray-500" size={16} />;
  };

  const getFuelIcon = (fuel) => {
    const f = fuel?.toLowerCase();
    if (f?.includes("hybrid") || f?.includes("electric") || f?.includes("électrique")) {
      return <FiBattery className="text-gray-500" size={16} />;
    }
    return <FiDroplet className="text-gray-500" size={16} />;
  };

  if (wishlistItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-24 px-4 flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mb-6">
            <FiHeart className="text-orange-500" size={48} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Your Wishlist is Empty</h1>
          <p className="text-gray-600 mb-8 max-w-md text-center">
            Start exploring our amazing collection of cars and add your favorites here!
          </p>
          <button
            onClick={() => navigate("/cars")}
            className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-all active:scale-95"
          >
            Explore Cars
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/cars")}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition"
              >
                <FiArrowLeft size={18} />
                Back to Cars
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-gray-700">
                <span className="font-semibold">{total}</span> {total === 1 ? 'item' : 'items'}
              </div>
              <button
                onClick={() => dispatch(clearWishlist())}
                className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-50 rounded-lg font-medium transition"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* TITLE */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
            <p className="text-gray-600">Your saved vehicles</p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:shadow-lg"
              >
                {/* IMAGE */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={car.image || "/car-placeholder.jpg"}
                    alt={car.model}
                    className="w-full h-full object-cover"
                  />

                  {/* CATEGORY BADGE */}
                  {car.category && (
                    <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs uppercase font-bold px-3 py-1 rounded">
                      {car.category}
                    </div>
                  )}

                  {/* TRASH ICON */}
                  <button
                    onClick={() => dispatch(removeFromWishlist(car.id))}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-sm"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  {/* TITLE & PRICE */}
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-gray-800 font-bold text-lg">
                        {car.brand}{" "}
                        <span className="text-gray-600 font-medium">{car.model}</span>
                      </h3>
                      <p className="text-gray-500 text-sm">{car.year}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-orange-500 font-bold text-lg">
                        {car.pricePerDay} DH
                      </span>
                      <div className="text-orange-500 text-xs">/ day</div>
                    </div>
                  </div>

                  {/* FEATURES */}
                  <div className="flex items-center justify-between mb-6 mt-4 border-t border-gray-100 pt-4">
                    {/* Transmission */}
                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="text-gray-500">
                        {getTransmissionIcon(car.transmission)}
                      </div>
                      <span className="text-xs font-medium text-gray-700">
                        {car.transmission?.includes("Auto") ? "Auto" : "Manual"}
                      </span>
                    </div>

                    {/* Fuel */}
                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="text-gray-500">
                        {getFuelIcon(car.fuel)}
                      </div>
                      <span className="text-xs font-medium text-gray-700">
                        {car.fuel}
                      </span>
                    </div>

                    {/* Seats */}
                    <div className="flex flex-col items-center gap-1 text-center">
                      <FiUsers className="text-gray-500" size={16} />
                      <span className="text-xs font-medium text-gray-700">
                        {car.seats} seats
                      </span>
                    </div>
                  </div>

                  {/* ACTION BUTTON */}
                  <button
                    onClick={() => navigate(`/cars/${car.id}`)}
                    className="w-full py-3 bg-orange-500 text-white text-sm font-bold rounded-lg hover:bg-orange-600 transition active:scale-95"
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}