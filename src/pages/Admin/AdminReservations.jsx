import { useSelector, useDispatch } from "react-redux";
import { fetchReservations, updateReservation } from "../../redux/Slices/reservationSlice";
import { FiCheck, FiClock, FiSearch, FiAlertCircle, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

export default function AdminReservations() {
  const dispatch = useDispatch();
  const { reservations, loading, error } = useSelector((state) => state.reservation);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch reservations on mount
  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const filteredReservations = reservations.filter(
    (reservation) =>
      (reservation.customerName).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (reservation.customerEmail).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (reservation.carName).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Error State
  if (error) {
    return (
      <div className="p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <FiAlertCircle size={48} className="text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-red-900 mb-2">Loading Error</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchReservations())}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 pt-20 lg:pt-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Reservation Management</h1>
        <p className="text-sm md:text-base text-gray-600">
          {reservations.length} reservation{reservations.length !== 1 ? "s" : ""} in total
        </p>
      </div>

      {/* Styled Search Bar */}
      <div className="mb-6 md:mb-8">
        <div className="relative group max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search for a client or a car..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl md:rounded-2xl leading-5 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 text-sm transition-all shadow-sm hover:shadow-md"
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && reservations.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reservations...</p>
        </div>
      ) : reservations.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <FiClock size={40} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No reservations</h3>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {filteredReservations.map((reservation) => (
              <div key={reservation.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="mb-4">
                  <h3 className="font-bold text-gray-900">{reservation.customerName}</h3>
                  <p className="text-xs text-gray-500">{reservation.customerEmail}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Car:</span>
                    <span className="font-medium text-gray-900">{reservation.carName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Period:</span>
                    <span className="text-gray-900">{reservation.startDate} – {reservation.endDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total:</span>
                    <span className="font-bold text-orange-600">{reservation.totalPrice} DH</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Brand</th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Period</th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Duration</th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredReservations.map((reservation) => (
                    <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{reservation.customerName}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{reservation.customerEmail}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{reservation.customerPhone}</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{reservation.carName}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{reservation.startDate} – {reservation.endDate}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{reservation.duration} d</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-900">{reservation.totalPrice} DH</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats Footer */}
          <div className="bg-white md:bg-gray-50 px-4 py-6 md:py-4 border shadow-sm md:shadow-none border-gray-100 md:border-t md:border-gray-200 mt-4 rounded-xl md:rounded-none">
            <div className="flex flex-wrap gap-4 md:gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Total Results: </span>
                <span className="font-semibold text-gray-900">{filteredReservations.length}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
