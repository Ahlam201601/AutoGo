import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCar } from "../../redux/Slices/carsSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiX, FiUploadCloud, FiCheck } from "react-icons/fi";

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
  const [addSuccess, setAddSuccess] = useState(false);

  /* ── IMAGE UPLOAD ── */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoadingImg(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "cars_fill");

    try {
      const res = await fetch(CLOUDINARY_UPLOAD_URL, { method: "POST", body: formData });
      const data = await res.json();
      setForm((prev) => ({ ...prev, image: data.secure_url }));
    } catch {
      toast.error("Image upload failed ❌");
    } finally {
      setLoadingImg(false);
    }
  };

  /* ── VALIDATION ── */
  const validate = () => {
    const temp = {};
    if (!form.brand)        temp.brand        = "Brand is required";
    if (!form.model)        temp.model        = "Model is required";
    if (!form.year)         temp.year         = "Year is required";
    if (!form.pricePerDay)  temp.pricePerDay  = "Price is required";
    if (!form.seats)        temp.seats        = "Seats are required";
    if (!form.color)        temp.color        = "Color is required";
    if (!form.category)     temp.category     = "Category is required";
    if (!form.transmission) temp.transmission = "Transmission is required";
    if (!form.fuel)         temp.fuel         = "Fuel is required";
    if (!form.consumption)  temp.consumption  = "Consumption is required";
    if (!form.equipments)   temp.equipments   = "Equipments are required";
    if (!form.description)  temp.description  = "Description is required";
    if (!form.image)        temp.image        = "Image is required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  /* ── SUBMIT ── */
  const handleAddClick = async () => {
    if (!validate()) return;
    setLoading(true);

    const newCarData = {
      ...form,
      year:        Number(form.year),
      pricePerDay: Number(form.pricePerDay),
      seats:       Number(form.seats),
      consumption: Number(form.consumption),
      equipments:  form.equipments
        ? form.equipments.split(",").map((e) => e.trim())
        : [],
    };

    try {
      await dispatch(addCar(newCarData)).unwrap();

      // Reset form
      setForm({
        brand: "", model: "", year: "", color: "", pricePerDay: "",
        seats: "", category: "", transmission: "", fuel: "",
        equipments: "", description: "", image: "", consumption: "",
      });
      setErrors({});
      setAddSuccess(true);
      toast.success("Car added successfully 🚗", { duration: 3000 });

      setTimeout(() => setAddSuccess(false), 1500);
    } catch {
      toast.error("Failed to add car ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ── CHANGE ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  /* ── SHARED CLASSES ── */
  const inputCls = (name) =>
    `w-full border p-3 rounded-xl mt-1 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-500 transition-all ${
      errors[name] ? "border-red-400 bg-red-50/30" : "border-gray-200"
    }`;

  return (
    <div className="w-full max-w-full">
      <div className="bg-white w-full p-6 md:p-8 lg:p-10 rounded-2xl shadow-xl border border-gray-100">
        
        {/* ── HEADER ── */}
        <div className="flex items-center justify-between px-2 py-4 border-b border-gray-100 bg-white mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-10 bg-orange-500 rounded-full" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">Add New Vehicle</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Complete the form to add a new vehicle to the fleet
              </p>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="px-2 py-2 bg-gray-50 min-h-[400px]">

          {/* SECTION : Basic Information */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">Basic Information</p>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">

            {/* Brand */}
            <div>
              <label className="text-sm text-gray-600">Brand *</label>
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className={inputCls("brand")}
                placeholder="e.g. Mercedes"
              />
              {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
            </div>

            {/* Model */}
            <div>
              <label className="text-sm text-gray-600">Model *</label>
              <input
                type="text"
                name="model"
                value={form.model}
                onChange={handleChange}
                className={inputCls("model")}
                placeholder="e.g. C-Class"
              />
              {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
            </div>

            {/* Year */}
            <div>
              <label className="text-sm text-gray-600">Year *</label>
              <input
                type="number"
                name="year"
                value={form.year}
                onChange={handleChange}
                className={inputCls("year")}
                placeholder="2024"
              />
              {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
            </div>
          </div>

          {/* SECTION : Vehicle Details */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">Vehicle Details</p>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">

            {/* Price */}
            <div>
              <label className="text-sm text-gray-600">Price / Day (MAD) *</label>
              <input
                type="number"
                name="pricePerDay"
                value={form.pricePerDay}
                onChange={handleChange}
                className={inputCls("pricePerDay")}
                placeholder="150"
              />
              {errors.pricePerDay && <p className="text-red-500 text-sm mt-1">{errors.pricePerDay}</p>}
            </div>

            {/* Seats */}
            <div>
              <label className="text-sm text-gray-600">Seats *</label>
              <input
                type="number"
                name="seats"
                value={form.seats}
                onChange={handleChange}
                className={inputCls("seats")}
                placeholder="5"
              />
              {errors.seats && <p className="text-red-500 text-sm mt-1">{errors.seats}</p>}
            </div>

            {/* Color */}
            <div>
              <label className="text-sm text-gray-600">Color *</label>
              <input
                type="text"
                name="color"
                value={form.color}
                onChange={handleChange}
                className={inputCls("color")}
                placeholder="Metallic Silver"
              />
              {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
            </div>
          </div>

          {/* SECTION : Classification */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">Classification</p>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">

            {/* Category */}
            <div>
              <label className="text-sm text-gray-600">Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inputCls("category")}
              >
                <option value="">Select</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="City">City</option>
                <option value="Luxury">Luxury</option>
                <option value="4x4">4x4</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            {/* Transmission */}
            <div>
              <label className="text-sm text-gray-600">Transmission *</label>
              <select
                name="transmission"
                value={form.transmission}
                onChange={handleChange}
                className={inputCls("transmission")}
              >
                <option value="">Select</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
              {errors.transmission && <p className="text-red-500 text-sm mt-1">{errors.transmission}</p>}
            </div>

            {/* Fuel */}
            <div>
              <label className="text-sm text-gray-600">Fuel *</label>
              <select
                name="fuel"
                value={form.fuel}
                onChange={handleChange}
                className={inputCls("fuel")}
              >
                <option value="">Select</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
              {errors.fuel && <p className="text-red-500 text-sm mt-1">{errors.fuel}</p>}
            </div>
          </div>

          {/* SECTION : Media & Additional Info */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">Media & Additional Info</p>
          </div>

          {/* Row 1 : Consumption + Equipments + Description */}
          <div className="grid grid-cols-3 gap-4 mb-4">

            {/* Consumption */}
            <div>
              <label className="text-sm text-gray-600">Consumption (L/100km) *</label>
              <input
                type="number"
                name="consumption"
                value={form.consumption}
                onChange={handleChange}
                className={inputCls("consumption")}
                placeholder="6.5"
              />
              {errors.consumption && <p className="text-red-500 text-sm mt-1">{errors.consumption}</p>}
            </div>

            {/* Equipments */}
            <div>
              <label className="text-sm text-gray-600">Equipments *</label>
              <textarea
                name="equipments"
                value={form.equipments}
                onChange={handleChange}
                placeholder="GPS, Bluetooth, AC, Camera..."
                rows={4}
                className={`w-full border p-3 rounded-xl mt-1 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-500 transition-all resize-none placeholder-gray-400 ${
                  errors.equipments ? "border-red-400 bg-red-50/30" : "border-gray-200"
                }`}
              />
              {errors.equipments && <p className="text-red-500 text-sm mt-1">{errors.equipments}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-gray-600">Description *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Brief description..."
                rows={4}
                className={`w-full border p-3 rounded-xl mt-1 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-500 transition-all resize-none placeholder-gray-400 ${
                  errors.description ? "border-red-400 bg-red-50/30" : "border-gray-200"
                }`}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
          </div>

          {/* Row 2 : Image Upload — full width */}
          <div className="mb-6">
            <label className="text-sm text-gray-600">Image *</label>
            <label
              className={`mt-1 relative flex items-center gap-5 border-2 border-dashed ${
                errors.image ? "border-red-400 bg-red-50/20" : "border-gray-300"
              } rounded-xl px-6 py-4 cursor-pointer hover:border-orange-500 hover:bg-orange-50/40 transition-all bg-white group w-full`}
            >
              {form.image ? (
                <img src={form.image} className="w-20 h-20 object-cover rounded-xl flex-shrink-0 border-2 border-orange-200" />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-50 transition-colors">
                  <FiUploadCloud size={28} className="text-gray-400 group-hover:text-orange-500 transition-colors" />
                </div>
              )}
              <div className="flex flex-col gap-0.5">
                {form.image ? (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                        <FiCheck className="text-white" size={11} />
                      </div>
                      <span className="text-sm font-semibold text-orange-500">Image uploaded</span>
                    </div>
                    <p className="text-xs text-gray-400">Click to replace image</p>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-500 transition-colors">
                      Click to upload an image
                    </span>
                    <p className="text-xs text-gray-400">PNG, JPG, WEBP — Max 5MB</p>
                  </>
                )}
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
            {loadingImg && (
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-3 h-3 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-orange-500 text-xs font-medium">Uploading...</span>
              </div>
            )}
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

        </div>

        {/* ── FOOTER ── */}
        <div className="px-2 py-4 border-t border-gray-100 bg-white flex items-center justify-between">
          <p className="text-xs text-gray-400">
            <span className="text-orange-500 font-bold">*</span> Required fields
          </p>
          <button
            type="button"
            onClick={handleAddClick}
            disabled={loading || loadingImg}
            className={`px-8 py-2.5 rounded-xl text-sm font-bold text-white transition-all flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${
              addSuccess
                ? "bg-green-500 shadow-green-500/25"
                : "bg-orange-500 hover:bg-orange-600 shadow-orange-500/25"
            }`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Adding...
              </>
            ) : addSuccess ? (
              <>
                <FiCheck size={16} />
                Added!
              </>
            ) : (
              <>
                <FiCheck size={16} />
                Add Vehicle
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}