import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCar } from "../../redux/Slices/carsSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;

export default function AddCar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    color: "",
    pricePerDay: "",
    seats: "",
    category: "",
    transmission: "",
    fuel: "",
    equipments: "",
    description: "",
    image: "",
    consumption: "",
  });

  const [errors, setErrors] = useState({});
  const [loadingImg, setLoadingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  // IMAGE UPLOAD
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoadingImg(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "cars_fill");

    try {
      const res = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setForm((prev) => ({ ...prev, image: data.secure_url }));
      console.log("Image uploaded successfully 📸", data.secure_url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingImg(false);
    }
  };

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // VALIDATION
  const validate = () => {
    const temp = {};
    if (!form.brand) temp.brand = "Brand is required";
    if (!form.model) temp.model = "Model is required";
    if (!form.year) temp.year = "Year is required";
    if (!form.color) temp.color = "Color is required";
    if (!form.pricePerDay) temp.pricePerDay = "Price per day is required";
    if (!form.seats) temp.seats = "Seats are required";
    if (!form.category) temp.category = "Category is required";
    if (!form.transmission) temp.transmission = "Transmission is required";
    if (!form.fuel) temp.fuel = "Fuel type is required";
    if (!form.equipments) temp.equipments = "Equipments are required";
    if (!form.description) temp.description = "Description is required";
    if (!form.image) temp.image = "Image is required";
    if (!form.consumption) temp.consumption = "Consumption is required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // SUBMIT
  const handleAddClick = async () => {
  if (!validate()) return;

  setLoading(true);
  try {
    const result = await dispatch(
      addCar({
        ...form,
        year: Number(form.year),
        pricePerDay: Number(form.pricePerDay),
        seats: Number(form.seats),
        equipments: form.equipments
          ? form.equipments.split(",").map((e) => e.trim())
          : [],
      })
    );

    // Check if the action was successful
    if (addCar.fulfilled.match(result)) {
      toast.success("Car added successfully 🚗");
      setForm({
        brand: "",
        model: "",
        year: "",
        color: "",
        pricePerDay: "",
        seats: "",
        category: "",
        transmission: "",
        fuel: "",
        equipments: "",
        description: "",
        image: "",
        consumption: "",
      });
      setErrors({});
    } else {
      // Action failed
      toast.error("Failed to add car");
      console.error(result.error);
    }
  } catch (error) {
    toast.error("An unexpected error occurred");
    console.error(error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Add New Vehicle</h1>
            <p className="text-gray-500 mt-1">Fill in the details to list a new car in the fleet.</p>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BRAND */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Brand *</label>
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="e.g. Mercedes-Benz"
              className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all ${
                errors.brand ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50/30"
              }`}
            />
            {errors.brand && <p className="text-red-500 text-xs font-medium">{errors.brand}</p>}
          </div>

          {/* MODEL */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Model *</label>
            <input
              type="text"
              name="model"
              value={form.model}
              onChange={handleChange}
              placeholder="e.g. G-Class"
              className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all ${
                errors.model ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50/30"
              }`}
            />
            {errors.model && <p className="text-red-500 text-xs font-medium">{errors.model}</p>}
          </div>

          {/* YEAR */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Year *</label>
            <input
              type="number"
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="2024"
              className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all ${
                errors.year ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50/30"
              }`}
            />
            {errors.year && <p className="text-red-500 text-xs font-medium">{errors.year}</p>}
          </div>

          {/* COLOR */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Color</label>
            <input
              type="text"
              name="color"
              value={form.color}
              onChange={handleChange}
              placeholder="e.g. Obsidian Black"
              className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all ${
                errors.color ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50/30"
              }`}
            />
          </div>

          {/* PRICE PER DAY */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Price per day (DH) *</label>
            <input
              type="number"
              name="pricePerDay"
              value={form.pricePerDay}
              onChange={handleChange}
              placeholder="250"
              className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all ${
                errors.pricePerDay ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50/30"
              }`}
            />
            {errors.pricePerDay && <p className="text-red-500 text-xs font-medium">{errors.pricePerDay}</p>}
          </div>

          {/* SEATS */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Seats *</label>
            <input
              type="number"
              name="seats"
              value={form.seats}
              onChange={handleChange}
              placeholder="5"
              className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all ${
                errors.seats ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50/30"
              }`}
            />
            {errors.seats && <p className="text-red-500 text-xs font-medium">{errors.seats}</p>}
          </div>

          {/* CATEGORY */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all appearance-none bg-no-repeat bg-[right_1rem_center] cursor-pointer ${
                errors.category ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50/30"
              }`}
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='Length 19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundSize: '1.25rem' }}
            >
              <option value="">Select category</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Sport">Sport</option>
            </select>
            {errors.category && <p className="text-red-500 text-xs font-medium">{errors.category}</p>}
          </div>

          {/* TRANSMISSION */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Transmission *</label>
            <select
              name="transmission"
              value={form.transmission}
              onChange={handleChange}
              className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all appearance-none bg-no-repeat bg-[right_1rem_center] cursor-pointer ${
                errors.transmission ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50/30"
              }`}
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundSize: '1.25rem' }}
            >
              <option value="">Select transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
            {errors.transmission && <p className="text-red-500 text-xs font-medium">{errors.transmission}</p>}
          </div>

          {/* FUEL */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Fuel *</label>
            <select
              name="fuel"
              value={form.fuel}
              onChange={handleChange}
              className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all appearance-none bg-no-repeat bg-[right_1rem_center] cursor-pointer ${
                errors.fuel ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50/30"
              }`}
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundSize: '1.25rem' }}
            >
              <option value="">Select fuel</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
            {errors.fuel && <p className="text-red-500 text-xs font-medium">{errors.fuel}</p>}
          </div>

          {/* CONSUMPTION */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Consumption *</label>
            <input
              type="text"
              name="consumption"
              value={form.consumption}
              onChange={handleChange}
              placeholder="e.g. 6.5L/100km"
              className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all ${
                errors.consumption ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50/30"
              }`}
            />
            {errors.consumption && <p className="text-red-500 text-xs font-medium">{errors.consumption}</p>}
          </div>

          {/* EQUIPMENTS */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Equipments</label>
            <input
              type="text"
              name="equipments"
              value={form.equipments}
              onChange={handleChange}
              placeholder="GPS, Bluetooth, Leather Seats"
              className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all ${
                errors.equipments ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50/30"
              }`}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Provide a detailed description of the vehicle..."
              className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all ${
                errors.description ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50/30"
              }`}
              rows={4}
            />
            {errors.description && <p className="text-red-500 text-xs font-medium">{errors.description}</p>}
          </div>

          {/* IMAGE */}
          <div className="md:col-span-2 space-y-3">
            <label className="text-sm font-semibold text-gray-700">Vehicle Image *</label>
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="relative w-full md:w-auto">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label 
                  htmlFor="image-upload"
                  className="flex items-center justify-center px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-500 hover:bg-orange-50 cursor-pointer transition-all group w-full md:w-64 h-32"
                >
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 group-hover:text-orange-600">Click to upload image</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </label>
              </div>
              
              {loadingImg && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-orange-500 text-sm font-medium">Uploading...</p>
                </div>
              )}

              {form.image && (
                <div className="relative group">
                  <img
                    src={form.image}
                    alt="Car preview"
                    className="w-32 h-32 object-cover rounded-xl border border-gray-200 shadow-sm"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity flex items-center justify-center">
                    <p className="text-white text-xs font-bold font-mono">CHANGE</p>
                  </div>
                </div>
              )}
            </div>
            {errors.image && <p className="text-red-500 text-xs font-medium">{errors.image}</p>}
          </div>

          {/* BUTTON */}
          <div className="md:col-span-2 flex justify-end mt-6 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={handleAddClick}
              disabled={loading}
              className="w-full md:w-auto px-8 py-3.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 active:scale-95 transition-all font-bold shadow-lg shadow-orange-500/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Adding Vehicle...</span>
                </>
              ) : (
                "Add Vehicle"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
