import download from "../icons/downloadIcon.png";
import service from "../../appwrite/config";
function DownloadBtn({ featuredImg }) {
  return (
    <button
      className="cursor-pointer"
      
    >
      <img onClick={(e) => {
        e.preventDefault();
        service.fileDownload(featuredImg);
      }}
        className="w-5 hover:bg-gray-200 rounded"
        src={download}
        alt="download-button"
      />
    </button>
  );
}

export default DownloadBtn;
