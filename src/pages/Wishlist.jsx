import { 
  FiHeart, 
  FiArrowLeft 
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { clearWishlist } from "../redux/Slices/wishlistSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import CarCard from "../Components/CarCard";

export default function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { total } = useSelector(state => state.wishlist);

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
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/cars")}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition cursor-pointer"
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
                className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-50 rounded-lg font-medium transition cursor-pointer"
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
              <CarCard key={car.id} car={car} isAdmin={false} isWishlist={true} />
            ))}
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
