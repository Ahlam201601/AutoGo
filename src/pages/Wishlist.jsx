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
                className="flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md group"
              >
                {/* IMAGE */}
                <div className="relative h-52 shrink-0 overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.model}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* CATEGORY BADGE */}
                  {car.category && (
                    <div className="absolute top-3 left-3 bg-[#1A202C]/80 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-lg shadow-lg">
                      {car.category}
                    </div>
                  )}

                  {/* TRASH ICON */}
                  <button
                    onClick={() => dispatch(removeFromWishlist(car.id))}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-md cursor-pointer"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>

                {/* CONTENT */}
                <div className="p-5 flex flex-col flex-1">
                  {/* TITLE & PRICE */}
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-[#1A202C] font-bold text-lg leading-tight">
                      {car.brand}{" "}
                      <span className="text-gray-500 font-medium">{car.model}</span>
                    </h3>
                    <div className="flex flex-col items-end shrink-0">
                      <span className="text-[#F97316] font-bold text-lg">
                        {car.pricePerDay} DH
                      </span>
                      <span className="text-[#F97316] text-[12px] -mt-1">/ day</span>
                    </div>
                  </div>

                  {/* YEAR */}
                  <p className="text-gray-400 text-xs mb-3">{car.year}</p>

                  {/* FEATURES */}
                  <div className="flex items-center justify-between mb-4">
                    {/* Transmission */}
                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="text-gray-500">{getTransmissionIcon(car.transmission)}</div>
                      <span className="text-xs font-medium text-gray-700">
                        {car.transmission?.includes("Auto") ? "Auto" : "Manual"}
                      </span>
                    </div>

                    {/* Fuel */}
                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="text-gray-500">{getFuelIcon(car.fuel)}</div>
                      <span className="text-xs font-medium text-gray-700">{car.fuel}</span>
                    </div>

                    {/* Seats */}
                    <div className="flex flex-col items-center gap-1 text-center">
                      <FiUsers className="text-gray-500" size={16} />
                      <span className="text-xs font-medium text-gray-700">{car.seats} seats</span>
                    </div>

                    {/* Color */}
                    <div className="flex flex-col items-center gap-1 text-center">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: car.color?.toLowerCase() || "transparent" }}
                      />
                      <span className="text-xs font-medium text-gray-700">{car.color}</span>
                    </div>
                  </div>

                  {/* RENT NOW */}
                  <div className="mt-auto pt-4">
                    <button
                      onClick={() => navigate(`/cars/${car.id}`)}
                      className="w-full py-2.5 bg-[#F97316] text-white text-sm font-bold rounded-xl hover:bg-orange-600 transition-all shadow-md shadow-orange-100 active:scale-95 cursor-pointer"
                    >
                      Rent Now
                    </button>
                  </div>
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