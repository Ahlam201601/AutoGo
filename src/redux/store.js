import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./Slices/carsSlice"
import ReservationReducer from "./Slices/reservationSlice"
import WishlistReducer from "./Slices/wishlistSlice"
import authReducer from "./Slices/authSlice"

const store = configureStore({
    reducer: {
        cars: carsReducer,
        reservation: ReservationReducer,
        wishlist: WishlistReducer,
        auth: authReducer
    }

})
export default store;