import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./Slices/carsSlice"
import ReservationReducer from "./Slices/reservationSlice"

const store = configureStore({
    reducer : {
        cars : carsReducer,
        reservation : ReservationReducer
    }

})
export default store;