import { Container, PostCard } from "@/components/index";
import AuthorPicture from "@/components/ui/author-picture";
import service from "@/lib/appwrite/config";
export const metadata = {
  title: "Home",
  description: "Explore Images from the world",
};
async function Page() {
  const allPostResponse = await service.getPosts(); //Fetching all post response

  const allPost = await Promise.all(
    (allPostResponse?.rows || []).map(async (post) => ({
      ...post,
      imgUrl: post?.featuredImg
        ? await service.fileView(post.featuredImg)
        : null,
    })),
  ); // all post with post image Url
  return (
    <div className="px-2 py-1 min-h-screen dark:bg-black">
      <Container>
        <main className="columns-1 min-[200px]:columns-2 min-[440px]:columns-3 sm:columns-4 lg:columns-5 xl:columns-6 2xl:columns-9">
          {allPost?.map((post) => (
            <div
              key={post.$id}
              className=" break-inside-avoid transition-transform hover:scale-[1.02] "
            >
              <PostCard
                {...post}
                authorAvatar={
                  <AuthorPicture
                    userId={post.userId}
                    className={"w-4 h-4 relative"}
                  />
                }
              />
            </div>
          ))}
        </main>
      </Container>
    </div>
  );
}

export default Page;
