"use client"
import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../index";

import service from "@/lib/appwrite/config";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

function EditPost() {
  const [post, setPost] = useState();
  const router = useRouter();
  const { postId } = useParams();
  
  useEffect(() => {
    if (postId) {
      service.getPost(postId).then((post) =>setPost(post));
    
      router.push(`/editpost/${postId}`)
    } else {
     
      router.push("/");
    }
  }, [ postId,router]);

  return <div className="w-full py-8 bg-black">
     <Container>
      <PostForm post ={post}/>
     </Container>
  </div>;
}

export default EditPost;
