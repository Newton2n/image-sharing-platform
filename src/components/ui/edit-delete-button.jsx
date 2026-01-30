"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Edit3, Trash2, Loader2 } from "lucide-react";
import { Popup } from "..";
import { Button } from "..";
import { deletePostAction } from "@/app/actions/post/delete-post-action";
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

  const confirmDelete = async () => {
    setShowPopup(false);
    setIsDeleting(true);
    try {
      await deletePostAction(post?.$id, post?.featuredImg);
      router.replace("/");
    } catch (error) {
      throw error;
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 w-full mt-4">
        {/* Edit Button */}
        <Button
          onClick={handleEdit}
          disabled={isDeleting}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-bold text-xs sm:text-sm rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all active:scale-95 border border-transparent dark:border-zinc-800 ${isDeleting ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          <Edit3 size={16} />
          <span>Edit </span>
        </Button>

        {/* Delete Button */}
        <Button
          onClick={() => setShowPopup(true)}
          disabled={isDeleting}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-500/10 text-red-500 font-bold text-xs sm:text-sm rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-95 ${isDeleting ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
        >
          {isDeleting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Trash2 size={16} />
          )}
          <span>{isDeleting ? "Deleting..." : "Delete"}</span>
        </Button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity" />
      )}

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
    </>
  );
}

export default EditDeleteButton;
