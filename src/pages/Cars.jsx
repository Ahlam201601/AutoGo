import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "../redux/Slices/carsSlice";
import CarCard from "../Components/CarCard";
import { FaFilter, FaSearch, FaCar } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function Cars() {
  const dispatch = useDispatch();

  // 🔥 Redux state
  const { cars, status } = useSelector((state) => state.cars);

  // 🔥 Local state (filters)
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTransmission, setSelectedTransmission] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const categories = ["All", "SUV", "Sedan", "Sport", "Hatchback"];
  const transmissions = ["All", "Automatic", "Manual"];

  // FILTER LOGIC
  const filteredCars = cars.filter((car) => {
    const matchCategory =
      selectedCategory === "All" || car.category === selectedCategory;

    const matchTransmission =
      selectedTransmission === "All" ||
      car.transmission === selectedTransmission;

    const matchSearch =
      car.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchTransmission && matchSearch;
  });

  return (
    <>
      <Navbar />

      {/* Main Content with white background */}
      <div className="min-h-screen bg-white pt-16">
        {/* Same container as the Navbar */}
        <div className="container mx-auto px-4 md:px-8 py-8">
          
          {/* Flex container for sidebar and content */}
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Filters sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/4"
            >
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FaFilter className="text-orange-500" />
                  Filters
                </h2>

                {/* SEARCH */}
                <div className="mb-6">
                  <h3 className="flex items-center gap-2 text-gray-900 font-semibold mb-3">
                    <FaSearch className="text-orange-500" />
                    Search by Name
                  </h3>
                  <input
                    type="text"
                    placeholder="Search cars..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white text-gray-900 border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-colors"
                  />
                </div>

                {/* CATEGORY */}
                <div className="mb-6">
                  <h3 className="flex items-center gap-2 text-gray-900 font-semibold mb-3">
                    <FaCar className="text-orange-500" />
                    Category
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          selectedCategory === cat
                            ? "bg-orange-500 text-white hover:bg-orange-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* TRANSMISSION */}
                <div className="mb-6">
                  <h3 className="flex items-center gap-2 text-gray-900 font-semibold mb-3">
                    <FaFilter className="text-orange-500" />
                    Transmission
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {transmissions.map((tr) => (
                      <button
                        key={tr}
                        onClick={() => setSelectedTransmission(tr)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          selectedTransmission === tr
                            ? "bg-orange-500 text-white hover:bg-orange-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {tr}
                      </button>
                    ))}
                  </div>
                </div>

                {/* COUNT */}
                <div className="mt-6 pt-6 border-t border-gray-300">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      {filteredCars.length} cars found
                    </span>
                    {(searchQuery || selectedCategory !== "All" || selectedTransmission !== "All") && (
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("All");
                          setSelectedTransmission("All");
                        }}
                        className="text-sm px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main content - Cars grid */}
            <div className="lg:w-3/4">
              {/* LOADING */}
              {status === "loading" && (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
              )}

              {/* CARS GRID */}
              {status === "succeeded" && filteredCars.length > 0 && (
                <>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-900">
                      Available Cars ({filteredCars.length})
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Browse our premium collection of vehicles
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {filteredCars.map((car) => (
                      <motion.div
                        key={car.id}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          show: { opacity: 1, y: 0 }
                        }}
                      >
                        <CarCard car={car} isAdmin={false} />
                      </motion.div>
                    ))}
                  </motion.div>
                </>
              )}

              {/* EMPTY */}
              {status === "succeeded" && filteredCars.length === 0 && (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No cars found</h3>
                    <p className="text-gray-600 mb-6">
                      {searchQuery || selectedCategory !== "All" || selectedTransmission !== "All"
                        ? "Try changing your search criteria or reset filters."
                        : "No cars are available at the moment."}
                    </p>
                    {(searchQuery || selectedCategory !== "All" || selectedTransmission !== "All") && (
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("All");
                          setSelectedTransmission("All");
                        }}
                        className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium cursor-pointer"
                      >
                        Reset all filters
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}