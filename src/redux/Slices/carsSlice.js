import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
      return res.data; // voiture modifiée
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Erreur lors de la modification"
      );
    }
  }
);

/* ===================== SLICE ===================== */
const carsSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    status: "idle",
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
      });
  },
});

export default carsSlice.reducer;
