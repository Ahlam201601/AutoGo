import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./Slices/carsSlice"

const store = configureStore({
    reducer : {
        cars : carsReducer
    }

})
export default store;