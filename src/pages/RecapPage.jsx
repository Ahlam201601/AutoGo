import { useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FiArrowLeft } from "react-icons/fi";

export default function RecapPage() {
  const location = useLocation();
  const { reservation } = location.state || {};

  if (!reservation) return <p className="text-center mt-20">No reservation found.</p>;

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
              {reservation.carYear || "2024"} • {reservation.carColor || "Blanc Alpin"}
            </p>
            <div className="pt-4 border-t border-gray-100">
              <span className="text-2xl md:text-3xl font-bold text-orange-500">{reservation.totalPrice} €</span>
              <span className="text-gray-500 text-sm ml-1">/jour</span>
            </div>
          </div>

          {/* RECAP CARD */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <Link
                to={`/reservation/${reservation.carId}`}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 text-sm font-medium mb-4"
              >
                <FiArrowLeft size={18} /> Modifier
              </Link>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Récapitulatif</h2>

              <div className="space-y-4">
                {/* Nom */}
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Nom</span>
                  <span className="text-gray-900 font-medium">{reservation.customerName}</span>
                </div>

                {/* Email */}
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Email</span>
                  <span className="text-gray-900 font-medium">{reservation.customerEmail}</span>
                </div>

                {/* Téléphone */}
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Téléphone</span>
                  <span className="text-gray-900 font-medium">{reservation.customerPhone}</span>
                </div>

                {/* Dates */}
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Période</span>
                  <span className="text-gray-900 font-medium">{reservation.startDate} – {reservation.endDate}</span>
                </div>

                {/* Durée */}
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Durée</span>
                  <span className="text-gray-900 font-medium">{reservation.duration} jour(s)</span>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center bg-orange-50 rounded-lg p-3 mt-4">
                  <span className="text-gray-700 font-semibold">Total à payer</span>
                  <span className="text-orange-500 font-bold text-lg">{reservation.totalPrice} €</span>
                </div>
              </div>
            </div>

            {/* Bouton */}
            <button className="mt-6 w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all shadow-md">
              Confirmer la réservation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
