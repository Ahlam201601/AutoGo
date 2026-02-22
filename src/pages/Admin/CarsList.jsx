import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCars, deleteCar } from "../../redux/Slices/carsSlice";
import CarCard from "../../Components/CarCard";
import { FiTrash, FiSearch, FiX } from "react-icons/fi";

export default function CarsList() {
  const dispatch = useDispatch();
  const { cars, status, error } = useSelector((state) => state.cars);

  // SEARCH STATE
  const [search, setSearch] = useState("");

  // DELETE STATES
  const [showDelete, setShowDelete] = useState(false);
  const [deleteCarId, setDeleteCarId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // GET ALL CARS
  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  // DELETE CAR
  const handleDelete = async () => {
    try {
      setLoadingDelete(true);
      await dispatch(deleteCar(deleteCarId)).unwrap();
      setShowDelete(false);
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setLoadingDelete(false);
    }
  };

  // FILTER LOGIC - SEARCH ONLY
  const filteredCars = cars.filter((car) => {
    return (
      search === "" ||
      car.brand?.toLowerCase().includes(search.toLowerCase()) ||
      car.model?.toLowerCase().includes(search.toLowerCase())
    );
  });

  // LOADING
  if (status === "loading") {
    return (
      <div className="flex justify-center items-centermin-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // ERROR
  if (status === "failed") {
    return (
      <div className="text-center py-10">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-md mx-auto">
          <p className="font-medium">Error loading cars</p>
          <p className="text-sm mt-1">{error}</p>
          <button
            onClick={() => dispatch(getCars())}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SEARCH SECTION */}
      <div className="mb-8">
        {/* SEARCH BAR */}
        <div className="relative mb-6">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by brand, or model..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <FiX size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* EMPTY RESULT */}
      {filteredCars.length === 0 && (
        <div className="text-center py-16 px-4">
          <div className="max-w-md mx-auto">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No vehicles found</h3>
            <p className="text-gray-500 mb-6">
              {search 
                ? "No vehicles match your search. Try different keywords."
                : "No vehicles are available at the moment."}
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium cursor-pointer"
              >
                Clear search
              </button>
            )}
          </div>
        </div>
      )}

      {/* CARS GRID */}
      {filteredCars.length > 0 && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isAdmin={true}
              onDeleteClick={() => {
                setDeleteCarId(car.id);
                setShowDelete(true);
              }}
            />
          ))}
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-3 animate-fadeIn">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl text-center flex flex-col gap-5 animate-slideUp">
            <div className="bg-red-100 text-red-500 w-16 h-16 mx-auto flex items-center justify-center rounded-full">
              <FiTrash size={28} />
            </div>

            <h3 className="text-xl font-bold">Delete vehicle?</h3>

            <p className="text-gray-600">
              Are you sure you want to delete this vehicle? This action
              is irreversible and all data will be lost.
            </p>

            <div className="flex gap-4 mt-3">
              <button
                onClick={() => setShowDelete(false)}
                className="flex-1 border-2 border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition-colors font-medium cursor-pointer"
                disabled={loadingDelete}
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className={`flex-1 rounded-lg py-3 text-white font-medium transition-colors cursor-pointer ${
                  loadingDelete
                    ? "bg-red-300 !cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
                disabled={loadingDelete}
              >
                {loadingDelete ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}