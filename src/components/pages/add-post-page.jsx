"use client";
import React from "react";
import { PostForm, Container } from "../index";

function AddPost() {
  return (
    <div className=" py-8 dark:bg-black">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
