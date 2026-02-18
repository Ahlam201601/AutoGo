import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BASE_URL}/Reservation`;

// Async Thunks for API operations using Axios
export const fetchReservations = createAsyncThunk(
  'reservation/fetchReservations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createReservation = createAsyncThunk(
  'reservation/createReservation',
  async (reservation, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, reservation);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateReservation = createAsyncThunk(
  'reservation/updateReservation',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updates);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteReservation = createAsyncThunk(
  'reservation/deleteReservation',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  reservations: [],
  draftReservation: null,
  loading: false,
  error: null,
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setDraftReservation: (state, action) => {
      state.draftReservation = action.payload;
    },

    clearDraftReservation: (state) => {
      state.draftReservation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Reservations
      .addCase(fetchReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Reservation
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations.push(action.payload);
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Reservation
      .addCase(updateReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReservation.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.reservations.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
          state.reservations[index] = action.payload;
        }
      })
      .addCase(updateReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Reservation
      .addCase(deleteReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = state.reservations.filter((r) => r.id !== action.payload);
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setDraftReservation,
  clearDraftReservation,
} = reservationSlice.actions;

export default reservationSlice.reducer;
