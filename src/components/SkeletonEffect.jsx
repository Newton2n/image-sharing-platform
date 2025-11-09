import React from "react";
import { Container } from "./index";

function SkeletonCard() {
  return (
    <div className="break-inside-avoid rounded-md p-1">
      <div className="flex flex-col animate-pulse">
        <div className="w-full h-32 rounded bg-gray-200 dark:bg-gray-800"></div>
        <div className="mt-3 space-y-2">
          <div className="h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-800"></div>
          <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-800"></div>
        </div>
      </div>
    </div>
  );
}

export default function SkeletonEffect({ count = 16 }) {
  return (
    <Container>
      <div className="w-full dark:bg-black p-4 columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-3">
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </Container>
  );
}
