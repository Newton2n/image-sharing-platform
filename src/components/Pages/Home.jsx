import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../index";
import service from "../../../appwrite/config";
import { useSelector } from "react-redux";
function Home() {
  const [posts, setPosts] = useState([]);
  const userActive = useSelector((state) => state.auth);
  
  useEffect(() => {
    service.getPosts().then((posts) => (posts ? setPosts(posts.rows) : []));
  }, []);
  
  if (!userActive.activeStatus) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap ">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  } else if (posts.length === 0 ?? userActive.activeStatus  ) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                No Post || Make Your First Post
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  } else if (userActive.activeStatus && posts.length > 0) {
    return (
      <div className="mt-2 mb-2">
        <Container>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {posts.map((post) => (
              <div key={post.$id} className="mb-4 break-inside-avoid ">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>


    );
  }
}

export default Home;
