import React, { useId } from "react";

function Select({ options=[], label, className = "", ref, ...props }) {
  const id = useId();

  return (
    <div className="w-full flex flex-col">
      {label && <label className="font-bold  pl-3 mb-2" htmlFor={id}> {label}</label>}
      <select
        {...props}
        id={id}
        ref={ref}
        value={props.value ||""}
        className={`px-4 lg:px-6 lg:text-xl py-2 rounded-lg bg-white  dark:bg-black dark:text-gray-400 outline-none focus:bg-gray-50 dark:focus:bg-gray-900 duration-200 border border-gray-200 lg:py-6 w-full ${className}`}
      >
        {
          options?.map((item) => (
            <option className="" key={item} value={item}>
              {item}
            </option>
          ))}
      </select>
    </div>
  );
}

export default Select;
