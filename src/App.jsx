import { Header, Footer } from "./components/index";
import { useDispatch } from "react-redux";
import authservice from "../appwrite/auth";
import { Outlet } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { login, logout } from "./store/authSlice";
import { setTheme } from "./store/themeSlice";
function App() {
  const dispatch = useDispatch();

  //auto update theme from user local theme
  const userLocalTheme = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;
  if (userLocalTheme) dispatch(setTheme("dark"));

  useEffect(() => {
    const checkUser = async () => {
      const userData = await authservice.getCurrentUser();
      if (userData) dispatch(login(userData));
      else dispatch(logout());
    };
    checkUser();
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
