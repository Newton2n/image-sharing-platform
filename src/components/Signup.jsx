"use client";
import React, { useState } from "react";
import { Input, Button, Logo } from "./index";
import authservice from "@/lib/appwrite/auth";
import service from "@/lib/appwrite/config";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";

import { useForm } from "react-hook-form";
import { themeSlice } from "../store/themeSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
function Signup() {
  const dispatch = useDispatch();
  const router = useRouter()
  const [error, setError] = useState();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const createAccount = async (data) => {
    setError(null);
    try {
      const newAccount = await authservice.createAccount(data);

      if (newAccount) {
        const userData = await authservice.getCurrentUser().then((userData) => {
          service.createProfileInformationPost({
            userId: userData.$id,
            fullName: userData.name,
            email: userData.email,
          });
          if (userData) dispatch(login(userData));
        });
        return router.replace("/");
      }
    } catch (error) {
      setError("error occurred", error.message);
    }
  };
  return (
    <div className="flex items-center justify-center dark:bg-black ">
      <div
        className={`mx-auto w-full max-w-lg my-2 bg-gray-100 dark:bg-black rounded-xl p-10 border border-black/10 dark:border-gray-100`}
      >
        <div className="mb-2 flex justify-center">
          <span className="w-full max-w-[100px]">
            <Logo />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight dark:text-gray-500">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60  dark:text-gray-600 mb-4">
          Already have an account?&nbsp;
          <Link
            href="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline text-red-400"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(createAccount)}>
          <div className="space-y-5">
            <Input
              label={"Full Name :"}
              placeholder={"Enter your full name"}
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && (
              <p className="text-red-600"> {errors.name.message} </p>
            )}
            <Input
              label={"Email:"}
              placeholder={"Enter your email address"}
              type={"email"}
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(
                      value
                    ) || "enter a valid email address",
                },
              })}
            />

            {errors.email && (
              <p className="text-red-600"> {errors.email.message} </p>
            )}
            <Input
              label={"Password:"}
              placeholder={"Enter password"}
              type={"password"}
              {...register("password", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                      value
                    ) ||
                    "enter a strong password at least 8 characters must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600"> {errors.password.message} </p>
            )}
            <Button
              type="submit"
              children={"Create Account"}
              className={"w-full mt-4 cursor-pointer bg-red-500 text-white"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
