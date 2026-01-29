"use server";
import service from "@/lib/appwrite/config";

export async function deletePostAction(postId = "", featuredImg = "") {
  // 1. delete storage file
  await service.deleteFile(featuredImg);

  // 2. delete post
  await service.deletePost(postId);
}
