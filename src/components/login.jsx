"use client";
import React, { useState } from "react";
import authservice from "@/lib/appwrite/auth";
import { login as authLogin, logout } from "@/store/authSlice";
import { Input, Button, Logo } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ButtonLoader from "./ui/loading/button-loader";
import InputError from "./ui/error/input-error";
function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const authStatus = useSelector((state) => state.auth);
  if (authStatus.activeStatus == false && authStatus.userData == false) {
    dispatch(logout());
  } //log out first if users data stored in localstorage but not actually log in

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const login = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      const session = await authservice.login(data);
     console.log("session id",session.secret)
      if (session) {
        const userData = await authservice.getCurrentUser();
         console.log(userData)
        if (userData) {
          dispatch(authLogin(userData));
          router.replace("/");
        }
      }
    } catch (error) {
      setError(`${error.message || "Error occurred in log in system"}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center w-full dark:bg-black">
      <div className="mx-auto w-[90%] my-2 max-w-lg bg-gray-100 dark:bg-black rounded-xl p-10 border border-black/10 dark:border-white">
        <div className="mb-2 flex justify-center ">
          <span className=" w-full max-w-25 ">
            <Logo />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight dark:text-gray-400">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60 dark:text-gray-400">
          Don&apos;t have any account?&nbsp;
          <Link
            href="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline text-red-400"
          >
            Sign Up
          </Link>
        </p>
        {error && <InputError message={error || "Something went wrong "} />}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label={"Email"}
              type={"email"}
              placeholder={"Enter you email"}
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
            {errors.email && (
              <InputError message={"Provide a valid  email address"} />
            )}
          </div>
          <div className="space-y-5 my-3">
            <Input
              label={"Password"}
              type={"password"}
              placeholder={"Enter you password"}
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
                  "Password is invalid ,Enter a strong password that you have signup, at least 8 characters must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number"
                }
              />
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-red-500 text-white flex items-center justify-center gap-2 ${isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:bg-red-700"}`}
            >
              {isLoading ? (
                <>
                  <ButtonLoader /> Logging on
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
