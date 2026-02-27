import { useSelector, useDispatch } from "react-redux";
import { fetchReservations, updateReservation } from "../../redux/Slices/reservationSlice";
import { FiCheck, FiClock, FiSearch, FiAlertCircle, FiX, FiCalendar, FiUser, FiPhone, FiMail, FiDollarSign } from "react-icons/fi";
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
      (reservation.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       reservation.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       reservation.carName?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Error State
  if (error) {
    return (
      <div className="p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl p-8 text-center shadow-xl">
            <FiAlertCircle size={48} className="text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-red-900 mb-2">Loading Error</h3>
            <p className="text-red-700 mb-6">{error}</p>
            <button
              onClick={() => dispatch(fetchReservations())}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all cursor-pointer shadow-lg"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 pt-16 sm:pt-20 lg:pt-8 ">
      {/* Header Section */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-1 sm:mb-2">
              Reservation Management
            </h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">
              Manage and monitor all vehicle reservations
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm sm:shadow-md md:shadow-lg lg:shadow-xl border border-gray-100 p-3 sm:p-4 md:p-6 lg:p-6 mb-4 sm:mb-6 md:mb-8">
        <div className="relative group w-full max-w-full">
          <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 md:pl-4 lg:pl-4 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400 group-focus-within:text-orange-500 transition-colors" size={14} />
          </div>
          <input
            type="text"
            placeholder="Search by client, email, or car..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-7 sm:pl-9 md:pl-11 lg:pl-11 pr-2 sm:pr-3 md:pr-4 py-1.5 sm:py-2 md:py-2.5 lg:py-3 bg-gray-50 border border-gray-200 rounded-md sm:rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && reservations.length === 0 ? (
        <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm sm:shadow-md md:shadow-lg lg:shadow-xl border border-gray-100 p-6 sm:p-8 md:p-12 lg:p-16 text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-3 sm:mb-4 md:mb-6 animate-spin"></div>
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-2">Loading Reservations</h3>
          <p className="text-gray-600 text-xs sm:text-sm">Please wait while we fetch your data...</p>
        </div>
      ) : reservations.length === 0 ? (
        <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm sm:shadow-md md:shadow-lg lg:shadow-xl border border-gray-100 p-6 sm:p-8 md:p-12 lg:p-16 text-center">
          <FiClock size={24} className="text-gray-400 mx-auto mb-3 sm:mb-4 md:mb-6" />
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2">No Reservations Yet</h3>
          <p className="text-gray-600 text-xs sm:text-sm">When customers make reservations, they will appear here.</p>
        </div>
      ) : (
        <>
          {/* Table View - Desktop */}
          <div className="hidden lg:block bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm sm:shadow-md md:shadow-lg lg:shadow-xl border border-gray-100 overflow-hidden mb-6 sm:mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Customer</th>
                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Contact</th>
                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Vehicle</th>
                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Period</th>
                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Duration</th>
                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredReservations.map((reservation) => (
                    <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                            <FiUser className="text-white" size={10} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{reservation.customerName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs sm:text-sm">
                            <FiMail className="text-gray-400 flex-shrink-0" size={8} />
                            <span className="text-gray-600 truncate">{reservation.customerEmail}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs sm:text-sm">
                            <FiPhone className="text-gray-400 flex-shrink-0" size={8} />
                            <span className="text-gray-600">{reservation.customerPhone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
                        <div className="flex items-center gap-1">
                          <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">{reservation.carName}</span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
                        <div className="text-xs sm:text-sm text-gray-600">
                          <div className="truncate">{reservation.startDate}</div>
                          <div className="text-gray-400 truncate hidden sm:block">to {reservation.endDate}</div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
                        <span className="text-xs sm:text-sm font-medium text-gray-900">{reservation.duration} days</span>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
                        <span className="text-xs sm:text-sm font-bold text-orange-600">{reservation.totalPrice} DH</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            {filteredReservations.map((reservation) => (
              <div key={reservation.id} className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-3 sm:p-4 md:p-6">
                  {/* Header */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <FiUser className="text-white" size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 truncate">{reservation.customerName}</h3>
                      <p className="text-xs sm:text-sm text-gray-500">ID: {reservation.id}</p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                    {/* Vehicle */}
                    <div className="flex items-start gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Vehicle</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{reservation.carName}</p>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-start gap-2">
                      <FiCalendar className="text-gray-400 mt-0.5 flex-shrink-0" size={12} />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Duration</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900">{reservation.duration} days</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-2">
                      <FiMail className="text-gray-400 mt-0.5 flex-shrink-0" size={12} />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{reservation.customerEmail}</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-2">
                      <FiPhone className="text-gray-400 mt-0.5 flex-shrink-0" size={12} />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-xs sm:text-sm text-gray-600">{reservation.customerPhone}</p>
                      </div>
                    </div>

                    {/* Period */}
                    <div className="flex items-start gap-2 sm:col-span-2">
                      <FiCalendar className="text-gray-400 mt-0.5 flex-shrink-0" size={12} />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Period</p>
                        <p className="text-xs sm:text-sm text-gray-600">{reservation.startDate} - {reservation.endDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-gray-600">Total Price</span>
                      <span className="text-sm sm:text-base md:text-lg font-bold text-orange-600">{reservation.totalPrice} DH</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
