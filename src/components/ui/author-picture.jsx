import service from "@/lib/appwrite/config";
import Image from "next/image";
async function AuthorPicture({ userId, className }) {
  //author profile response
  const authorInformation = await service.getProfileInformationQuery(userId);

  //author profile picture response
  const authorProfileImgUrlResponse = await service.fileView(
    authorInformation.rows[0].profileImageId
  );

  //final img url
  const authorProfileImgUrl = authorInformation.rows[0].profileImageId
    ? authorProfileImgUrlResponse
    : "/image/initial-profile-pic2.webp";

  return (
    <span
      className={`${className} relative rounded-full overflow-hidden shadow-xl/30 `}
    >
      <Image
        src={authorProfileImgUrl}
        height={100}
        width={100}
        alt="profilePic"
        className="object-cover h-full w-full  "
      />
    </span>
  );
}

export default AuthorPicture;
