import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleDown} from "@fortawesome/free-solid-svg-icons";
import service from "../../appwrite/config";
function DownloadBtn({ featuredImg }) {
 
  return (
    <button
      className="cursor-pointer"
      
    >
      <span onClick={(e) => {
        e.preventDefault();
        service.fileDownload(featuredImg);
      }}
        className="w-5 rounded"
        
        alt="download-button"
      > <FontAwesomeIcon icon={faCircleDown} title="Download" aria-label="Download" className="dark:text-white  dark:hover:text-gray-300 hover:text-gray-200" /> </span>
    </button>
  );
}

export default DownloadBtn;
