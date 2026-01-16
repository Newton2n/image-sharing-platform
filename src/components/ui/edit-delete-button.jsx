"use client";
import React from "react";
import { useRouter } from "next/navigation";
import service from "@/lib/appwrite/config";
import { useSelector } from "react-redux";
import { Button } from "..";
function EditDeleteButton({ post }) {
  const router = useRouter();
  const editPostBtn = () => {
    router.push(`/edit-post/${post?.$id}`);
  };

  const deletePost = async () => {
    if (!post) return;
    await service.deleteFile(post?.featuredImg);
    await service.deletePost(post?.$id);
    router.replace("/");
  };
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post?.userId === userData?.$id : false;
  if (!isAuthor) return;
  
  return (
    <div className="absolute top-4 right-4 flex space-x-1 p-1 rounded-lg shadow-md">
      <Button
        className="px-3 py-1 text-sm"
        bgColor="bg-green-500 hover:bg-green-600 transition"
        onClick={editPostBtn}
      >
        Edit
      </Button>

      <Button
        className="px-3 py-1 text-sm"
        bgColor="bg-red-500 hover:bg-red-600 transition"
        onClick={deletePost}
      >
        Delete
      </Button>
    </div>
  );
}

export default EditDeleteButton;
