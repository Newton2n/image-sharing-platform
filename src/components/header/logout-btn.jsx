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
  return <Button className="hover:bg-red-700 bg-red-500 text-white" children={"Logout"} onClick={logOutBtn} />;
}

export default LogOutBtn;
