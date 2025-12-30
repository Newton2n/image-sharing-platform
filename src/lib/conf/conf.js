// const conf = {
//     appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
//     appwriteProjectId :String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
//     appwriteDatabaseId :String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
//     appwriteTableId :String(import.meta.env.VITE_APPWRITE_TABLE_ID),
//     appwriteUsersProfileInformationTableId :(import.meta.env.VITE_APPWRITE_USERS_PROFILE_INFORMATION_TABLE_ID),
//     appwriteBucketId :String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
// };
// export default conf
const conf = {
    appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    appwriteTableId: String(process.env.NEXT_PUBLIC_APPWRITE_TABLE_ID),
    appwriteUsersProfileInformationTableId: String(process.env.NEXT_PUBLIC_APPWRITE_USERS_PROFILE_INFORMATION_TABLE_ID),
    appwriteBucketId: String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID)
};

export default conf;