import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import service from "../../appwrite/config";
import {  DownloadBtn } from "../components/index";

function PostCard({ $id, title, featuredImg }) {
  const [imgUrl, setImgUrl] = useState();

  useEffect(() => {
    service.fileView(featuredImg, title).then((url) => setImgUrl(url));
  }, []);



  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white dark:bg-black rounded-3xl  flex-col flex items-center ">
        <div className="w-full mb-2 flex flex-col">
          <div className="flex justify-end pb-2 pr-4 ">
          <DownloadBtn featuredImg={featuredImg} title={title} />
          </div>
          <img
            src={imgUrl}
            className="rounded-2xl shadow-md hover:opacity-50

"
          />
        </div>
        <h2 className="text-[13px]  pb-1 dark:text-white">{title} </h2>
      </div>
    </Link>
  );
}

export default PostCard;
