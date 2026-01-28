import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
// import Navbar from './Components/Navbar';
import Cars from './pages/Cars'
import Recommendations from './pages/Recommendations'
import Contact from './pages/Contact'
import Login from './pages/Admin/Login'
import AdminDashboard from './pages/Admin/AdminDashboard';
import AddCar from "./pages/Admin/AddCar"
import AdminReservations from "./pages/Admin/AdminReservations"
import Wishlist from './pages/Wishlist';
import CarDetails from './pages/CarDetails';
import { Toaster } from "react-hot-toast";
import ReservationPage from './pages/ReservationPage';



function App() {

  return (
    <>
    <BrowserRouter>
    <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/voitures' element={<Cars/>}/>
        <Route path='/ia' element={<Recommendations/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin/add' element={<AddCar/>}/>
        <Route path='/admin/reservation' element={<AdminReservations/>}/>
        <Route path='/cars' element={<Cars/>}/>
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/reservation/:id" element={<ReservationPage />} />

        
        

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
