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



  const handleStatusUpdate = async (reservation, newStatus) => {
    try {
      await dispatch(updateReservation({
        id: reservation.id,
        updates: { ...reservation, status: newStatus }
      })).unwrap();
      const statusLabel = newStatus === "confirmé" ? "Confirmée" : "Annulée";
      toast.success(`Réservation ${statusLabel}`);
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du statut");
    }
  };



  const filteredReservations = reservations.filter(
    (reservation) =>
      (reservation.customerName).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (reservation.customerEmail).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (reservation.carName).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Status Badge Helper
  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmé":
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Confirmé</span>;
      case "annulé":
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Annulé</span>;
      default:
        return <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">En attente</span>;
    }
  };

  // Error State
  if (error) {
    return (
      <div className="p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <FiAlertCircle size={48} className="text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-red-900 mb-2">Erreur de chargement</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchReservations())}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Réservations</h1>
        <p className="text-gray-600">
          {reservations.length} réservation{reservations.length !== 1 ? "s" : ""} au total
        </p>
      </div>

      {/* Styled Search Bar */}
      <div className="mb-8">
        <div className="relative group max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
          </div>
          <input
            type="text"
            placeholder="Rechercher un client ou une voiture..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl leading-5 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 sm:text-sm transition-all shadow-sm hover:shadow-md"
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && reservations.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des réservations...</p>
        </div>
      ) : reservations.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <FiClock size={40} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune réservation</h3>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Nom</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Téléphone</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Brand</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Période</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Durée</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
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
                    <td className="px-4 py-4 text-sm text-gray-600">{reservation.duration} j</td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-900">{reservation.totalPrice} DH</td>
                    <td className="px-4 py-4 text-sm">{getStatusBadge(reservation.status)}</td>
                    <td className="px-4 py-4 text-sm">
                      <div className="flex gap-2">
                        {/* Show buttons based on status for reversible actions */}
                        {(reservation.status === "en attente" || reservation.status === "annulé") && (
                          <button
                            onClick={() => handleStatusUpdate(reservation, "confirmé")}
                            className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition"
                          >
                            Confirmer
                          </button>
                        )}
                        {(reservation.status === "en attente" || reservation.status === "confirmé") && (
                          <button
                            onClick={() => handleStatusUpdate(reservation, "annulé")}
                            className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition"
                          >
                            Annuler
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stats Footer */}
          <div className="bg-gray-50 px-4 py-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-gray-600">Total: </span>
                <span className="font-semibold text-gray-900">{filteredReservations.length}</span>
              </div>
              <div>
                <span className="text-gray-600">Confirmées: </span>
                <span className="font-semibold text-green-700">
                  {filteredReservations.filter((r) => r.status === "confirmé").length}
                </span>
              </div>
              <div>
                <span className="text-gray-600">En attente: </span>
                <span className="font-semibold text-orange-700">
                  {filteredReservations.filter((r) => r.status === "en attente").length}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Annulées: </span>
                <span className="font-semibold text-red-700">
                  {filteredReservations.filter((r) => r.status === "annulé").length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
