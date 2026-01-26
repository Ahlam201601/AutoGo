import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

// Get all cars
export const getCars = createAsyncThunk("cars/getCars", async () => {
  const res = await axios.get(`${API_URL}/cars`);
  return res.data;
});

// Add a car
export const addCar = createAsyncThunk("cars/addCar", async (carData) => {
  const res = await axios.post(`${API_URL}/cars`, carData);
  return res.data;
});

// Delete a car
export const deleteCar = createAsyncThunk("cars/deleteCar", async (id) => {
  await axios.delete(`${API_URL}/cars/${id}`);
  return id; 
});

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
      .addCase(addCar.fulfilled, (state, action) => {
        state.cars.push(action.payload);
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.cars = state.cars.filter((car) => car.id !== action.payload);
      });
  },
});

export default carsSlice.reducer;
