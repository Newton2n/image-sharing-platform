"use client";
import React from "react";
import {
  Logo,
  Container,
  LogoutBtn,
  BottomNav,
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
      slug: "/addpost",
      active: authStatus,
    },
    {
      name: "Profile",

      slug: `/profile/${userData?.$id || "me"}`,
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-white dark:bg-[#2C2C2C]">
      <Container>
        {/* bottom navbar for mobile devices8 */}
        <BottomNav />
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
                  className=" font-normal hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800 rounded-2xl max-sm:hidden"
                >
                  <Link
                    href={item.slug}
                    className={
                      isActive
                        ? "inline-bock px-6 py-2 text-red-500 rounded-2xl cursor-pointer  "
                        : "inline-bock px-6 py-2   rounded-full cursor-pointer"
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
                    className={"bg-red-500 text-white hover:bg-red-600"}
                  />
                )}
              </li>
            }
            {/*this code mean if authStatus is true  then the && next part will work or nope*/}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
