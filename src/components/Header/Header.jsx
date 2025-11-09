import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Logo, Container, LogoutBtn, BottomNav, Button,ThemeToggler } from "../index";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.activeStatus);
  const userData = useSelector((state) => state.auth.userData);


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
      slug: `/profile/${userData?.$id}`,
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
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className="flex ml-auto items-center justify-center ">
            {navItems.map((item) =>
              item.active ? (
                <li
                  key={item.name}
                  className=" font-medium hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800 rounded-2xl max-sm:hidden"
                >
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      isActive
                        ? "inline-bock px-6 py-2 text-red-500 rounded-2xl cursor-pointer  "
                        : "inline-bock px-6 py-2   rounded-full cursor-pointer"
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
                {
                  <li>
                   
                    <ThemeToggler className={"px-3 "}/>
                  </li>
                }
            {
              <li className="ml-2 mr-3">
                {userData ? (
                  <LogoutBtn />
                ) : (
                  <Button
                    onClick={() => navigate("/login", { replace: true })}
                    children={"Login"}
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
