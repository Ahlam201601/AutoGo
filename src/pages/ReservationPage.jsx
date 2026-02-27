import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { getCars } from "../redux/Slices/carsSlice";
import { clearDraftReservation } from "../redux/Slices/reservationSlice";
import { FiArrowLeft, FiUser, FiMail, FiPhone, FiCalendar } from "react-icons/fi";

export default function ReservationPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cars, status } = useSelector((state) => state.cars);
  const { draftReservation } = useSelector((state) => state.reservation);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
  });

  const today = new Date().toISOString().split("T")[0];

  // Load draft data if available
  useEffect(() => {
    if (draftReservation) {
      setForm({
        name: draftReservation.customerName,
        email: draftReservation.customerEmail,
        phone: draftReservation.customerPhone,
        startDate: draftReservation.startDate,
        endDate: draftReservation.endDate,
      });
    }
  }, [draftReservation]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getCars());
    }
  }, [dispatch, status]);

  const car = cars.find((c) => c.id === id);
  if (!car) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateDuration = () => {
    if (!form.startDate || !form.endDate) return 0;
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    if (end <= start) return 0;
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  };

  const duration = calculateDuration();
  const totalPrice = duration * car.pricePerDay;

  const isFormValid =
    form.name &&
    form.email &&
    form.phone &&
    form.startDate &&
    form.endDate &&
    duration;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const reservation = {
      id: Date.now().toString(),
      carId: car.id,
      carImage:car.image,
      carName: `${car.brand} ${car.model}`,
      customerName: form.name,
      customerEmail: form.email,
      customerPhone: form.phone,
      startDate: form.startDate,
      endDate: form.endDate,
      duration,
      totalPrice,
    };

    // Clear draft and navigate to recap (reservation will be created in API when confirmed)
    dispatch(clearDraftReservation());
    navigate("/recap", { state: { reservation } });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 pt-24 px-4 md:px-8 pb-12">
        <div className="max-w-6xl mx-auto mb-6">
          <Link
            to={`/cars/${car.id}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 text-sm font-medium transition-colors cursor-pointer"
          >
            <FiArrowLeft size={18} />
            Back to Car Details
          </Link>
        </div>

        <div className="max-w-6xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Reservation</h1>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-6 h-fit sticky top-24">
              <img src={car.image} alt={car.brand} className="w-full h-48 md:h-56 object-cover rounded-lg mb-6" />
              <div className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">{car.brand} {car.model}</h2>
                <p className="text-gray-500 text-sm md:text-base">{car.year} • {car.color || "Alpine White"}</p>
                <div className="pt-4 border-t border-gray-100">
                  <span className="text-2xl md:text-3xl font-bold text-orange-500">{car.pricePerDay} DH</span>
                  <span className="text-gray-500 text-sm ml-1">/ day</span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
            <div className="space-y-5">
              {/* NAME */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-all"
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-all"
                    required
                  />
                </div>
              </div>

              {/* PHONE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+212 6 12 34 56 78"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-all"
                    required
                  />
                </div>
              </div>

              {/* DATES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Date
                  </label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="date"
                      name="startDate"
                      min={today}
                      value={form.startDate}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    End Date
                  </label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="date"
                      name="endDate"
                      min={form.startDate || today}
                      value={form.endDate}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-all"
                      required
                    />
                  </div>
                </div>
              </div>
              {duration > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold text-gray-900">{duration} day(s)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total</span>
                    <span className="font-bold text-xl text-orange-500">{totalPrice} DH</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-4 font-semibold rounded-lg transition-all mt-8 ${
                  isFormValid
                    ? "bg-orange-500 text-white hover:bg-orange-600 cursor-pointer shadow-md hover:shadow-lg"
                    : "bg-orange-300 text-white cursor-not-allowed"
                }`}
              >
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
