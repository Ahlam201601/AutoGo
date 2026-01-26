import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

export const getCars = createAsyncThunk("cars/getCars", async () => {
  const res = await axios.get(`${API_URL}/cars`);
  return res.data;
});

export const addCar = createAsyncThunk("cars/addCar", async (carData) => {
  const res = await axios.post(`${API_URL}/cars`, carData);
  return res.data;
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
      });
  },
});

export default carsSlice.reducer;
