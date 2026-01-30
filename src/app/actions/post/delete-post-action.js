"use server";
import { createAdminClient } from "@/lib/appwrite/server.config";
import conf from "@/lib/conf/conf";
import { revalidatePath } from "next/cache";
export async function deletePostAction(rowId, featuredImgId) {
  if (!rowId || !featuredImgId) {
    return { success: false, error: "Missing required IDs" };
  }
  const { tables, storage } = await createAdminClient();
  try {
    await storage.deleteFile({
      bucketId: conf.appwriteBucketId,
      fileId: featuredImgId,
    });

    await tables.deleteRow({
      databaseId: conf.appwriteDatabaseId,
      tableId: conf.appwriteTableId,
      rowId: rowId,
    });
    //  Revalidate cache
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    throw error;
  }
}
