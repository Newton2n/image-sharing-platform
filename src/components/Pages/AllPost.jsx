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
    <div className="m-2 ">
      <Container>
        <div className="columns-2 sm:columns-[200px] md:columns-[200px]  ">
          {posts &&posts.map((post) => (
            <div key={post.$id} className="mb-4 break-inside-avoid transition-transform hover:scale-[1.02]">
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
