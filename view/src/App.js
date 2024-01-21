import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from './Components/Home'
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import User from './Components/User'
import Login from './Components/Login'
import React, { useState, useEffect } from 'react';
import Register from './Components/Register';
import Search from './Components/Search';
import Saves from './Components/Saves';
import Service from './Components/Service';
import Reservations from './Components/Reservations';
import ChangeDetails from './Components/ChangeDetails';
import Confirm from './Components/Confirm';


function App() {

  const [bgChange, setBgChange] = useState({one:'', two: '', three: 'py-4 mt-4 c-dark border-top-grey', four:''})

  useEffect(()=>{
    if(window.location.pathname === '/'){
      setBgChange({
        one: 'gradient_bgd2', two:'gradient_bgd1', three: 'py-4 footer mt-4', four: 'd-none'
      })
    }
  },[setBgChange])

  const router = createBrowserRouter(
    createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<User />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search/:category?/:nn?" element={<Search />} />
      <Route path="/search//:nn?" element={<Search />} />
      <Route path="/saves" element={<Saves />} />
      <Route path="/services/:id" element={<Service />} />
      <Route path="/confirm/:id" element={<Confirm />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/change" element={<ChangeDetails />} />
    </>
  ))

  return (
    <>
      {bgChange.four=== "d-none"?"": <Nav/>}
      <RouterProvider router={router} />
      <Footer style={bgChange.three} />
    </>
  );
}

export default App;
