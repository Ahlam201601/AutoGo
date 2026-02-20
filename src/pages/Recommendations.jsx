import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAIRecommendations, getCars } from "../redux/Slices/carsSlice";
import CarCard from "../Components/CarCard";
import Navbar from "../Components/Navbar";
import { FiCpu, FiTarget, FiDollarSign, FiUsers, FiDroplet, FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Recommendations() {
  const dispatch = useDispatch();
  const { cars, recommendations, recStatus, error } = useSelector((state) => state.cars);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getCars());
    }
  }, [dispatch, cars.length]);

  const [preferences, setPreferences] = useState({
    budget: "Economy",
    purpose: "Daily Commute",
    seats: "5",
    fuel: "Petrol",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAIRecommendations(preferences));
  };

  const formOptions = {
    budget: ["Economy", "Family", "Premium", "Luxury"],
    purpose: ["Daily Commute", "Family Trip", "Business", "Adventure"],
    seats: ["2", "4", "5", "7+"],
    fuel: ["Petrol", "Diesel", "Electric", "Hybrid"],
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-6 shadow-sm"
            >
              <FiCpu className="text-orange-500 text-3xl" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              AI Smart <span className="text-orange-500">Assistant</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Tell us what you're looking for, and our AI will analyze our entire fleet to find the perfect match for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-28"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                  <FiTarget className="text-orange-500" />
                  Preferences
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Budget */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <FiDollarSign className="text-orange-500" /> Budget Level
                    </label>
                    <select
                      value={preferences.budget}
                      onChange={(e) => setPreferences({ ...preferences, budget: e.target.value })}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-orange-500 focus:bg-white transition-all outline-none font-medium text-gray-800"
                    >
                      {formOptions.budget.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>

                  {/* Purpose */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <FiCheckCircle className="text-orange-500" /> Primary Purpose
                    </label>
                    <select
                      value={preferences.purpose}
                      onChange={(e) => setPreferences({ ...preferences, purpose: e.target.value })}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-orange-500 focus:bg-white transition-all outline-none font-medium text-gray-800"
                    >
                      {formOptions.purpose.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>

                  {/* Seats */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <FiUsers className="text-orange-500" /> Passengers
                    </label>
                    <select
                      value={preferences.seats}
                      onChange={(e) => setPreferences({ ...preferences, seats: e.target.value })}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-orange-500 focus:bg-white transition-all outline-none font-medium text-gray-800"
                    >
                      {formOptions.seats.map(opt => <option key={opt} value={opt}>{opt} Seats</option>)}
                    </select>
                  </div>

                  {/* Fuel */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <FiDroplet className="text-orange-500" /> Fuel Preference
                    </label>
                    <select
                      value={preferences.fuel}
                      onChange={(e) => setPreferences({ ...preferences, fuel: e.target.value })}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-orange-500 focus:bg-white transition-all outline-none font-medium text-gray-800"
                    >
                      {formOptions.fuel.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={recStatus === "loading"}
                    className="w-full py-5 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl font-bold text-lg hover:from-orange-600 hover:to-orange-500 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-8"
                  >
                    {recStatus === "loading" ? (
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <FiCpu />
                        Get AI Advice
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {recStatus === "idle" && !error && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-3xl border-2 border-dashed border-gray-200"
                  >
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                      <FiCpu className="text-gray-300 text-4xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-400">Waiting for your input</h3>
                    <p className="text-gray-400 mt-2">Adjust the settings and click the button to see AI recommendations.</p>
                  </motion.div>
                )}

                {recStatus === "loading" && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center p-12"
                  >
                    <div className="relative">
                      <div className="w-24 h-24 border-4 border-orange-100 border-t-orange-500 rounded-full animate-spin"></div>
                      <FiCpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-500 text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mt-8">Analyzing fleet...</h3>
                    <p className="text-gray-500 mt-2">Connecting to Gemini AI to find your best matches.</p>
                  </motion.div>
                )}

                {recStatus === "failed" && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center p-12 bg-red-50 rounded-3xl border border-red-100"
                  >
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                      <FiCheckCircle className="text-red-500 text-4xl transform rotate-45" />
                    </div>
                    <h3 className="text-2xl font-bold text-red-800">Something went wrong</h3>
                    <p className="text-red-600 mt-2">{error || "AI service is temporarily unavailable."}</p>
                    <button 
                      onClick={handleSubmit}
                      className="mt-6 px-8 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all"
                    >
                      Try Again
                    </button>
                  </motion.div>
                )}

                {recStatus === "succeeded" && recommendations.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
                      <span className="px-4 py-1.5 bg-green-100 text-green-700 text-sm font-bold rounded-full flex items-center gap-2">
                        <FiCheckCircle />
                        AI Verified Matches
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {recommendations.map((car, index) => (
                        <motion.div
                          key={car.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <CarCard car={car} isAdmin={false} />
                        </motion.div>
                      ))}
                    </div>

                    
                  </motion.div>
                )}

                {recStatus === "succeeded" && recommendations.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-3xl border border-gray-100 shadow-lg"
                  >
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">No matches found</h3>
                    <p className="text-gray-500 mt-2 max-w-sm">We couldn't find cars matching all your specific criteria. Please try broadening your preferences.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
