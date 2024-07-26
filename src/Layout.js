import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";

export default function Layout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    navigate("/");
  }
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
