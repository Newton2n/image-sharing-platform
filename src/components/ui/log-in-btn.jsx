"use client"
import { Button } from "..";
import { useRouter } from "next/navigation";
const LogInBtn = () => {
  const router = useRouter();
  return (
    <Button
      children={"Log In"}
      className="bg-red-500 text-white"
      onClick={() => router.push("/login")}
    />
  );
};

export default LogInBtn;
