import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RTE, Input, Button, Select } from "../index";
import { useSelector } from "react-redux";
import service from "../../../appwrite/config";
import { useForm } from "react-hook-form";
export default function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((data) => data.auth.userData);
  const [imgUrl, setImgUrl] = useState();
  const { register, control, watch, handleSubmit, getValues, setValue } =
    useForm({
      defaultValues: {
        title: post?.title,
        slug: post?.$id,
        content: post?.content,
        status: "active",
      },
    });
  useEffect(() => {
    if (!post) return
      service.fileView(post.featuredImg).then((url) => setImgUrl(url));
      setValue("title", post.title);
      setValue("content", post.content);
      setValue("slug", post.slug);
      setValue("status",post.status)
    
  }, [post,setValue]);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await service.fileUpload(data.image[0])
        : null;

      await service.deleteFile(post.featuredImg);

      const updatePost = await service.updatePost(post.$id, {
        ...data,
        featuredImg: file ? file.$id : null,
      });
      if (updatePost) navigate(`/post/${updatePost.$id} `)
    } else {
      try {
        const fileUpload = await service.fileUpload(data.image[0]);
        const fileId = fileUpload.$id;

        data.featuredImg = fileId;

        if (fileId) {
          const createPost = await service.createPost({
            ...data,
            userId: userData.$id,
          });

          if (createPost) navigate(`/post/${createPost.$id}`,{ replace: true });
        }
      } catch (err) {
        throw err;
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

    return () => subscription.unsubscribe;
  }, [watch, slugTransform]);

  return (
    <>
      <form className=" flex gap-1" onSubmit={handleSubmit(submit)}>
        <div className="left w-2/3 ">
          <Input
            label={"tittle"}
            type={"text"}
            className={"my-3"}
            placeholder={"Title name "}
            {...register("title", { required: true })}
          />
          <Input
            disabled
            label={"slug"}
            type={"text"}
            className={"my-3"}
            placeholder={"Slug"}
            {...register("slug", { required: true })}
          />
          <RTE
            control={control}
            {...register("content", {
              required: true,
            })}
          />
        </div>
        <div className="right w-1/3 flex flex-col  items-center">
          <Input
            label={"Image"}
            type={"file"}
            className={"my-3"}
            {...register("image", { required: true })}
            accept="image/png, image/jpg, image/jpeg, image/gif"
          />
          <Select
            label={"Status"}
            options={["Active", "Inactive"]}
            className={"my-3"}
            {...register("status", { required: true })}
          />
          <Button type={"submit"} className={" w-1/3 my-1 "}>
            {post ? "Update" : "upload"}
          </Button>

          {post && (
            <img className="rounded w-3/4 ml-2" src={imgUrl} alt={post.title} />
          )}
        </div>
      </form>
    </>
  );
}
