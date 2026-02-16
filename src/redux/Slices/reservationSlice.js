import { createSlice } from '@reduxjs/toolkit';

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem('reservations');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (reservations) => {
  localStorage.setItem('reservations', JSON.stringify(reservations));
};

const initialState = {
  reservations: loadFromStorage(),
  draftReservation: null, // Stores temporary reservation data for editing
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    addReservation: (state, action) => {
      state.reservations.push(action.payload);
      saveToStorage(state.reservations);
    },

    updateReservationStatus: (state, action) => {
      const { id, status } = action.payload;
      const reservation = state.reservations.find((r) => r.id === id);
      if (reservation) {
        reservation.status = status;
        saveToStorage(state.reservations);
      }
    },

    clearReservations: (state) => {
      state.reservations = [];
      saveToStorage([]);
    },

    setDraftReservation: (state, action) => {
      state.draftReservation = action.payload;
    },

    clearDraftReservation: (state) => {
      state.draftReservation = null;
    },
  },
});

export const {
  addReservation,
  updateReservationStatus,
  clearReservations,
  setDraftReservation,
  clearDraftReservation,
} = reservationSlice.actions;

export default reservationSlice.reducer;
