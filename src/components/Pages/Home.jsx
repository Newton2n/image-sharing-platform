import React, { useEffect, useState } from "react";
import { Container, PostCard ,SkeletonEffect } from "../index";
import service from "../../../appwrite/config";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading,setLoading] = useState(true)
  const userActive = useSelector((state) => state.auth);

  useEffect(() => {
    if (userActive) {
      service.getPosts()
      .then((posts) => (posts ? setPosts(posts.rows) : []))
      .catch((err)=>console.log("error in loading post",err))
       .finally(()=> setLoading(false))
    }
  }, []);
  if(loading) return <SkeletonEffect count={22}/>
  if (!userActive.activeStatus) {
    return (
      <div className="w-full py-8  text-center dark:bg-black">
        <Container>
          <div className="flex flex-wrap ">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500  dark:text-gray-100">
                Login to read posts
              </h1>
            </div>
          </div>

        </Container>
      </div>
    );
  } else if (posts.length === 0 && userActive.activeStatus) {
    return (
      <div className="w-full py-8  text-center dark:bg-black">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500  dark:text-gray-100">
                No Post , Make Your First Post
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  } else if (userActive.activeStatus && posts.length > 0) {
    return (
      <div className="px-2 py-1 dark:bg-black">
        <Container>
          <div className="columns-2 sm:columns-4 lg:columns-5 xl:columns-6 ">
            {posts.map((post) => (
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
}

export default Home;
