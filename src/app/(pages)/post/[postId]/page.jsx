import Image from "next/image";
import service from "@/lib/appwrite/config";
import EditDeleteButton from "@/components/ui/edit-delete-button";
import AuthorCard from "@/components/ui/author-card";
import PostTitle from "@/components/ui/post-title";
import { ImageDownloadBtn } from "@/components";
import { ShieldCheck } from "lucide-react";
import PostContent from "@/components/ui/post-content";

export default async function Page({ params }) {
  const { postId } = await params;

  const post = await service.getPost(postId);
  const imgUrl = await service.fileView(post.featuredImg);

  if (!post) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 font-sans selection:bg-red-500 selection:text-white 2xl:text-[18px]">
      <main className="w-full max-w-[1920px] mx-auto p-4 sm:p-6 md:p-12 lg:p-16">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 xl:gap-20 items-start">
          {/* Left Column: Media Section */}
          <div className="w-full lg:w-[55%] xl:w-[60%]  lg:sticky lg:top-24">
            <div className="relative group   sm:rounded-[2.5rem] shadow-xl md:shadow-2xl transition-all duration-500 aspect-square sm:aspect-auto">
              {imgUrl && (
                <Image
                  src={imgUrl}
                  alt={post.title}
                  width={400}
                  height={400}
                  priority
                  className="w-full h-auto rounded-2xl "
                />
              )}
              <div className="absolute top-2 right-2 md:hidden">
                {" "}
                <EditDeleteButton post={post} />
              </div>
            </div>
          </div>

          {/* Right Column: Content & Actions */}
          <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col space-y-6 sm:space-y-10 px-1 sm:px-0">
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-zinc-200/60 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white ring-4 ring-white dark:ring-black">
                    <ShieldCheck size={14} />
                  </div>
                </div>
                <div>
                  <h2 className="text-[10px] font-black uppercase tracking-[.25em] text-red-500">
                    Verified Asset
                  </h2>
                  <p className="text-[10px] text-zinc-400 font-medium tracking-tight">
                    Appwrite Cloud Storage • ID: {post.$id.slice(0, 8)}
                  </p>
                </div>
              </div>
              <ImageDownloadBtn featuredImg={post?.featuredImg} />
            </div>

            <div className="space-y-3 sm:space-y-6">
              <PostTitle title={post?.title} />

              {/* Content parsed from Appwrite */}
              <PostContent content={post?.content} />
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-zinc-800">
              <div className="flex items-center justify-between p-3 sm:p-5 rounded-2xl bg-gray-50 dark:bg-zinc-900/40 border border-gray-100 dark:border-white/5">
                <AuthorCard post={post} />
              </div>
            </div>

            {/* Edit/Delete Actions for Author */}
            <div className="hidden md:block">
              {" "}
              <EditDeleteButton post={post} />
            </div>
          </div>
        </div>
      </main>
      {/* 3. Global Footer Style Subtle Detail */}
      <footer className="mt-20 py-10 text-center border-t border-zinc-200 dark:border-white/5">
        {" "}
        <p className="text-[11px] font-medium text-zinc-400 tracking-widest uppercase">
          End of Content
        </p>
      </footer>
    </div>
  );
}
