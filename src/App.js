import LoadData from "./components/PatientData";
import SpecificData from "./components/SpecificData";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddPatient from "./components/AddPatient";
import SignIn from "./components/User/SignIn";
import SignUp from "./components/User/SignUp";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoadData />} />
          <Route path="/PatientData" element={<SpecificData />} />
          <Route path="/AddPatient" element={<AddPatient />} />
          <Route path="/all" element={<LoadData />} />
          <Route path="/Signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
