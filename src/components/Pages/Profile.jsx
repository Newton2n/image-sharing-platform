import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../../../appwrite/config";
import { Container, PostCard ,SkeletonEffect} from "../index";
function Profile() {
  const [userData, setUserData] = useState();
  const [userPost, setUserPost] = useState();
  const [loading,setLoading] =useState(true)
  const getUserData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (getUserData) setUserData(getUserData);
    service
      .getPostsQuery(getUserData?.$id)
      .then((posts) => setUserPost(posts?.rows))
      .catch((err)=> console.log("error i getting post",err))
      .finally(()=>setLoading(false))
  }, [getUserData]);

  return (
    <div className="min-h-screen  antialiased p-4 sm:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl overflow-hidden">
        <div
          className="h-24 sm:h-32 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170")',
          }}
        ></div>

        <div className="p-4 -mt-16 sm:-mt-12 text-center">
          <img
            src="https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074"
            alt=""
            className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full object-cover border-4 border-white shadow-lg"
          />

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3">
            {userData?.name}
          </h1>
          <p className="text-gray-500 text-sm mt-1 mb-3">@{userData?.name}</p>

          <p className="text-gray-700 max-w-lg mx-auto mb-4 px-2"></p>

          <div className="flex justify-center space-x-3 mb-8">
            {userData && (
              <button className="px-6 py-3 bg-gray-100 text-gray-800 font-bold rounded-full hover:bg-gray-200 transition duration-150 shadow-md">
                Edit Profile
              </button>
            )}
            {!userData && (
              <button className="px-6 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition duration-150 shadow-lg">
                Follow
              </button>
            )}

            <button className="p-3 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition duration-150 shadow-md ">
              <p className="font-bold space-y-4">. . .</p>
            </button>
          </div>
        </div>

        <div className="flex justify-center border-t border-gray-100 py-4 px-4 sticky top-0 bg-white z-10 ">
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all bg-gray-800 text-white ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
              <span>Your Post</span>
              <span className="text-[13px] ml-1 opacity-75">
                ({userPost?.length})
              </span>
            </button>
          </div>
        </div>

       {loading ?<SkeletonEffect count={10}/>:( <div className="p-4 sm:p-6 md:p-8">
          <div className="m-2">
            <Container>
              <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 ">
                {userPost?.map((post) => (
                  <div
                    key={post.$id}
                    className="mb-4 break-inside-avoid transition-transform hover:scale-[1.02] "
                  >
                    <PostCard {...post} />
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </div>)}
      </div>
    </div>
  );
}

export default Profile;
