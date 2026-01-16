import React, { useId } from "react";

function Input({ label, type = "text", className = "", ref, ...props }) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className=" pl-3 font-bold dark:text-gray-300" htmlFor={id}>
          {label}
        </label>
      )}
       <input
            type={type}
            className={`pl-4 lg:pl-6 lg:text-xl py-2 rounded-lg bg-white text-black  dark:bg-black dark:text-gray-400 outline-none focus:bg-gray-50 dark:focus:bg-black duration-200 border border-gray-200 w-full lg:py-6 ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
    </div>
  );
}

export default Input;
