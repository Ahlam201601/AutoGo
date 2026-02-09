import { createSlice } from "@reduxjs/toolkit";

const savedWishlist = JSON.parse(localStorage.getItem("wishlistCars")) || [];

const initialState = {
  items: savedWishlist,
  total: savedWishlist.length,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const exist = state.items.find(i => i.id === action.payload.id);
      if (!exist) {
        state.items.push(action.payload);
        state.total += 1;
        localStorage.setItem("wishlistCars", JSON.stringify(state.items));
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      state.total = state.items.length;
      localStorage.setItem("wishlistCars", JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      state.total = 0;
      localStorage.removeItem("wishlistCars");
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
