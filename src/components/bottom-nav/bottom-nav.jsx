"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faSquarePlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";
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
      slug: userData ? "/add-post" : "/login",
    },
    {
      name: "Profile",
      icon: faUser,
      slug: `/profile/${userData?.$id || "me"}`,
    },
  ];
  return (
    
      
        <div className="w-full md:hidden fixed bottom-0 left-0 right-0 z-[999] bg-white/10 dark:bg-neutral-950/30 backdrop-blur-lg">
          <ul className="w-full flex justify-around items-center min-h-12">
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
                      className="text-2xl text-black   dark:text-white"
                    />{" "}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
     
  );
}

export default BottomNav;
