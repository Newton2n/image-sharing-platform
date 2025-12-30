"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "..";
const BackButton = () => {
  const router = useRouter();
  return (

    <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={() => router.back()}>Go back</Button>
  );
};

export default BackButton;
