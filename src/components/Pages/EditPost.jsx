"use client";
import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../index";
import { useSelector } from "react-redux";
import service from "@/lib/appwrite/config";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import AuthLoading from "../ui/loading/auth-loading";

function EditPost() {
  const [post, setPost] = useState();
  const router = useRouter();
  const userData = useSelector((state) => state.auth.userData);
  const [isAuthor, setIsAuthor] = useState(false);
  const { postId } = useParams();

  //get post
  useEffect(() => {
    if (postId) {
      service
        .getPost(postId)
        .then((post) => setPost(post))
        .catch((err) => {
          router.replace("/");
        });
    } else {
      router.replace("/");
    }
  }, [postId, router]);

  //Authenticate owner
  useEffect(() => {
    if (post?.userId && userData?.$id && post?.userId === userData?.$id) {
      setIsAuthor(true);
    } else {
      const wait = setTimeout(() => {
        if (post?.userId !== userData?.$id) router.replace(`/post/${post?.$id}`);
      }, 1000);
      return () => clearTimeout(wait);
    }
  }, [userData, post]);
  if (!isAuthor) return <AuthLoading />;
  return (
    <div className="w-full py-8 bg-black">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}

export default EditPost;
