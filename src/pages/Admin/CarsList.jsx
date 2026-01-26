import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "../../redux/Slices/carsSlice";
import CarCard from "../../components/CarCard";

export default function CarsList() {
  const dispatch = useDispatch();

  const { cars, status, error } = useSelector((state) => state.cars);

  // GET ALL CARS
  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  // LOADING
  if (status === "loading") {
    return (
      <p className="text-center text-gray-400 mt-10">
        Loading cars...
      </p>
    );
  }

  // ERROR
  if (status === "failed") {
    return (
      <p className="text-center text-red-500 mt-10">
        {error}
      </p>
    );
  }

  // EMPTY
  if (!cars || cars.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-10">
        No cars available 🚗
      </p>
    );
  }

  // SUCCESS
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          isAdmin={true}
          
        />
      ))}
    </div>
  );
}
