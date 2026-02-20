import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAIRecommendations as fetchAIFromGemini } from "../../api/route";

const API_URL = import.meta.env.VITE_BASE_URL;

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

/* ===================== GET AI RECOMMENDATIONS ===================== */
export const getAIRecommendations = createAsyncThunk(
  "cars/getAIRecommendations",
  async (userPreferences, { getState, rejectWithValue }) => {
    try {
      const { cars } = getState().cars;
      const recommendedIds = await fetchAIFromGemini(userPreferences, cars);

      // Filter the original cars list by the IDs returned from AI
      const recommendedCars = cars.filter(car => recommendedIds.includes(car.id));
      return recommendedCars;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to get AI recommendations");
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
  reducers: {},
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

      /* -------- AI RECOMMENDATIONS -------- */
      .addCase(getAIRecommendations.pending, (state) => {
        state.recStatus = "loading";
      })
      .addCase(getAIRecommendations.fulfilled, (state, action) => {
        state.recStatus = "succeeded";
        state.recommendations = action.payload;
      })
      .addCase(getAIRecommendations.rejected, (state, action) => {
        state.recStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default carsSlice.reducer;
