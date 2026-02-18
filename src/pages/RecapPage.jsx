import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDraftReservation, createReservation } from "../redux/Slices/reservationSlice";
import Navbar from "../components/Navbar";
import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import { useState } from "react";

export default function RecapPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reservation } = location.state || {};
  const { loading } = useSelector((state) => state.reservation);
  const [isConfirming, setIsConfirming] = useState(false);

  if (!reservation) return <p className="text-center mt-20">No reservation found.</p>;

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      await dispatch(createReservation({
        ...reservation,
        status: "pending",
      })).unwrap();
      
      toast.success("Reservation confirmed successfully!", {
        duration: 3000,
        icon: "✅",
      });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast.error("Error during confirmation. Please try again.", {
        duration: 4000,
      });
      setIsConfirming(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24 px-4 md:px-8 pb-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* CAR CARD */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-6">
            <img
              src={reservation.carImage} 
              alt={reservation.carName}
              className="w-full h-56 object-cover rounded-lg mb-6"
            />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{reservation.carName}</h2>
            <p className="text-gray-500 text-sm md:text-base">
              {reservation.carYear || "2024"} • {reservation.carColor || "Alpine White"}
            </p>
            <div className="pt-4 border-t border-gray-100">
              <span className="text-2xl md:text-3xl font-bold text-orange-500">{reservation.totalPrice} DH</span>
              <span className="text-gray-500 text-sm ml-1">/ day</span>
            </div>
          </div>

          {/* RECAP CARD */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <button
                onClick={() => {
                  dispatch(setDraftReservation({
                    customerName: reservation.customerName,
                    customerEmail: reservation.customerEmail,
                    customerPhone: reservation.customerPhone,
                    startDate: reservation.startDate,
                    endDate: reservation.endDate,
                  }));
                }}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 text-sm font-medium mb-4 bg-transparent border-none cursor-pointer"
              >
                <FiArrowLeft size={18} />
                <Link to={`/reservation/${reservation.carId}`}>Edit</Link>
              </button>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Summary</h2>

              <div className="space-y-4">
                {/* Name */}
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Name</span>
                  <span className="text-gray-900 font-medium">{reservation.customerName}</span>
                </div>

                {/* Email */}
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Email</span>
                  <span className="text-gray-900 font-medium">{reservation.customerEmail}</span>
                </div>

                {/* Phone */}
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Phone</span>
                  <span className="text-gray-900 font-medium">{reservation.customerPhone}</span>
                </div>

                {/* Dates */}
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Period</span>
                  <span className="text-gray-900 font-medium">{reservation.startDate} - {reservation.endDate}</span>
                </div>

                {/* Duration */}
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Duration</span>
                  <span className="text-gray-900 font-medium">{reservation.duration} day(s)</span>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center bg-orange-50 rounded-lg p-3 mt-4">
                  <span className="text-gray-700 font-semibold">Total Price</span>
                  <span className="text-orange-500 font-bold text-lg">{reservation.totalPrice} DH</span>
                </div>
              </div>
            </div>

            {/* Bouton */}
            <button 
              onClick={handleConfirm}
              disabled={isConfirming}
              className={`mt-6 w-full py-3 font-semibold rounded-lg transition-all shadow-md ${
                isConfirming 
                  ? "bg-orange-300 cursor-not-allowed text-white"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              {isConfirming ? "Confirming..." : "Confirm Reservation"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
