import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDraftReservation, createReservation } from "../redux/Slices/reservationSlice";
import { notifyN8n } from "../redux/Slices/carsSlice";
import Navbar from "../Components/Navbar";
import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import { useState } from "react";

export default function RecapPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reservation } = location.state || {};
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!reservation) return <p className="text-center mt-20">No reservation found.</p>;

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      await dispatch(createReservation({
        ...reservation,
        status: "pending",
      })).unwrap();

      // Send to n8n webhook via Redux
      dispatch(notifyN8n(reservation));
      
      setIsConfirmed(true);
      toast.success("Reservation confirmed successfully!", {
        duration: 3000,
        icon: "✅",
      });
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
      <div className="min-h-screen bg-gray-50 pt-24 px-4 md:px-8 pb-12 flex items-center justify-center">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* CAR CARD */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-5 md:p-6 flex flex-col items-center text-center lg:items-start lg:text-left transition-all duration-300">
            <img
              src={reservation.carImage} 
              alt={reservation.carName}
              className="w-full h-64 object-cover rounded-2xl mb-8"
            />
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A202C] mb-2">{reservation.carName}</h2>
            <p className="text-gray-400 text-sm mb-6">{reservation.year} • {reservation.color || "Automatic"}</p>
            <div className="mt-auto w-full pt-6 border-t border-gray-100">
              <span className="text-3xl md:text-4xl font-bold text-orange-500">{reservation.totalPrice} DH</span>
              <span className="text-gray-500 text-lg ml-1 font-medium">/ day</span>
            </div>
          </div>

          {/* RECAP / CONFIRMATION CARD */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 flex flex-col justify-center min-h-[500px] transition-all duration-500 overflow-hidden">
            {!isConfirmed ? (
              <>
                <div className="flex-1">
                  <button
                    onClick={() => {
                      dispatch(setDraftReservation({
                        customerName: reservation.customerName,
                        customerEmail: reservation.customerEmail,
                        customerPhone: reservation.customerPhone,
                        startDate: reservation.startDate,
                        endDate: reservation.endDate,
                      }));
                      navigate(`/reservation/${reservation.carId}`);
                    }}
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-500 text-sm font-medium mb-6 bg-transparent border-none cursor-pointer group transition-colors"
                  >
                    <FiArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Edit details</span>
                  </button>

                  <h2 className="text-3xl font-bold text-[#1A202C] mb-8">Summary</h2>

                  <div className="space-y-4">

                    <div className="flex flex-col gap-1">
                      <label htmlFor="name" className="text-sm font-medium text-gray-500">Name</label>
                      <input id="name" type="text" readOnly value={reservation.customerName || ""} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="email" className="text-sm font-medium text-gray-500">Email</label>
                      <input id="email" type="text" readOnly value={reservation.customerEmail || ""} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="phone" className="text-sm font-medium text-gray-500">Phone</label>
                      <input id="phone" type="text" readOnly value={reservation.customerPhone || ""} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="period" className="text-sm font-medium text-gray-500">Period</label>
                      <input id="period" type="text" readOnly value={`${reservation.startDate} - ${reservation.endDate}`} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="duration" className="text-sm font-medium text-gray-500">Duration</label>
                      <input id="duration" type="text" readOnly value={`${reservation.duration} day(s)`} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none" />
                    </div>

                    <div className="flex justify-between items-center bg-orange-50/50 rounded-2xl p-4 mt-2">
                      <span className="text-gray-700 font-bold">Total Price</span>
                      <span className="text-orange-500 font-extrabold text-2xl">{reservation.totalPrice} DH</span>
                    </div>

                  </div>
                </div>

                <button 
                  onClick={handleConfirm}
                  disabled={isConfirming}
                  className={`mt-10 w-full py-4 font-bold text-lg rounded-2xl transition-all shadow-lg shadow-orange-100 cursor-pointer active:scale-[0.98] ${
                    isConfirming 
                      ? "bg-orange-300 !cursor-not-allowed text-white"
                      : "bg-orange-500 text-white hover:bg-orange-600 hover:shadow-orange-200"
                  }`}
                >
                  {isConfirming ? "Confirming..." : "Confirm Reservation"}
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                {/* SUCCESS ICON */}
                <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-10 relative">
                  <div className="absolute inset-0 bg-orange-100 rounded-full animate-ping opacity-20 scale-125"></div>
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                <h2 className="text-3xl font-extrabold text-[#1A202C] mb-4">Reservation confirmed!</h2>
                <p className="text-gray-500 text-lg max-w-sm mb-10 leading-relaxed">
                  A confirmation email has been sent to <br />
                  <span className="text-[#1A202C] font-semibold underline decoration-orange-200 decoration-2">{reservation.customerEmail}</span>
                </p>

                <div className="w-full space-y-4">
                  <button
                    onClick={() => navigate("/cars")}
                    className="w-full py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-100 active:scale-[0.98] cursor-pointer"
                  >
                    Browse Cars
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="w-full py-4 bg-white border-2 border-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 hover:border-gray-200 transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Back to home
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
