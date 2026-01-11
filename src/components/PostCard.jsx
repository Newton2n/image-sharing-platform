"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import service from "@/lib/appwrite/config";
import { DownloadBtn } from "../components/index";
import Image from "next/image";

function PostCard({ $id, title, featuredImg, authorAvatar }) {
  const [imgUrl, setImgUrl] = useState();

  useEffect(() => {
    let isMounted = true;
    service.fileView(featuredImg).then((url) => {
      if (isMounted) setImgUrl(url);
    });
    return () => {
      isMounted = false;
    };
  }, [featuredImg]);

  return (
    <Link href={`/post/${$id}`}>
      <div className="w-full  bg-white dark:bg-black rounded-3xl  ">
        <div className="w-full relative mb-2 flex flex-col">
          <div className="flex justify-end pb-2 pr-4 ">
            <DownloadBtn featuredImg={featuredImg} />
          </div>

          {imgUrl && (
            <Image
              src={imgUrl}
              alt={title}
              height={400}
              width={200}
              loading="eager"
              className="rounded-2xl shadow-md dark:shadow dark:shadow-white/50  hover:opacity-50"
            />
          )}
          <div className="w-full absolute bottom-3 right-0  ">
            <span className="flex ml-2 w-4 h-4  rounded-full overflow-hidden ">
              {/*Author picture component */}
              {authorAvatar}
            </span>
          </div>
        </div>
        <div className="w-20 min-[240px]:w-28 min-[440px]:w-35 md:w-40 mb-1 ml-1 md:ml-2 overflow-hidden ">
          <h2 className="text-[13px] truncate   dark:text-white">{title} </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
