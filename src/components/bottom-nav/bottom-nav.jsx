"use client";
import { Home, Plus, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
function BottomNav() {
  const userData = useSelector((data) => data.auth.userData);
  const pathName = usePathname(); //current path name
  const navItems = [
    {
      name: "Home",
      icon: Home,
      slug: "/",
    },

    {
      name: "Add",
      icon: Plus,
      slug: userData ? "/add-post" : "/login",
    },
    {
      name: "Profile",
      icon: User,
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
                <item.icon
                  size={25}
                  className={`transition-all duration-200 
    ${
      pathName === item.slug
        ? "fill-black text-black dark:fill-white dark:text-white"
        : "fill-none text-black dark:text-white"
    }`}
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BottomNav;
