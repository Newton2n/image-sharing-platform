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
  const authorProfileImgUrl = authorInformation?.rows[0]?.profileImageId
    ? authorProfileImgUrlResponse
    : "/image/initial-profile-pic2.webp";

  return (
    <span
      className={`${className}  rounded-full overflow-hidden  `}
    >
      <Image
        src={authorProfileImgUrl}
        fill
        alt={`${authorInformation?.rows[0]?.fullName} profile picture`}
        className="object-cover"
      />
    </span>
  );
}

export default AuthorPicture;
