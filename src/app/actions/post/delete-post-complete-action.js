"use server";
import { createAdminClient } from "@/lib/appwrite/server.config";
import conf from "@/lib/conf/conf";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deletePostCompleteAction(rowId, featuredImg) {
  if (!rowId) redirect("/"); // early exit

  const { storage, tables } = await createAdminClient();

  // 1. Delete file if it exists
  if (featuredImg) {
    try {
      await storage.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId: featuredImg,
      });
    } catch (err) {
      if (err.code !== 404) throw err; // ignore file not found
    }
  }

  // 2. Delete row
  try {
    await tables.deleteRow({
      databaseId: conf.appwriteDatabaseId,
      tableId: conf.appwriteTableId,
      rowId: rowId,
    });
  } catch (err) {
    if (err.code !== 404) throw err; // ignore row already deleted
  }

  // 3. Revalidate home page cache
  revalidatePath("/");

  // 4. Redirect safely away from deleted post
  redirect("/"); // stops any further render of /post/[id]
}
