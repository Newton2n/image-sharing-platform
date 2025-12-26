import Image from "next/image";
import Home from "@/components/Pages/Home";
import authservice from "@/lib/appwrite/auth";
import LogOutBtn from "@/components/Header/LogoutBtn";
export default async function page() {
 
  return (
    <>
    <Home/>
    <LogOutBtn/>
    </>
    
  );
}
