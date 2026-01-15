import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import { ArrowDownToLine } from "lucide-react";
import service from "@/lib/appwrite/config";
import { Button } from "..";
function DownloadBtn({ featuredImg }) {
  return (
    <button
      className=" bg-white hover:bg-gray-200 p-1  min-[300px]:p-1.5 min-[500px]:p-2  rounded-md cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        service.fileDownload(featuredImg);
      }}
    >
      <ArrowDownToLine color={"black"} size={12} />
    </button>
  );
}

export default DownloadBtn;
