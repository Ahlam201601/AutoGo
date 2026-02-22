import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiMail, FiStar, FiShield, FiGlobe, FiClock, FiUser } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getCars } from '../redux/Slices/carsSlice';
import CarCard from '../Components/CarCard';
import Footer from '../Components/Footer';

export default function Home() {
  const dispatch = useDispatch();
  const { cars, status } = useSelector((state) => state.cars);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getCars());
    }
  }, [dispatch, status]);

  // Featured cars (e.g., first 4 premium cars)
  const featuredCars = cars.slice(0, 4);

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden selection:bg-orange-100">
        
        {/* BACKGROUND LAYER */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/home.jpg" 
            alt="Luxury Background" 
            className="w-full h-full object-cover filter blur-[4px] scale-105 brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* CONTENT LAYER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8">
            Experience <br /> 
            <span className="text-gray-300">Pure Luxury</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl mx-auto mb-12 opacity-90">
            Discover our curated collection of high-performance vehicles, designed for those who demand excellence on every journey.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/cars"
                className="flex items-center gap-3 bg-orange-500 text-white px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all hover:bg-orange-600 shadow-xl shadow-orange-500/30"
              >
                Explore Cars <FiArrowRight size={20} />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all hover:bg-white/20"
              >
                <FiMail size={20} className="text-orange-500" />
                Contact Us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* SIMPLE LUXE SELECTION SECTION */}
      <section className="bg-white py-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              Top <span className="text-orange-500">Selection</span>
            </h2>
            <div className="h-1 w-20 bg-orange-500 mx-auto rounded-full" />
          </div>

          {/* CARS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCars.length > 0 ? (
              featuredCars.map((car) => (
                <CarCard key={car.id} car={car} isAdmin={false} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-400">
                Loading our finest selection...
              </div>
            )}
          </div>

          {/* CTA BUTTON */}
          <div className="mt-16 text-center">
            <Link 
              to="/cars" 
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg active:scale-95"
            >
              View All Cars <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
      {/* EXCLUSIVE SERVICES SECTION */}
      <section className="bg-gray-50 py-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <p className="text-orange-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Elite Benefits</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Exclusive <span className="text-orange-500">Services</span>
            </h2>
          </div>

          {/* SERVICES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Service 1 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center text-center space-y-6"
            >
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
                <FiStar size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest">Premium Fleet</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Access a hand-picked collection of the world's most prestigious and high-performance automobiles.</p>
            </motion.div>

            {/* Service 2 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center text-center space-y-6"
            >
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
                <FiShield size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest">Full Protection</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Drive with total peace of mind with our multi-risk comprehensive insurance included in every rental.</p>
            </motion.div>

            {/* Service 3 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center text-center space-y-6"
            >
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
                <FiClock size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest">24/7 Support</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Our dedicated concierge team is available round the clock to assist you with any request during your trip.</p>
            </motion.div>

            {/* Service 4 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center text-center space-y-6"
            >
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
                <FiGlobe size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest">VIP Delivery</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Experience ultimate convenience with our personalized vehicle delivery and collection at your preferred location.</p>
            </motion.div>

          </div>
        </div>
      </section>
      {/* CUSTOMER EXPERIENCES SECTION */}
      <section className="bg-white py-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <p className="text-orange-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Testimonials</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Customer <span className="text-orange-500">Experiences</span>
            </h2>
            <div className="h-1 w-20 bg-orange-500 mx-auto rounded-full mt-6" />
          </div>

          {/* TESTIMONIALS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Review 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 relative overflow-hidden group"
            >
              <div className="flex gap-1 mb-6 text-orange-500">
                <FiStar className="fill-orange-500" size={14} />
                <FiStar className="fill-orange-500" size={14} />
                <FiStar className="fill-orange-500" size={14} />
                <FiStar className="fill-orange-500" size={14} />
                <FiStar className="fill-orange-500" size={14} />
              </div>
              <p className="text-gray-600 italic leading-relaxed mb-8 relative z-10">
                "The fleet quality is simply unmatched. I rented a Porsche for my weekend trip and the entire process was seamless and incredibly professional."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                  <FiUser size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm uppercase tracking-widest">James Wilson</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">CEO, TechFlow</p>
                </div>
              </div>
            </motion.div>

            {/* Review 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 relative overflow-hidden group"
            >
              <div className="flex gap-1 mb-6 text-orange-500">
                <FiStar className="fill-orange-500" size={14} />
                <FiStar className="fill-orange-500" size={14} />
                <FiStar className="fill-orange-500" size={14} />
                <FiStar className="fill-orange-500" size={14} />
                <FiStar className="fill-orange-500" size={14} />
              </div>
              <p className="text-gray-600 italic leading-relaxed mb-8 relative z-10">
                "VIP delivery to my hotel was punctual and the car was in showroom condition. This is exactly how luxury car rental should be handled."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                  <FiUser size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm uppercase tracking-widest">Sarah Jenkins</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Global Traveler</p>
                </div>
              </div>
            </motion.div>

            {/* Review 3 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 relative overflow-hidden group"
            >
              <div className="flex gap-1 mb-6 text-orange-500">
                <FiStar className="fill-orange-500" size={14} />
                <FiStar className="fill-orange-500" size={14} />
                <FiStar className="fill-orange-500" size={14} />
                <FiStar className="fill-orange-500" size={14} />
                <FiStar className="fill-orange-500" size={14} />
              </div>
              <p className="text-gray-600 italic leading-relaxed mb-8 relative z-10">
                "Outstanding customer service. The team went above and beyond to accommodate my last-minute request. AutoGo is my only choice now."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                  <FiUser size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm uppercase tracking-widest">Michael Chen</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Founder, LuxuryStay</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
