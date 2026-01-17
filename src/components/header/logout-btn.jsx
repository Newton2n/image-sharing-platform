"use client"
import { Button } from "../index";
import authservice from "@/lib/appwrite/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
function LogOutBtn() {
  const dispatch = useDispatch();
  const router = useRouter();

  const logOutBtn = async () => {
    const deleteSession = authservice.logOut();

    dispatch(logout());
    if (deleteSession) router.replace("/login");
  };
  return <Button className="bg-red-400/15 text-red-500/40 dark:text-white/40 hover:scale-[1.03] transition-transform duration-200 ease-out" children={"Logout"} onClick={logOutBtn} />;
}

export default LogOutBtn;
