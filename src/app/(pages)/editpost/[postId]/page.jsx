import EditPost from "@/components/Pages/EditPost";
import React from "react";
import service from "@/lib/appwrite/config";
export async function generateMetadata({ params }) {
  const { postId } = await params;
  const postInformation = await service.getPost(postId);
  return {
    title: `Editing ${postInformation?.title || "No post"}`,
  };
}
const page = () => {
  return <EditPost />;
};

export default page;
