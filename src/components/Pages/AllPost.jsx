import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../index";
import service from "../../../appwrite/config";
function AllPost() {
  
  const [posts, setPosts] = useState();

  useEffect(() => {
    service.getPosts().then((posts) => {
   
      if (posts) {
        setPosts(posts.rows);
      }
    });
  }, []);
  if(posts?.length ===0 ||posts===undefined){
   return (
         <div className="w-full py-8 mt-4 text-center">
           <Container>
             <div className="flex flex-wrap">
               <div className="p-2 w-full">
                 <h1 className="text-2xl font-bold hover:text-gray-500">
                  You Have No Post || Make Your First Post 
                 </h1>
               </div>
             </div>
           </Container>
         </div>
       )
}else{
  return (
    <div className="mt-2 mb-2">
      <Container>
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {posts &&posts.map((post) => (
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
export default AllPost;
