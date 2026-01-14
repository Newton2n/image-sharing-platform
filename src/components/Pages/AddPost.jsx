"use client";
import React from "react";
import { PostForm, Container } from "../index";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
function AddPost() {
  const router = useRouter()
  const loginUserDetails = useSelector((state) => state.auth.userData);
  if (loginUserDetails) return router.replace("/login");
  return (
    <div className=" py-8 dark:bg-black">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
