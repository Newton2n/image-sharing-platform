"use client";
import dynamic from "next/dynamic";
const RTE = dynamic(() => import("../rich-text-editor"), { ssr: false });
import React, { useCallback, useEffect, useState } from "react";
import { Input, Button, Container } from "../index";
import { useSelector } from "react-redux";
import service from "@/lib/appwrite/config";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AuthLoading from "../ui/loading/auth-loading";
import ButtonLoader from "../ui/loading/button-loader";
import InputError from "../ui/error/input-error";
export default function PostForm({ post }) {
  const router = useRouter();
  const userData = useSelector((data) => data.auth.userData);
  const [isAuthor, setIsAuthor] = useState(false);
  const [imgUrl, setImgUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
    },
  });

  useEffect(() => {
    if (!post) return;
    service.fileView(post.featuredImg).then((url) => setImgUrl(url));
    setValue("title", post.title);
    setValue("content", post.content);
    setValue("slug", post.slug);
  }, [post, setValue]);

  const submit = async (data) => {
    setIsLoading(true);
    setError("");
    //for edit post
    if (post) {
      try {
        const newImg = data?.image[0];

        //update post with new Image
        if (newImg) {
          const upLoadFile = await service.fileUpload(data.image[0]);

          const updatePost = await service.updatePost(post.$id, {
            ...data,
            featuredImg: upLoadFile?.$id,
          });
          if (updatePost) {
            await service.deleteFile(post.featuredImg);
            router.push(`/post/${updatePost.$id}`);
          }
        } else {
          // update post without new Image
          const updatePost = await service.updatePost(post.$id, {
            ...data,
          });
          if (updatePost) router.push(`/post/${updatePost.$id}`);
        }
      } catch (error) {
        setError(
          error?.message || "An unexpected error occurred. Please try again",
        );
        setTimeout(() => {
          setError("");
        }, 4500);
      } finally {
        setIsLoading(false);
      }
    } else {
      //For create new post
      try {
        const fileUpload = await service.fileUpload(data.image[0]);
        const fileId = fileUpload.$id;

        data.featuredImg = fileId;

        if (fileId) {
          const createPost = await service.createPost({
            ...data,
            userId: userData.$id,
          });

          if (createPost) router.replace(`/post/${createPost?.$id}`);
        }
      } catch (error) {
        setError(
          error?.message || "An unexpected error occurred. Please try again",
        );
        if (error) {
          setTimeout(() => {
            setError("");
          }, 4500);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const slugTransform = useCallback((title) => {
    if (title) {
      return title
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    } else return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform]);

  useEffect(() => {
    if (userData) {
      setIsAuthor(true);
    } else {
      const wait = setTimeout(() => {
        if (!userData) router.replace("/login");
      }, 500);
      return () => clearTimeout(wait);
    }
  }, [userData]); //authenticate user wait 500 ms for authenticate

  if (!userData && !isAuthor) {
    return <AuthLoading />;
  }
  {
    /* Auth loading  */
  }

  return (
    <>
      <Container>
        <span className=" w-full flex justify-center fixed top-20 z-50">
          <InputError message={error} className="py-2" />
        </span>
        <form
          className=" flex pr-4 pl-4 flex-col sm:w-full md:w-3/4 mx-auto dark:bg-black"
          onSubmit={handleSubmit(submit)}
        >
          <div className="left">
            <Input
              label={"Title"}
              type={"text"}
              className={"mb-5 mt-2"}
              placeholder={"Title  "}
              {...register("title", { required: true })}
            />
            {errors?.title && (
              <InputError message={"Enter Title"} className="py-2" />
            )}
            <Input
              disabled={true}
              label={"Slug"}
              type={"text"}
              className={"mb-5 mt-2 cursor-not-allowed opacity-50"}
              placeholder={"Slug auto generated from title"}
              {...register("slug", { required: true })}
            />
            <RTE
              label={"Description (less than 355 characters)"}
              control={control}
              {...register("content", {
                required: true,
                validate: {
                  maxLength: (value) => {
                    // 1. Remove HTML tags to count only the actual text
                    const plainText = value.replace(/<[^>]*>/g, "").trim();

                    return (
                      plainText.length <= 355 ||
                      `Character limit exceeded: ${plainText.length}/355`
                    );
                  },
                },
              })}
            />
            {errors?.content && (
              <InputError
                message={errors?.content.message || "write description"}
                className="py-2"
              />
            )}
          </div>
          <div className="right  flex flex-col  items-center">
            <Input
              label={"Image (under 2 MB)"}
              type={"file"}
              className={"mb-5 mt-2 cursor-pointer"}
              {...register("image", {
                required: !post,
                validate: {
                  lessThan2MB: (files) => {
                    if (!files || files.length === 0) return true;
                    return (
                      files[0]?.size < 2000000 ||
                      "File size must be less than 2MB"
                    );
                  },
                },
              })}
              accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
            />
            {errors?.image && (
              <InputError
                message={errors.image.message || "Upload Image"}
                className="py-2"
              />
            )}
            {isDirty && (
              <Button
                disabled={isLoading}
                type={"submit"}
                className={`bg-red-500 text-white my-3  flex items-center justify-center gap-2 ${isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
              >
                {post ? (
                  isLoading ? (
                    <>
                      {" "}
                      <ButtonLoader /> Updating
                    </>
                  ) : (
                    "Update"
                  )
                ) : isLoading ? (
                  <>
                    {" "}
                    <ButtonLoader /> Uploading
                  </>
                ) : (
                  "Upload"
                )}
              </Button>
            )}

            {imgUrl && (
              <Image
                src={imgUrl}
                alt={post?.title}
                width={400}
                height={600}
                sizes="(max-width: 768px) 75vw, (max-width: 1200px) 50vw, 400px"
                className="rounded-xl w-3/4 "
              />
            )}
          </div>
        </form>
      </Container>
    </>
  );
}
