import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Category from "./pages/Category";
import CreateListing from "./pages/CreateListing";
import PrivateRoute from "./components/PrivateRoute";
import Listing from "./pages/Listing";

function App() {
  //
  return (
    <>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route
          path="/category/:categoryName/:listingId"
          element={<Listing />}
        />
      </Routes>
      {/*  */}
      <Navbar />

      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
