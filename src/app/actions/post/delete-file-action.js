"use server";
import * as sdk from "node-appwrite";
import conf from "@/lib/conf/conf";
import { revalidatePath } from "next/cache";
const client = new sdk.Client()
  .setEndpoint(conf.appwriteUrl) //  API Endpoint
  .setProject(conf.appwriteProjectId) // project ID
  .setKey(process.env.APPWRITE_API_KEY); //secret api key

const storage = new sdk.Storage(client);
export async function deleteFileAction(featuredImg) {
  if (featuredImg) {
    try {
      await storage.deleteFile(conf.appwriteBucketId, featuredImg);
      revalidatePath("/");
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
