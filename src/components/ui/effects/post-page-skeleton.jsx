import React from 'react';

const PostPageSkeleton = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-10 flex flex-col md:flex-row bg-white dark:bg-black animate-pulse transition-colors duration-300">
      {/* Left Column: Image Skeleton */}
      <div className="relative w-full md:w-2/3 mb-6 md:mb-0 md:mr-8">
        {/* Main image box - matches the rounded-xl and border of your original code */}
        <div className="rounded-xl w-full aspect-video bg-gray-200 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700"></div>
        
        {/* Mock Edit/Delete Buttons - Absolute positioned like your EditDeleteButton component */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <div className="h-9 w-20 bg-gray-300 dark:bg-zinc-700 rounded-lg shadow-sm"></div>
          <div className="h-9 w-20 bg-gray-300 dark:bg-zinc-700 rounded-lg shadow-sm"></div>
        </div>
      </div>

      {/* Right Column: Content Skeleton */}
      <div className="w-full md:w-1/3">
        {/* Title Section Placeholder */}
        <div className="flex flex-col mb-6">
          {/* "Title" Label */}
          <div className="h-4 w-12 bg-gray-200 dark:bg-zinc-800 rounded mb-2"></div>
          {/* Actual Title Text line */}
          <div className="h-8 w-5/6 bg-gray-300 dark:bg-zinc-700 rounded mb-3"></div>
          {/* Divider Line */}
          <div className="h-[1.5px] w-full bg-gray-200 dark:bg-zinc-800 my-3"></div>
        </div>

        {/* Description Section Placeholder */}
        <div className="bg-transparent dark:bg-zinc-900/50 p-4 rounded-lg border border-transparent dark:border-zinc-800">
          {/* "Description" Label */}
          <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded mb-5"></div>
        
        </div>
      </div>
    </div>
  );
};

export default PostPageSkeleton;