import React from "react";

function PostTitle({
  title,
  readTime = "5 min read",
  badge = "Featured",
}) {
  if (!title) return null;

  return (
    <header
      className="
        w-full max-w-[720px] 
        rounded-3xl
        bg-zinc-50 dark:bg-zinc-950
        border border-zinc-200 dark:border-white/[0.05]
        shadow-sm
        px-6 py-8
        md:px-10 md:py-10
        transition-all duration-300
      "
    >
      {/* Meta Information */}
      <div className="flex items-center gap-3 mb-4">
        <span className="
          px-2.5 py-1 rounded-md
          text-[10px] font-bold uppercase tracking-widest
          bg-red-500/10 text-red-600 
          dark:bg-red-500/20 dark:text-red-400
          border border-red-500/20
        ">
          {badge}
        </span>
        
        <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" aria-hidden="true" />
        
        <span className="text-[11px] md:text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-tight">
          {readTime}
        </span>
      </div>

      {/* Title - Scaled down for high-end UI feel */}
      <h1 className="
        text-2xl md:text-4xl 
        font-black tracking-tight leading-[1.2]
        text-zinc-900 dark:text-zinc-100
      ">
        {title}
      </h1>

      {/* Red Accent Line */}
      <div className="mt-6 h-1 w-8 rounded-full bg-red-500/40 dark:bg-red-500/60" />
    </header>
  );
}

export default PostTitle;