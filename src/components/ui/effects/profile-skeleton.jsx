import React from "react";
import SkeletonEffect from "@/components/ui//effects/SkeletonEffect"; 

const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen antialiased p-4 sm:p-8 animate-pulse dark:bg-black">
      <div className="max-w-6xl mx-auto bg-white dark:bg-black rounded-3xl overflow-hidden">
        
        {/* 1. Banner Skeleton */}
        <div className="h-24 sm:h-32 bg-gray-200 dark:bg-zinc-900"></div>

        {/* 2. Profile Info Skeleton */}
        <div className="p-4 -mt-16 sm:-mt-12 text-center">
          {/* Avatar */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-gray-300 dark:bg-zinc-800 border-4 border-white dark:border-black shadow-lg" />

          {/* Name & Username */}
          <div className="h-8 w-48 bg-gray-300 dark:bg-zinc-800 mx-auto mt-4 rounded-md" />
          <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-900 mx-auto mt-3 mb-4 rounded-md" />

          {/* Bio Lines */}
          <div className="max-w-lg mx-auto space-y-2 px-2 mb-6">
            <div className="h-3 bg-gray-200 dark:bg-zinc-900 rounded-md w-full" />
            <div className="h-3 bg-gray-200 dark:bg-zinc-900 rounded-md w-3/4 mx-auto" />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3">
            <div className="h-10 w-28 bg-gray-200 dark:bg-zinc-800 rounded-full" />
            <div className="h-10 w-28 bg-gray-200 dark:bg-zinc-800 rounded-full" />
          </div>
        </div>

        {/* 3. Tab Bar Skeleton */}
        <div className="flex justify-center border-t border-gray-100 dark:border-zinc-800 py-4 px-4 sticky top-0 bg-white dark:bg-black z-10">
          <div className="h-10 w-40 bg-gray-200 dark:bg-zinc-800 rounded-full" />
        </div>

        {/* 4. Your Post Skeleton Component */}
        <div className="p-2">
            <SkeletonEffect count={12} />
        </div>
        
      </div>
    </div>
  );
};

export default ProfileSkeleton;