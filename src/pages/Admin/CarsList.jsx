import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCars, deleteCar } from "../../redux/Slices/carsSlice";
import CarCard from "../../components/CarCard";
import { FiTrash, FiXCircle } from "react-icons/fi";

export default function CarsList() {
  const [showDelete, setShowDelete] = useState(false);
  const [deleteCarId, setDeleteCarId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false); // loading delete
  const dispatch = useDispatch();

  const { cars, status, error } = useSelector((state) => state.cars);

  // GET ALL CARS
  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  // DELETE CAR
  const handleDelete = async (id) => {
    try {
      setLoadingDelete(true);
      await dispatch(deleteCar(id)).unwrap();
      console.log("Car deleted successfully ✅");
      setShowDelete(false);
    } catch (err) {
      console.log("Delete error:", err);
    } finally {
      setLoadingDelete(false);
    }
  };

  // LOADING STATE
  if (status === "loading") {
    return <p className="text-center text-gray-400 mt-10">Loading cars...</p>;
  }

  if (status === "failed") {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!cars || cars.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-10">No cars available 🚗</p>
    );
  }

  return (
    <>
      {/* CARS GRID */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cars.map((car) => (
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

      {/* DELETE CONFIRMATION MODAL */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-3 animate-fadeIn">
          <div className="bg-white w-full max-w-md sm:max-w-lg p-6 rounded-2xl shadow-2xl text-center flex flex-col items-center gap-5 transform transition-transform duration-300 scale-95 animate-slideUp">
            {/* Icon */}
            <div className="bg-red-100 text-red-500 w-16 h-16 flex items-center justify-center rounded-full text-4xl">
              <FiTrash size={32} />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900">Delete Car?</h3>

            {/* Text */}
            <p className="text-gray-700 text-sm sm:text-base">
              Are you sure you want to delete this car? This action cannot be
              undone.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-3 w-full">
              <button
                onClick={() => setShowDelete(false)}
                className="flex-1 px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                disabled={loadingDelete}
              >
                Cancel
              </button>

              <button
                onClick={() => handleDelete(deleteCarId)}
                className={`flex-1 px-5 py-2 rounded-lg text-white font-semibold transition ${
                  loadingDelete
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
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
