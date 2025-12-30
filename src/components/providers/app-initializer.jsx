"use client";
import authservice from "@/lib/appwrite/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTheme } from "@/store/themeSlice";
import { logout,login } from "@/store/authSlice";
export default function AppInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // 1. Handle Theme (Safe for Client-side only)
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (mediaQuery.matches) {
      dispatch(setTheme("dark"));
    }

    // 2. Handle Auth
    const checkUser = async () => {
      try {
        const userData = await authservice.getCurrentUser();
        userData ? dispatch(login(userData)) : dispatch(logout());
      } catch (error) {
        dispatch(logout());
      }
    };

    checkUser();
  }, [dispatch]);

  return <>{children}</>;
}
