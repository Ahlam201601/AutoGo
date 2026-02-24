import { useState } from "react";
import { useDispatch } from "react-redux";
import { editCar } from "../../redux/Slices/carsSlice";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";

const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;

export default function EditCar({ car, onClose }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    ...car,
    equipments: Array.isArray(car.equipments)
      ? car.equipments.join(", ")
      : car.equipments || "",
  });

  const [errors, setErrors] = useState({});
  const [loadingImg, setLoadingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------------- IMAGE UPLOAD ---------------- */
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
      console.log("Image uploaded:", data.secure_url);
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed ❌");
    } finally {
      setLoadingImg(false);
    }
  };

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const temp = {};
    if (!form.brand) temp.brand = "Brand is required";
    if (!form.model) temp.model = "Model is required";
    if (!form.year) temp.year = "Year is required";
    if (!form.pricePerDay) temp.pricePerDay = "Price is required";
    if (!form.seats) temp.seats = "Seats are required";
    if (!form.category) temp.category = "Category is required";
    if (!form.transmission) temp.transmission = "Transmission is required";
    if (!form.fuel) temp.fuel = "Fuel is required";
    if (!form.image) temp.image = "Image is required";
    if (!form.color) temp.color = "Color is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleUpdateClick = async () => {
  if (!validate()) return;

  setLoading(true);

  dispatch(
    editCar({
      id: form.id,
      carData: {
        ...form,
        year: Number(form.year),
        pricePerDay: Number(form.pricePerDay),
        seats: Number(form.seats),
        equipments: form.equipments
          ? form.equipments.split(",").map((e) => e.trim())
          : [],
      },
    })
  )
    .then(() => {
      toast.success("Car updated successfully 🚗");
      onClose();
    })
    .catch((error) => {
      console.error(error);
      toast.error("Update failed ❌");
    })
    .finally(() => {
      setLoading(false);
    });
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="relative bg-white w-full max-w-4xl p-6 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <FiX size={22} />
        </button>

        <h2 className="text-2xl font-bold text-orange-500 text-center mb-4">
          Edit Car
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* BRAND */}
          <div>
            <label className="text-sm text-gray-600">Brand *</label>
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-1"
            />
            {errors.brand && <p className="text-red-500 text-sm">{errors.brand}</p>}
          </div>

          {/* MODEL */}
          <div>
            <label className="text-sm text-gray-600">Model *</label>
            <input
              type="text"
              name="model"
              value={form.model}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-1"
            />
            {errors.model && <p className="text-red-500 text-sm">{errors.model}</p>}
          </div>

          {/* YEAR */}
          <div>
            <label className="text-sm text-gray-600">Year *</label>
            <input
              type="number"
              name="year"
              value={form.year}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-1"
            />
            {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm text-gray-600">Price / day *</label>
            <input
              type="number"
              name="pricePerDay"
              value={form.pricePerDay}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-1"
            />
            {errors.pricePerDay && <p className="text-red-500 text-sm">{errors.pricePerDay}</p>}
          </div>

          {/* SEATS */}
          <div>
            <label className="text-sm text-gray-600">Seats *</label>
            <input
              type="number"
              name="seats"
              value={form.seats}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-1"
            />
            {errors.seats && <p className="text-red-500 text-sm">{errors.seats}</p>}
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-sm text-gray-600">Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-1"
            >
              <option value="">Select</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="City">City</option>
              <option value="Luxury">Luxury</option>
              <option value="4x4">4x4</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          {/* TRANSMISSION */}
          <div>
            <label className="text-sm text-gray-600">Transmission *</label>
            <select
              name="transmission"
              value={form.transmission}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-1"
            >
              <option value="">Select</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
            {errors.transmission && <p className="text-red-500 text-sm">{errors.transmission}</p>}
          </div>

          {/* FUEL */}
          <div>
            <label className="text-sm text-gray-600">Fuel *</label>
            <select
              name="fuel"
              value={form.fuel}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-1"
            >
              <option value="">Select</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
            {errors.fuel && <p className="text-red-500 text-sm">{errors.fuel}</p>}
          </div>

          {/* COLOR */}
          <div>
            <label className="text-sm text-gray-600">Color *</label>
            <input
              type="text"
              name="color"
              value={form.color || ""}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-1"
            />
            {errors.color && <p className="text-red-500 text-sm">{errors.color}</p>}
          </div>

          {/* DESCRIPTION */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              rows={4}
              className="w-full border p-3 rounded-xl mt-1"
            />
          </div>

          {/* EQUIPEMENTS */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">
              Equipments (comma separated)
            </label>
            <input
              type="text"
              name="equipments"
              value={form.equipments}
              onChange={handleChange}
              placeholder="GPS, Bluetooth, AC"
              className="w-full border p-3 rounded-xl mt-1"
            />
            {errors.equipments && <p className="text-red-500 text-sm">{errors.equipments}</p>}
          </div>

          {/* IMAGE */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {loadingImg && <p className="text-orange-500">Uploading...</p>}
            {form.image && (
              <img src={form.image} className="w-32 h-32 mt-2 rounded-xl object-cover" />
            )}
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
          </div>

          {/* BUTTON */}
          <div className="md:col-span-2 flex justify-end pt-4 border-t">
            <button
              type="button"
              onClick={handleUpdateClick}
              disabled={loading}
              className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600"
            >
              {loading ? "Updating..." : "Update Car"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
