"use server";
import { createAdminClient } from "@/lib/appwrite/server.config";
import conf from "@/lib/conf/conf";
import { revalidatePath } from "next/cache";
export async function deleteFileAction(featuredImg) {
  if (!featuredImg) {
    return { success: false, error: "Missing required IDs" };
  }
  const { storage } = await createAdminClient();
  try {
    await storage.deleteFile({
      bucketId: conf.appwriteBucketId,
      fileId: featuredImg,
    });
    //  Revalidate cache
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
