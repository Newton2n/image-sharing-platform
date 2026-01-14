"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faSquarePlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";
import { Container } from "../index";
import Link from "next/link";
function BottomNav() {
  const userData = useSelector((data) => data.auth.userData);

  const navItems = [
    {
      name: "Home",
      icon: faHouse,
      slug: "/",
    },

    {
      name: "Add",
      icon: faSquarePlus,
      slug: userData ? "/addpost" : "/login",
    },
    {
      name: "Profile",
      icon: faUser,
      slug: `/profile/${userData?.$id || "me"}`,
    },
  ];
  return (
    <Container>
      <nav className="w-full  bg-white dark:bg-[#2C2C2C] fixed bottom-0 z-20 sm:hidden">
        <ul className="w-full flex justify-around items-center">
          {navItems.map((item) => (
            <li
              className=" flex py-4 justify-center items-center  rounded"
              key={item.name}
            >
              <Link href={item.slug}>
                <span>
                  <FontAwesomeIcon
                    icon={item.icon}
                    title={item.name}
                    aria-label={item.name}
                    className="text-2xl  dark:text-gray-50"
                  />{" "}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}

export default BottomNav;
