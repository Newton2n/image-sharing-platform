"use client"
import { ArrowDownToLine } from "lucide-react";
import service from "@/lib/appwrite/config";
function ImageDownloadBtn({ featuredImg }) {
  return (
    <button
      className=" bg-red-500/50 hover:bg-red-700 p-1  min-[300px]:p-1.5 min-[500px]:p-2  rounded-md cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        service.fileDownload(featuredImg);
      }}
    >
      <ArrowDownToLine color={"white"} size={12} />
    </button>
  );
}

export default ImageDownloadBtn;
