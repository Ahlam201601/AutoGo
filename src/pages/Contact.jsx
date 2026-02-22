import { useState } from "react";
import { FiUser, FiMail, FiMessageSquare, FiSend, FiMapPin, FiPhone, FiClock } from "react-icons/fi";
import toast from "react-hot-toast";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const VITE_N8N_CONTACT_URL = import.meta.env.VITE_N8N_CONTACT_URL;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email format";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await axios.post(VITE_N8N_CONTACT_URL, form);
      toast.success("Message sent successfully ✅");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f3f5f9] pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full mb-6 shadow-lg">
              <FiSend className="text-white text-2xl" />
            </div>
            <h1 className="text-5xl font-bold text-gray-800 mb-3">
              Get In <span className="text-orange-400">Touch</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Have a question or want to work together? Send us a message and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                      <FiMapPin className="text-orange-400 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Our Address</h3>
                      <p className="text-gray-600 mt-1">123 Street Name, Nouaceur, Moroco</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                      <FiPhone className="text-orange-400 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Phone Number</h3>
                      <p className="text-gray-600 mt-1">06 456-78906</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                      <FiClock className="text-orange-400 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Working Hours</h3>
                      <p className="text-gray-600 mt-1">Mon - Fri: 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                      <div key={social} className="w-10 h-10 bg-gray-100 hover:bg-orange-50 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                        <span className="text-gray-600 hover:text-orange-400 font-medium text-sm">
                          {social.charAt(0)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={submit}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* NAME */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-3">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={`w-full bg-gray-50 text-gray-800 border-2 rounded-xl pl-12 pr-4 py-4 focus:outline-none transition-all ${
                          errors.name
                            ? "border-red-500"
                            : "border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-3">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={`w-full bg-gray-50 text-gray-800 border-2 rounded-xl pl-12 pr-4 py-4 focus:outline-none transition-all ${
                          errors.email
                            ? "border-red-500"
                            : "border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* MESSAGE */}
                <div className="mb-8">
                  <label className="block text-gray-700 font-medium mb-3">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiMessageSquare className="absolute left-4 top-4 text-gray-500" />
                    <textarea
                      rows="6"
                      value={form.message}
                      placeholder="Tell us about your project or inquiry..."
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className={`w-full bg-gray-50 text-gray-800 border-2 rounded-xl pl-12 pr-4 py-4 resize-none focus:outline-none transition-all ${
                        errors.message
                          ? "border-red-500"
                          : "border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      }`}
                    />
                  </div>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-2">{errors.message}</p>
                  )}
                </div>

                {/* SUBMIT BUTTON */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <p>Fields marked with <span className="text-red-500">*</span> are required</p>
                  </div>
                  <button
                    disabled={loading}
                    className="px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-xl font-semibold flex items-center gap-3 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 cursor-pointer"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FiSend />
                    )}
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>

              
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}