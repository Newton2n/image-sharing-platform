import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Logo, Container,LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import menuicon from "../../icons/menuicon.png"

function Header() {
  const authStatus = useSelector((state) => state.auth.activeStatus);
  const userData = useSelector((state)=>state.auth.userData)

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
    <header className="py-3 px-2 shadow bg-white">
      <Container>
        <nav className="flex justify-center items-center">
          <div className="mr-4 ml-2">
            <Link to="/">
              <Logo/>
            </Link>
          </div>
          <ul className="flex ml-auto items-center justify-center">
           {/* <li className="sm:hidden cursor-pointer" onClick={()=>menuPage()}>
            <button>
             <img src={menuicon} alt="menu" />
            </button>
           </li> */}
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="hover:bg-gray-50 rounded-2xl">
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      isActive
                        ? "inline-bock px-6 py-2 text-red-500  rounded-2xl cursor-pointer  "
                        : "inline-bock px-6 py-2   rounded-full cursor-pointer"
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
            {
              <li className="ml-2">
                <LogoutBtn/>
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
