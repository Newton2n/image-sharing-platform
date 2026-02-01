"use client";
import { Button } from "..";
import { useRouter } from "next/navigation";
const LogInBtn = () => {
  const router = useRouter();
  return (
    <Button
      className="bg-red-500 text-white"
      onClick={() => router.push("/login")}
    >
      Log In
    </Button>
  );
};

export default LogInBtn;
