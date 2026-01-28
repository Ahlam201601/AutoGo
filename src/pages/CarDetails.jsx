import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getCars } from "../redux/Slices/carsSlice";
import { FiArrowLeft, FiUsers, FiSettings, FiDroplet, FiCalendar, FiMapPin, FiWind, FiSun, FiNavigation, FiHeart, FiMessageSquare } from "react-icons/fi";

export default function CarDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { cars, status } = useSelector((state) => state.cars);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getCars());
    }
  }, [dispatch, status]);

  const car = cars.find((c) => c.id === id);

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  if (status === "loading") {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen bg-white pt-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </>
    );
  }

  if (!car) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-white pt-16">
          <div className="text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Vehicle Not Found</h2>
            <p className="text-gray-600 mb-6">The vehicle you're looking for doesn't exist.</p>
            <Link to="/cars" className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
              Back to Cars
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Features avec toutes les icônes en orange
  const features = [
    { icon: FiMapPin, text: "GPS" },
    { icon: FiWind, text: "Air Conditioning" },
    { icon: FiSun, text: "Sunroof" },
    { icon: FiNavigation, text: "Adaptive Cruise" },
  ];

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-white pt-16">
        <div className="container mx-auto px-4 md:px-8 py-8">
          
          {/* Header avec retour seulement */}
          <div className="mb-8">
            <Link 
              to="/cars" 
              className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
              <FiArrowLeft size={20} />
              <span>Back</span>
            </Link>
          </div>

          {/* Grid principale */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Colonne gauche - Image */}
            <div className="relative">
              {/* Category badge dans l'image */}
              <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">
                  {car.category || "Luxe"}
                </span>
              </div>

              {/* Wishlist button */}
              <button
                onClick={toggleWishlist}
                className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <FiHeart 
                  size={24} 
                  className={isWishlisted ? "text-red-500 fill-red-500" : "text-gray-600"} 
                />
              </button>

              {/* Image principale */}
              <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={car.image || "/car-placeholder.jpg"}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-100 object-cover"
                />
              </div>
            </div>

            {/* Colonne droite - Détails */}
            <div className="space-y-6">
              {/* Titre et infos basiques */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {car.brand} {car.model}
                </h1>
                <p className="text-gray-500 text-lg">
                  {car.year} • {car.color || "Blanc Alpin"}
                </p>
              </div>

              {/* Prix */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {car.pricePerDay || car.price} DH
                  </span>
                  <span className="text-gray-500">/ day</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Comprehensive insurance included
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {car.description || "The pure pleasure of driving."}
              </p>

              {/* Caractéristiques principales */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <FiUsers className="text-gray-500" size={24} />
                  </div>
                  <p className="text-sm text-gray-500">Seats</p>
                  <p className="font-semibold text-gray-900">{car.seats || 5}</p>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <FiSettings className="text-gray-500" size={24} />
                  </div>
                  <p className="text-sm text-gray-500">Transmission</p>
                  <p className="font-semibold text-gray-900">{car.transmission}</p>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <FiDroplet className="text-gray-500" size={24} />
                  </div>
                  <p className="text-sm text-gray-500">Fuel</p>
                  <p className="font-semibold text-gray-900">{car.fuel}</p>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <FiCalendar className="text-gray-500" size={24} />
                  </div>
                  <p className="text-sm text-gray-500">Year</p>
                  <p className="font-semibold text-gray-900">{car.year}</p>
                </div>
              </div>

              {/* Équipements */}
              <div className="pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                <div className="flex flex-wrap gap-4">
                  {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={index} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                        <IconComponent className="text-orange-500" size={18} />
                        <span className="text-gray-700 text-sm">{feature.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Boutons d'action améliorés */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <button
                  onClick={()=>navigate(`/reservation/${car.id}`)}
                  className="flex-1 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] text-lg flex items-center justify-center gap-2"
                >
                  <span>Book This Vehicle</span>
                </button>
                
                <button
                  onClick={()=>navigate("/contact")}
                  className="flex-1 py-4 border-2 border-orange-500 text-orange-500 bg-white font-bold rounded-xl hover:bg-orange-50 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] text-lg flex items-center justify-center gap-2"
                >
                  <FiMessageSquare size={20} />
                  <span>Contact Us</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}