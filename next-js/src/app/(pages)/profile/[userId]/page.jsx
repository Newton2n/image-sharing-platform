import service from "@/lib/appwrite/config";
import { Container, PostCard, LogInBtn } from "@/components/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import ProfileActionButtons from "@/components/ui/profile-action-buttons";
import Link from "next/link";
async function Profile({ params }) {
  const { userId } = await params;
  console.log(userId);

  const [profileResponse, postsResponse] = await Promise.all([
    service.getProfileInformationQuery(userId),
    service.getPostsQuery(userId),
  ]);
  console.log(profileResponse, postsResponse);
  const accountDetails = profileResponse?.rows[0];
  const userPost = postsResponse?.rows || [];
  const profileImgUrl = await service.fileView(accountDetails?.profileImageId);
  console.log(profileImgUrl);
  console.log(accountDetails);

  if (!accountDetails)
    return (
      <div className="py-30 flex w-full justify-center ">
        <LogInBtn />
      </div>
    ); // show only this when no account details

  return (
    <div className="min-h-screen  antialiased p-4 sm:p-8 dark:bg-black">
      <div className="max-w-6xl mx-auto bg-white dark:bg-black rounded-3xl overflow-hidden">
        <div className="h-24 sm:h-32 bg-cover bg-center bg-black dark:bg-gray-500"></div>

        <div className="p-4 -mt-16 sm:-mt-12 text-center">
          {profileImgUrl && (
            <Image
              src={profileImgUrl}
              alt={"Profile Image"}
              height={100}
              width={100}
              className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full object-cover border-4 border-white shadow-lg"
            />
          )}

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
            {accountDetails?.fullName}
          </h1>
          <p className="text-gray-500 text-sm mt-1 mb-3 dark:text-gray-100">
            {accountDetails?.userName}
          </p>

          <p className="text-gray-700 dark:text-white max-w-lg mx-auto mb-4 px-2">
            {accountDetails?.about}
          </p>
          <ProfileActionButtons />
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
      </div>
    </div>
  );
}

export default Profile;
