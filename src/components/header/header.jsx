"use client";
import React from "react";
import { useEffect, useState } from "react";
import {
  Logo,
  LogoutBtn,
  Button,
  ThemeToggler,
} from "../index";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
function Header() {
  const authStatus = useSelector((state) => state.auth.activeStatus);
  const userData = useSelector((state) => state.auth.userData);
  const isActive = false;
  const router = useRouter();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },

    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Profile",

      slug: `/profile/${userData?.$id || "me"}`,
      active: authStatus,
    },
  ];
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`w-full py-3  sticky top-0 z-[999] shadow-sm dark:shadow-white/20 transition-[background-color,box-shadow] duration-500 ease-out  ${
        scrolled
          ? "bg-white/10 dark:bg-neutral-950/30 backdrop-blur-lg "
          : "dark:bg-black bg-white"
      }`}
    >
        <nav className="flex   items-center">
          <div className="mr-4 ml-3">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <ul className="flex ml-auto items-center justify-center ">
            {navItems.map((item) =>
              item.active ? (
                <li
                  key={item.name}
                  className=" font-normal dark:text-white  rounded-3xl max-md:hidden"
                >
                  <Link
                    href={item.slug}
                    className={
                      isActive
                        ? "inline-block px-6 py-2 text-red-500 rounded-2xl cursor-pointer  "
                        : "inline-block px-6 py-2   rounded-full cursor-pointer"
                    }
                  >
                    {item.name}
                  </Link>
                </li>
              ) : null
            )}
            {
              <li>
                <ThemeToggler className={"px-3 "} />
              </li>
            }
            {
              <li className="ml-2 mr-3">
                {userData ? (
                  <LogoutBtn />
                ) : (
                  <Button
                    onClick={() => router.replace("/login")}
                    children={"Login"}
                    className={"bg-red-400/15 text-red-500/40 dark:text-white/40 hover:scale-[1.03] transition-transform duration-200 ease-out"}
                  />
                )}
              </li>
            }
            {/*this code mean if authStatus is true  then the && next part will work or nope*/}
          </ul>
        </nav>
    </header>
  );
}

export default Header;
