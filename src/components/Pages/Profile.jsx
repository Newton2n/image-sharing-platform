"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "@/lib/appwrite/config";
import { Container, PostCard, SkeletonEffect } from "../index";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faBorderAll } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";
import Image from "next/image";

 function Profile() {

  const [userData, setUserData] = useState();
  const [userPost, setUserPost] = useState();
  const [loading, setLoading] = useState(true);
  const [accountDetails, setAccountDetails] = useState();
  const [profileImgUrl, setProfileImgUrl] = useState();
  const user = useParams();
  const getUserData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!getUserData) return;

    setUserData(getUserData);

    service
      .getPostsQuery(getUserData.$id)
      .then((posts) => setUserPost(posts?.rows))
      .catch((err) => console.log("error getting post", err))
      .finally(() => setLoading(false));
  }, [getUserData]);

  // Step 1: Get account details ONLY when userData is ready
  useEffect(() => {
    if (!userData?.$id) return;

    service
      .getProfileInformationQuery(userData.$id)
      .then((data) => setAccountDetails(data.rows[0]))
      .catch((err) => console.log("error getting profile info", err));
  }, [userData]);

  // Step 2: Load image ONLY when accountDetails is ready
  useEffect(() => {
    if (!accountDetails?.profileImageId) return;

    service
      .fileView(accountDetails?.profileImageId)
      .then((url) => setProfileImgUrl(url))
      .catch((err) => console.log("error loading profile img", err));
  }, [accountDetails]);

  return (
    <div className="min-h-screen  antialiased p-4 sm:p-8 dark:bg-black">
      <div className="max-w-6xl mx-auto bg-white dark:bg-black rounded-3xl overflow-hidden">
        <div className="h-24 sm:h-32 bg-cover bg-center bg-black dark:bg-gray-500"></div>

        <div className="p-4 -mt-16 sm:-mt-12 text-center">
         {profileImgUrl && <Image
            src={profileImgUrl}
            alt={"Profile Image"}
            height={100}
            width={100}
            className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full object-cover border-4 border-white shadow-lg"
          />}

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
            {accountDetails?.fullName}
          </h1>
          <p className="text-gray-500 text-sm mt-1 mb-3 dark:text-gray-100">
            {accountDetails?.userName}
          </p>

          <p className="text-gray-700 dark:text-white max-w-lg mx-auto mb-4 px-2">
            {accountDetails?.about}
          </p>

          <div className="flex justify-center space-x-3 mb-8">
            {userData && (
              <Link href={"/editprofile"}>
                <button className="cursor-pointer px-6 py-3 bg-gray-100 text-gray-800 font-bold rounded-full hover:bg-gray-200 transition duration-150 shadow-md">
                  Edit Profile
                </button>
              </Link>
            )}
            {!userData && (
              <button className="px-6 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition duration-150 shadow-lg">
                Follow
              </button>
            )}

            <button className="p-3 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition duration-150 shadow-md ">
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
          </div>
        </div>

        <div className="flex justify-center border-t  border-gray-100 dark:border-gray-700 py-4 px-4 sticky top-0 bg-white dark:bg-black z-10 ">
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all bg-gray-800 text-white ">
              <FontAwesomeIcon icon={faBorderAll} />
              <span>Your Post</span>
              <span className="text-[13px] ml-1 opacity-75">
                ({userPost?.length})
              </span>
            </button>
          </div>
        </div>

        {loading ? (
          <SkeletonEffect count={10} />
        ) : (
          <div className="p-4 sm:p-6 md:p-8">
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
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
