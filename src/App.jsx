import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
// import Navbar from './Components/Navbar';
import Cars from './pages/Cars'
import Recommendations from './pages/Recommendations'
import Contact from './pages/Contact'
import Login from './pages/Admin/Login'
import AdminDashboard from './pages/Admin/AdminDashboard';

import Wishlist from './pages/Wishlist';


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/voitures' element={<Cars/>}/>
        <Route path='/ia' element={<Recommendations/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='//admin/dashboard' element={<AdminDashboard/>}/>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
