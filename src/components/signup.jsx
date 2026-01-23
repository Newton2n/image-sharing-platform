"use client";
import React, { useState } from "react";
import { Input, Button, Logo } from "./index";
import authservice from "@/lib/appwrite/auth";
import service from "@/lib/appwrite/config";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ButtonLoader from "./ui/loading/button-loader";
import InputError from "./ui/error/input-error";
function Signup() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const createAccount = async (data) => {
    setError("");
    setIsLoading(true);
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
      setError(`${error.message || "Can not create account try again"} `);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center dark:bg-black ">
      <div
        className={`mx-auto w-full max-w-lg my-2 bg-gray-100 dark:bg-black rounded-xl p-10 border border-black/10 dark:border-gray-100`}
      >
        <div className="mb-2 flex justify-center">
          <span className="w-full max-w-25">
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
        {error && <InputError message={error || "Something went wrong "} />}
        <form onSubmit={handleSubmit(createAccount)}>
          <div className="space-y-5">
            <Input
              label={"Full Name :"}
              placeholder={"Enter your full name"}
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && <InputError message={"Please enter your name"} />}
            <Input
              label={"Email:"}
              placeholder={"Enter your email address"}
              type={"email"}
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(
                      value,
                    ) || "enter a valid email address",
                },
              })}
            />

            {errors.email && <InputError message={"Enter a valid email"} />}
            <Input
              label={"Password:"}
              placeholder={"Enter password"}
              type={"password"}
              {...register("password", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                      value,
                    ) ||
                    "enter a strong password at least 8 characters must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
                },
              })}
            />
            {errors.password && (
              <InputError
                message={
                  "Enter a strong password, at least 8 characters must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number"
                }
              />
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full mt-4  bg-red-500 text-white flex items-center justify-center gap-2 ${isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:bg-red-700"}`}
            >
              {isLoading ? (
                <>
                  {" "}
                  <ButtonLoader /> Creating
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
