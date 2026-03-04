import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Removed fetchAIFromGemini import as it will be handled in the component

const API_URL = import.meta.env.VITE_BASE_URL;
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

/* ===================== GET CARS ===================== */
export const getCars = createAsyncThunk("cars/getCars", async () => {
  const res = await axios.get(`${API_URL}/cars`);
  return res.data;
});

/* ===================== ADD CAR ===================== */
export const addCar = createAsyncThunk("cars/addCar", async (carData) => {
  const res = await axios.post(`${API_URL}/cars`, carData);
  return res.data;
});

/* ===================== DELETE CAR ===================== */
export const deleteCar = createAsyncThunk("cars/deleteCar", async (id) => {
  await axios.delete(`${API_URL}/cars/${id}`);
  return id;
});

/* ===================== EDIT CAR ===================== */
export const editCar = createAsyncThunk(
  "cars/editCar",
  async ({ id, carData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/cars/${id}`, carData);
      return res.data; // updated car
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error during modification"
      );
    }
  }
);

// AI Recommendations AsyncThunk removed. Moving logic to Recommendations.jsx component.

/* ===================== NOTIFY N8N ===================== */
export const notifyN8n = createAsyncThunk(
  "cars/notifyN8n",
  async (reservationData, { rejectWithValue }) => {
    if (!N8N_WEBHOOK_URL) return;
    try {
      const res = await axios.post(N8N_WEBHOOK_URL, reservationData);
      console.log("n8n Webhook notified successfully 🚀");
      return res.data;
    } catch (error) {
      console.error("n8n Webhook notification failed:", error);
      return rejectWithValue(error.message);
    }
  }
);

/* ===================== SLICE ===================== */
const carsSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    recommendations: [],
    status: "idle",
    recStatus: "idle",
    error: null,
  },
  reducers: {
    setRecommendations: (state, action) => {
      state.recommendations = action.payload;
    },
    setRecStatus: (state, action) => {
      state.recStatus = action.payload;
    },
    setRecError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      /* -------- GET -------- */
      .addCase(getCars.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cars = action.payload;
      })
      .addCase(getCars.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      /* -------- ADD -------- */
      .addCase(addCar.fulfilled, (state, action) => {
        state.cars.push(action.payload);
      })

      /* -------- DELETE -------- */
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.cars = state.cars.filter(
          (car) => car.id !== action.payload
        );
      })

      /* -------- EDIT -------- */
      .addCase(editCar.fulfilled, (state, action) => {
        const index = state.cars.findIndex(
          (car) => car.id === action.payload.id
        );

        if (index !== -1) {
          state.cars[index] = action.payload;
        }
      })


      /* -------- N8N NOTIFY -------- */
      .addCase(notifyN8n.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setRecommendations, setRecStatus, setRecError } = carsSlice.actions;
export default carsSlice.reducer;
