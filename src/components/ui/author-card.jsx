import React from "react";
import Link from "next/link";
import AuthorPicture from "./author-picture";
import service from "@/lib/appwrite/config";

async function AuthorCard({ post = null }) {
  if (!post) return null;
  
  const authorInformation = await service.getProfileInformationQuery(post.userId);
  const fullName = authorInformation?.rows[0]?.fullName || "Author";

  return (
    <aside
      className="
        group relative w-full max-w-[280px] overflow-hidden
        rounded-[1.5rem] p-[1px]
        bg-gradient-to-b from-zinc-200 to-transparent dark:from-white/10 dark:to-transparent
        transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.15)]
      "
    >
      {/* The Actual Card Body */}
      <div className="
        relative h-full w-full rounded-[1.5rem] 
        bg-white dark:bg-zinc-950 
        p-5 transition-colors duration-300
      ">
        {/* Decorative Background Mesh */}
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-red-500/10 blur-[50px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Header Section */}
        <div className="flex items-center gap-3.5">
          <Link href={`/profile/${post?.userId}`} className="relative shrink-0">
            <div className="
              relative h-11 w-11 overflow-hidden rounded-full 
              ring-2 ring-zinc-100 dark:ring-zinc-800 
              transition-all duration-300 group-hover:ring-red-500/30
            ">
              <AuthorPicture
                userId={post?.userId}
                className="h-full w-full object-cover"
              />
            </div>
          </Link>
          
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-600 dark:text-red-500">
              Postor
            </span>
            <p className="truncate text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {fullName}
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-6">
          <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Profile Information
          </p>
          <h3 className="mt-1 truncate text-base font-bold text-zinc-800 dark:text-zinc-200">
            {fullName}
          </h3>

          <Link
            href={`/profile/${post?.userId}`}
            className="
              mt-5 flex items-center justify-between
              rounded-xl border border-zinc-200 dark:border-zinc-800
              bg-zinc-50 dark:bg-zinc-900/50
              px-4 py-2.5 text-[11px] font-bold text-zinc-600 dark:text-zinc-400
              transition-all duration-200
              hover:border-red-500/40 hover:bg-red-50/50 dark:hover:bg-red-500/5 dark:hover:text-zinc-100
            "
          >
            <span>VIEW PROFILE</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default AuthorCard;