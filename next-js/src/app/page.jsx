import { Container, PostCard } from "@/components/index";
import service from "@/lib/appwrite/config";

async function Home() {
  const allPostResponse = await service.getPosts();
  const allPost = allPostResponse?.rows || [];
  return (
    <div className="px-2 py-1 min-h-screen dark:bg-black">
      <Container>
        <div className="columns-2 sm:columns-4 lg:columns-5 xl:columns-6 ">
          {allPost?.map((post) => (
            <div
              key={post.$id}
              className=" break-inside-avoid transition-transform hover:scale-[1.02] "
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
    
  );
}

export default Home;
