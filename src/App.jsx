import { Header, Footer } from "./components/index";
import { useDispatch } from "react-redux";
import authservice from "../appwrite/auth";
import { Outlet } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { login, logout } from "./store/authSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkUser = async () => {
      const userData =await authservice.getCurrentUser();
      if (userData) dispatch(login(userData));
      else dispatch(logout());
    };
    checkUser()
  }, [dispatch]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
