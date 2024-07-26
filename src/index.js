import React, { useEffect } from "react";
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
import { Provider } from "react-redux";
import { store } from "./store";
// import axios from "axios";
// import { Exposure } from "@mui/icons-material";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/user/" element={<Layout />}>
        <Route path="PatientData" element={<SpecificData />} />
        <Route path="AddPatient" element={<AddPatient />} />
        <Route path="all" element={<LoadData />} />
      </Route>
    </>
  )
);

// export default useEffect(async () => {
//   const token = localStorage.getItem("jwtToken");
//   const headers = {
//     "Content-Type": "application/json;charset=UTF-8",
//     "Access-Control-Allow-Origin": "*",
//     "JWT-Token": token,
//   };
//   try {
//     const res = await axios.post(`http://localhost:5000/api/user/signin`, {
//       headers: headers,
//     });
//     if (res.status >= 200 || res.status < 300) {
//       const token = res.data.usr.token;
//       localStorage.setItem("jwtToken", token);
//       dispatch(addUser(res.data));
//       navigate("/user");
//     } else if (res.status >= 400 || res.status < 500) {
//       alert("There seems to be an error please try again");
//     } else {
//       alert("Loading");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }, []);

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
