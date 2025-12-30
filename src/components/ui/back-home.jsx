"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "..";
const BackHome = () => {
  const router = useRouter();
  return (
    <Button className={"text-white bg-red-500 hover:bg-red-600"} onClick={()=>router.replace("/")}>Go Home</Button>
  );
};

export default BackHome;
