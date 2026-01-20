import React from "react";
import parse from "html-react-parser";

function PostContent({ content }) {
  if (!content) return null;

  return (
    <main className="w-full max-w-[820px] mx-auto mt-2 px-4 mb-2">
      <article
        className="
          relative
          bg-white dark:bg-zinc-950/50 
          backdrop-blur-sm
          rounded-[2.5rem]
          border border-zinc-200/60 dark:border-white/[0.05]
          shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.4)]
          px-6 py-8
          
          overflow-hidden
        "
      >
        {/* Subtle decorative glow for continuity */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[80px] pointer-events-none" />

        <div
          className="
            prose prose-zinc max-w-none
            dark:prose-invert
            prose-p:text-zinc-600 dark:prose-p:text-zinc-400
            prose-p:leading-[1.8] prose-p:text-[1.05rem]
            prose-headings:font-black prose-headings:tracking-tight 
            prose-headings:text-zinc-900 dark:prose-headings:text-white
            prose-a:text-red-500 prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-red-500 prose-blockquote:bg-red-500/[0.03]
            prose-blockquote:py-2 prose-blockquote:rounded-r-xl
            prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100
            prose-img:rounded-3xl prose-img:shadow-lg
          "
        >
          {parse(content)}
        </div>
      </article>
    </main>
  );
}

export default PostContent;
