import { Container } from "@/components/index";
import service from "@/lib/appwrite/config";
import parse from "html-react-parser";
import Image from "next/image";
import EditDeleteButton from "@/components/ui/edit-delete-button";
import AuthorPicture from "@/components/ui/author-picture";
import Link from "next/link";
//meta data
export async function generateMetadata({ params }) {
  const { postId } = await params;
  const postData = await service.getPost(postId);
  if (!postData) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }
  return {
    title: postData?.title,
    description: postData?.description,
  };
}

//main page
export default async function Page({ params }) {
  const { postId } = await params;
  const post = await service.getPost(postId);
  const imgUrl = await service.fileView(post?.featuredImg);

  if (post) {
    return (
      <>
        {" "}
        <Container>
          <div className="w-full py-10 px-10 flex max-sm:flex-col dark:bg-black">
            <div className="relative w-full md:w-2/3 mb-6 md:mb-0 mr-8">
              {imgUrl && (
                <Image
                  src={imgUrl}
                  alt={post?.title}
                  height={500}
                  width={500}
                  quality={100}
                  className="rounded-xl w-full h-auto object-cover border"
                />
              )}
              {/* Author Profile picture and
              
              */}
              <Link href={`/profile/${post?.userId}`}>
                <AuthorPicture
                  userId={post?.userId}
                  className={
                    "h-3 w-3 min-[200px]:h-5 min-[200px]:w-5 min-[300px]:h-9 min-[300px]:w-9 sm:w-13 sm:h-13 md:w-15 md:h-15 absolute top-2 left-2 min-[300px]:top-4 min-[300px]:left-4 cursor-pointer rounded-full inset-shadow-sm"
                  }
                />
              </Link>
              {/* Edit/Delete Buttons only for author */}
              <EditDeleteButton post={post} />{" "}
            </div>
            <div className="w-1/3 mb-6 ">
              <div className="flex flex-col ">
                <span className="font-extrabold  text-gray-300">Title</span>
                <h1 className="text-2xl  dark:text-gray-100">{post?.title}</h1>
                <p className=" bg-gray-400 my-3 w-full h-[1.5px]"></p>
              </div>
              <div className="text-xl dark:bg-gray-600 p-1 rounded">
                <span className="font-bold  text-gray-300 mb-2">
                  Description
                </span>
                {/* parse content of tinymce*/}
                {parse(post?.content)}
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  } else {
    return null;
  }
}
