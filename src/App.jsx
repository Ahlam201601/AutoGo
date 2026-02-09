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
import CarsList from "./pages/Admin/CarsList";
import Wishlist from './pages/Wishlist';
import CarDetails from './pages/CarDetails';
import { Toaster } from "react-hot-toast";
import ReservationPage from './pages/ReservationPage';
import RecapPage from './pages/RecapPage';



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
        <Route path='/admin' element={<AdminDashboard/>}>
          <Route index element={<CarsList />} />
          <Route path='add' element={<AddCar/>}/>
          <Route path='reservation' element={<AdminReservations/>}/>
        </Route>
        <Route path='/cars' element={<Cars/>}/>
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/reservation/:id" element={<ReservationPage />} />
        <Route path="/recap" element={<RecapPage />} />

        
        

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
