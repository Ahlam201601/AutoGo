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
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-orange-500/30">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Car</h1>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BRAND */}
        <div>
          <label className="text-sm text-gray-600">Brand *</label>
          <input
            type="text"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Enter brand"
            className={`w-full border p-3 rounded-xl mt-1 focus:border-orange-500 outline-none ${
              errors.brand ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
        </div>

        {/* MODEL */}
        <div>
          <label className="text-sm text-gray-600">Model *</label>
          <input
            type="text"
            name="model"
            value={form.model}
            onChange={handleChange}
            placeholder="Enter model"
            className={`w-full border p-3 rounded-xl mt-1 focus:border-orange-500 outline-none ${
              errors.model ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
        </div>

        {/* YEAR */}
        <div>
          <label className="text-sm text-gray-600">Year *</label>
          <input
            type="number"
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="Enter year"
            className={`w-full border p-3 rounded-xl mt-1 focus:border-orange-500 outline-none ${
              errors.year ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
        </div>

        {/* COLOR */}
        <div>
          <label className="text-sm text-gray-600">Color</label>
          <input
            type="text"
            name="color"
            value={form.color}
            onChange={handleChange}
            placeholder="Enter color"
            className={`w-full border p-3 rounded-xl mt-1 focus:border-orange-500 outline-none ${
              errors.color ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
        </div>

        {/* PRICE PER DAY */}
        <div>
          <label className="text-sm text-gray-600">Price per day *</label>
          <input
            type="number"
            name="pricePerDay"
            value={form.pricePerDay}
            onChange={handleChange}
            placeholder="Enter price per day"
            className={`w-full border p-3 rounded-xl mt-1 focus:border-orange-500 outline-none ${
              errors.pricePerDay ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.pricePerDay && <p className="text-red-500 text-sm mt-1">{errors.pricePerDay}</p>}
        </div>

        {/* SEATS */}
        <div>
          <label className="text-sm text-gray-600">Seats *</label>
          <input
            type="number"
            name="seats"
            value={form.seats}
            onChange={handleChange}
            placeholder="Enter number of seats"
            className={`w-full border p-3 rounded-xl mt-1 focus:border-orange-500 outline-none ${
              errors.seats ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.seats && <p className="text-red-500 text-sm mt-1">{errors.seats}</p>}
        </div>

        {/* CATEGORY */}
        <div>
          <label className="text-sm text-gray-600">Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={`w-full border p-3 rounded-xl mt-1 focus:border-orange-500 outline-none ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select category</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="City">City</option>
            <option value="Luxury">Luxury</option>
            <option value="4x4">4x4</option>
            <option value="Utility">Utility</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        {/* TRANSMISSION */}
        <div>
          <label className="text-sm text-gray-600">Transmission *</label>
          <select
            name="transmission"
            value={form.transmission}
            onChange={handleChange}
            className={`w-full border p-3 rounded-xl mt-1 focus:border-orange-500 outline-none ${
              errors.transmission ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
          {errors.transmission && <p className="text-red-500 text-sm mt-1">{errors.transmission}</p>}
        </div>

        {/* FUEL */}
        <div>
          <label className="text-sm text-gray-600">Fuel *</label>
          <select
            name="fuel"
            value={form.fuel}
            onChange={handleChange}
            className={`w-full border p-3 rounded-xl mt-1 focus:border-orange-500 outline-none ${
              errors.fuel ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select fuel</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
          </select>
          {errors.fuel && <p className="text-red-500 text-sm mt-1">{errors.fuel}</p>}
        </div>

        {/* EQUIPMENTS */}
        <div>
          <label className="text-sm text-gray-600">Equipments</label>
          <input
            type="text"
            name="equipments"
            value={form.equipments}
            onChange={handleChange}
            placeholder="Comma separated"
            className={`w-full border p-3 rounded-xl mt-1 focus:border-orange-500 outline-none ${
              errors.equipments ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.equipments && <p className="text-red-500 text-sm mt-1">{errors.equipments}</p>}
        </div>

        {/* DESCRIPTION */}
        <div className="md:col-span-2">
          <label className="text-sm text-gray-600">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter description"
            className={`w-full border p-3 rounded-xl mt-1 focus:border-orange-500 outline-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            rows={4}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* IMAGE */}
        <div className="md:col-span-2">
          <label className="text-sm text-gray-600">Car Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className={`w-full border p-3 rounded-xl mt-1 focus:border-orange-500 outline-none ${
              errors.image ? "border-red-500" : "border-gray-300"
            }`}
          />
          {loadingImg && <p className="text-orange-500 mt-1">Uploading...</p>}
          {form.image && (
            <img
              src={form.image}
              alt="Car preview"
              className="mt-2 w-32 h-32 object-cover rounded-xl border"
            />
          )}
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
        </div>

        {/* BUTTON */}
        <div className="md:col-span-2 flex justify-end mt-4 pt-4 border-t">
          <button
            type="button"
            onClick={handleAddClick}
            disabled={loading}
            className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition font-semibold"
          >
            {loading ? "Adding..." : "Add Car"}
          </button>
        </div>
      </form>
    </div>
  );
}
