import React, { useContext, useEffect } from 'react';
import {Routes, Route} from "react-router-dom"
import { UserContext } from './context/user-context';
import { API, setAuthToken } from "./config/api"

import Navbaradmin from "./components/Navbaradmin";
import Navbaruser from "./components/Navbaruser";
import Register from "./pages/main/Register";
import Login from "./pages/main/Login";
import Product from "./pages/admin/Product";
import Addproduct from "./pages/admin/Addproduct";
import Editproduct from "./pages/admin/Editproduct";
import Category from "./pages/admin/Category";
import Addcategory from "./pages/admin/Addcategory";
import Editcategory from "./pages/admin/Editcategory";
import Homepage from "./pages/customer/Homepage"
import Profile from "./pages/customer/Profile"
import Detailproduct from "./pages/customer/Detailproduct"
import Editprofile from './pages/customer/Editprofile';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  const [state,dispatch] = useContext(UserContext)
  console.log(state);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  },[state])

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      console.log(response);
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data;
      console.log(payload);
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);
  
  return (
    <Routes>
      <Route path="/navbaradmin" element={<Navbaradmin/>} />
      <Route path="/navbaruser" element={<Navbaruser/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/product" element={<Product/>} />
      <Route path="/addproduct" element={<Addproduct/>} />
      <Route path="/editproduct/:id" element={<Editproduct/>} />
      <Route path="/category" element={<Category/>} />
      <Route path="/addcategory" element={<Addcategory/>} />
      <Route path="/editcategory/:id" element={<Editcategory/>} />
      <Route path="/" element={<Homepage/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/detailproduct/:id" element={<Detailproduct/>} />
      <Route path="/editprofile/:id" element={<Editprofile/>} />

    </Routes>
  );
}

export default App;
