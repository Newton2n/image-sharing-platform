import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { themeToggler, setTheme } from "../store/themeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faMoon } from "@fortawesome/free-solid-svg-icons";
function ThemeToggler({ className = "" }) {
  const currentTheme = useSelector((state) => state.theme.mood);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentTheme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [currentTheme]);

  const themeTogglerBtn = () => {
    return dispatch(themeToggler());
  };

  return (
    <div className={`${className} flex  items-center justify-center`}>
      <button
        className="flex flex-col items-center justify-center"
        onClick={() => themeTogglerBtn()}
      >
        <span
          className={`${
            currentTheme === "light" ? "hidden" : ""
          } text-xl cursor-pointer `}
        >
          {" "}
          <FontAwesomeIcon icon={faLightbulb} style={{ color: "#FFD43B" }} />
        </span>
        <span
          className={`${
            currentTheme === "dark" ? "hidden" : ""
          } text-xl cursor-pointer`}
        >
          {" "}
          <FontAwesomeIcon icon={faMoon} />
        </span>
      </button>
    </div>
  );
}

export default ThemeToggler;
