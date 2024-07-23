import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import SpecificData from "./components/SpecificData";
import AddPatient from "./components/AddPatient";
import LoadData from "./components/PatientData";
import SignIn from "./components/User/SignIn";
import SignUp from "./components/User/SignUp";
import Dashboard from "./components/Header";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="PatientData" element={<SpecificData />} />
      <Route path="AddPatient" element={<AddPatient />} />
      <Route path="all" element={<LoadData />} />
      <Route path="Signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Default /> */}
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
