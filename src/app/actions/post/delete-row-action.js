"use server";
import { createAdminClient } from "@/lib/appwrite/server.config";
import conf from "@/lib/conf/conf";
import { revalidatePath } from "next/cache";
export async function deleteRowAction(rowId) {
  if (!rowId) {
    return { success: false, error: "Missing required IDs" };
  }
  const { tables } = await createAdminClient();
  try {
    await tables.deleteRow(
      conf.appwriteDatabaseId,
      conf.appwriteTableId,
      rowId,
    );
    //  Revalidate cache
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    if (error.code === 404) {
      revalidatePath("/");
      return { success: true };
    }
    return { success: false, error: error.message };
  }
}

