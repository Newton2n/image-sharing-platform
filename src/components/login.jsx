"use client";
import React, { useEffect, useState } from "react";

import authservice from "@/lib/appwrite/auth";
import { login as authLogin, logout } from "@/store/authSlice";
import { Input, Button, Logo } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

  const login = async (data) => {
    setError("");
    try {
      const session = await authservice.login(data);

      if (session) {
        const userData = await authservice.getCurrentUser();

        if (userData) dispatch(authLogin(userData));
        router.replace("/");
      }
    } catch (error) {
      setError(`${error.message}: error occurred in log in system`);
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
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
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
                      value
                    ) || "enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600" role="alert">
                {errors.email.message}
              </p>
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
                      value
                    ) ||
                    "enter a strong password at least 8 characters must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500" role="alert">
                {errors.password.message}
              </p>
            )}
            <Button
              type="submit"
              children={"Submit"}
              className="w-full bg-red-500 text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
