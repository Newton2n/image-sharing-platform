"use client"
import React, { useEffect, useState } from "react";
import { Container, Button, PostCard } from "../index";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import service from "@/lib/appwrite/config";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import Image from "next/image";


function Post() {
  const router = useRouter();
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [imgUrl, setImgUrl] = useState();

  const userData = useSelector((state) => state.auth.userData);
  console.log(userData)
  const isAuthor = post && userData ? post.userId === userData?.$id : false;

  useEffect(() => {
    if (postId) {
      service.getPost(postId).then((post) => {
        if (post) {
          setPost(post);
          service.fileView(post.featuredImg).then((url) => setImgUrl(url));
        }
      });
    }
  }, [postId, router]);

  const deletePost = async () => {
    await service.deleteFile(post?.featuredImg);
    await service.deletePost(post?.$id);
    router.replace("/");
  };
  const editPostBtn = () => {
    router.push(`/editpost/${post?.$id}`);
  };

  if (post) {
    return (
      <Container>
        <div className="w-full py-10 px-10 flex max-sm:flex-col dark:bg-black">
          <div className="relative w-full md:w-2/3 mb-6 md:mb-0 mr-8">
            <Image
              src={imgUrl}
              alt={post.title}
              height={500}
              width={500}
              quality={100}
              className="rounded-xl w-full h-auto object-cover border"
            />

            {/* Edit/Delete Buttons - Absolute positioning for flexibility */}
            {isAuthor && (
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
            )}
          </div>
          <div className="w-1/3 mb-6 ">
            <div className="flex flex-col ">
              <span className="font-extrabold  text-gray-300">Title</span>
              <h1 className="text-2xl  dark:text-gray-100">{post.title}</h1>
              <p className=" bg-gray-400 my-3 w-full h-[1.5px]"></p>
            </div>
            <div className="text-xl dark:bg-gray-600 p-1 rounded">
              <span className="font-bold  text-gray-300 mb-2">Description</span>
              {parse(post?.content)}
            </div>
          </div>
        </div>
      </Container>
    );
  } else {
    null;
  }
}

export default Post;
