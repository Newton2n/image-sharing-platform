import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Logo, Container, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.activeStatus);

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
      name: "All Post",
      slug: "/all-post",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      isActive
                        ? "inline-bock px-6 py-2 text-white font-semibold rounded-2xl cursor-pointer "
                        : "inline-bock px-6 py-2  hover:bg-blue-100 rounded-full cursor-pointer"
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
            {
              <li>
                <LogoutBtn />
              </li>
            }{" "}
            {/*this code mean if authStatus is true  then the && next part will work or nope*/}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
