import service from "@/lib/appwrite/config";
import { Container, PostCard } from "@/components/index";
import AuthorPicture from "@/components/ui/author-picture";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import ProfileActionButtons from "@/components/ui/profile-action-buttons";

export async function generateMetadata({ params }) {
  const { userId } = await params;
  const profileResponse = await service.getProfileInformationQuery(userId);
  const accountDetails = profileResponse.rows[0];
  return {
    title: `${accountDetails?.userName || accountDetails?.fullName}`,
    description: `View ${
      accountDetails?.userName || accountDetails?.fullName
    }'s posts and activity on Postora`,
  };
}

async function Profile({ params }) {
  const { userId } = await params;

  const [profileResponse, postsResponse] = await Promise.all([
    service.getProfileInformationQuery(userId),
    service.getPostsQuery(userId),
  ]); //owner profile details and post response 

  const accountDetails = profileResponse?.rows[0]; //owner profile details
  
  const userPost = postsResponse?.rows || []; //owner post details
  const profileImgUrl =
    accountDetails?.profileImageId &&
    (await service.fileView(accountDetails?.profileImageId)); //owner profile avatar url

  if (!accountDetails)
    return (
      <div className="py-30 flex w-full justify-center bg-white dark:bg-black flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white  mb-2">
          Profile Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          The profile you're looking for doesn't exist.
        </p>
      </div>
    );
  return (
    <div className="min-h-screen  antialiased p-4 sm:p-8 dark:bg-black">
      <div className="max-w-6xl mx-auto bg-white dark:bg-black rounded-3xl overflow-hidden">
        <div className="h-24 sm:h-32 bg-cover bg-center bg-black dark:bg-gray-500"></div>

        <div className="p-4 -mt-16 sm:-mt-12 text-center">
          <Image
            src={
              profileImgUrl && typeof profileImgUrl === "string"
                ? profileImgUrl
                : "/image/initial-profile-pic2.webp"
            }
            alt={"Profile Image"}
            height={100}
            width={100}
            className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full object-cover border-4 border-white shadow-lg"
          />

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
            {accountDetails?.fullName}
          </h1>
          <p className="text-gray-500 text-sm mt-1 mb-3 dark:text-gray-100">
            {accountDetails?.userName}
          </p>

          <p className="text-gray-700 dark:text-white max-w-lg mx-auto mb-4 px-2">
            {accountDetails?.about}
          </p>
          <ProfileActionButtons postUserId={userId}/>
        </div>

        <div className="flex justify-center border-t  border-gray-100 dark:border-gray-700 py-4 px-4 sticky top-0 bg-white dark:bg-black z-10 ">
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all bg-gray-800 text-white ">
              <FontAwesomeIcon icon={faBorderAll} />
              <span>{`${accountDetails.fullName}'s post` }</span>
              <span className="text-[13px] ml-1 opacity-75">
                ({userPost?.length})
              </span>
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          <div className="m-2">
            <Container>
              <div className="columns-1 min-[200px]:columns-2 min-[440px]:columns-3 sm:columns-4 lg:columns-5 xl:columns-6 2xl:columns-9">
                {userPost?.map((post) => (
                  <div
                    key={post.$id}
                    className="mb-4 break-inside-avoid transition-transform hover:scale-[1.02] "
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
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
