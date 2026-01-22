"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import service from "@/lib/appwrite/config";
import { useSelector } from "react-redux";
import { Edit3, Trash2, Loader2 } from "lucide-react";
import { Popup } from ".."; 

function EditDeleteButton({ post }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post?.userId === userData?.$id : false;

  if (!isAuthor) return null;

  const handleEdit = () => {
    router.push(`/edit-post/${post?.$id}`);
  };

  const handleDeleteClick = () => {
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    setShowPopup(false);
    setIsDeleting(true);
    try {
      // First delete the image from Appwrite storage
      await service.deleteFile(post?.featuredImg);
      // Then delete the post document
      await service.deletePost(post?.$id);
      router.replace("/");
    } catch (error) {
      console.error("Delete failed:", error);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 w-full mt-4">
        {/* Edit Button */}
        <button
          onClick={handleEdit}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-bold text-xs sm:text-sm rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all active:scale-95 border border-transparent dark:border-zinc-800 cursor-pointer"
        >
          <Edit3 size={16} />
          <span>Edit </span>
        </button>

        {/* Delete Button */}
        <button
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-500/10 text-red-500 font-bold text-xs sm:text-sm rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          {isDeleting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Trash2 size={16} />
          )}
          <span>{isDeleting ? "Deleting..." : "Delete"}</span>
        </button>
      </div>

      {/* Integrated Your Custom Popup */}
      <Popup
        isOpen={showPopup}
        title="Delete Post"
        message="This action cannot be undone. This will permanently remove the post and the associated image."
        confirmText="Delete Now"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setShowPopup(false)}
      />
      
      {/* Optional: Simple Backdrop for the Popup if your Popup component doesn't have one */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity" />
      )}
    </>
  );
}

export default EditDeleteButton;