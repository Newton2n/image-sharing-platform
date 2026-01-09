import Post from "@/components/Pages/Post";
import service from "@/lib/appwrite/config";
export async function generateMetadata({ params }) {
  const { postId } = await params;
  const postData = await service.getPost(postId);
  return {
    title: postData.title,
    description: postData.description,
  };
}
const page = () => {
  return <Post />;
};

export default page;
