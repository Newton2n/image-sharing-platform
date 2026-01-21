import Link from "next/link";
import { ImageDownloadBtn } from "../index";
import Image from "next/image";

async function PostCard({ $id, title, imgUrl, authorAvatar ,featuredImg}) {


  return (
    <div>
    <Link href={`/post/${$id}`}>
      <div className="w-full  bg-white dark:bg-black rounded-3xl  ">
        <div className="w-full relative mb-2 flex flex-col group">
          <div className="absolute top-2 right-0.5 flex justify-end pb-2 pr-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200 z-50">
            <ImageDownloadBtn featuredImg={featuredImg} />
          </div>

          {imgUrl && (
            <Image
              src={imgUrl}
              alt={title}
              width={400}
              height={600}
              sizes="(max-width: 199px) 100vw,
                     (max-width: 439px) 50vw,
                      (max-width: 639px) 33vw,
                      (max-width: 1023px) 25vw,
                     (max-width: 1279px) 20vw,
                      (max-width: 1535px) 16vw,
                      11vw"
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
        <div className=" mb-2 ml-1 md:ml-2 overflow-hidden ">
          <h2 className="text-[10px] min-[300px]:text-xs min-[500px]:text-[13px]  truncate   dark:text-white">
            {title}{" "}
          </h2>
        </div>
      </div>
    </Link>
    </div>
  );
}

export default PostCard;
