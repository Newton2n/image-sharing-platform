"use client";
import { Button } from "../index";
import authservice from "@/lib/appwrite/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useState } from "react";
import ButtonLoader from "../ui/loading/button-loader";
function LogOutBtn() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const logOutBtn = async () => {
    setError("");
    setIsLoading(true);
    try {
      const deleteSession = await authservice.logOut();
      dispatch(logout());
      if (deleteSession) router.replace("/login");
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      disabled={isLoading}
      className={`bg-red-400/15 text-red-500/40 dark:text-white/40 hover:scale-[1.03] transition-transform duration-200 ease-out flex justify-center items-center gap-2 ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
      onClick={logOutBtn}
    >
      {isLoading ? (
        <>
          Logout <ButtonLoader />
        </>
      ) : (
        "Logout"
      )}
    </Button>
  );
}

export default LogOutBtn;
