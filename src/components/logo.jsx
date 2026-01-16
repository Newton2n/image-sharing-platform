import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div className="w-9 h-6  ">
      <p className="text-red-500 dark:text-white font-semibold text-xl">
        POSTORA
      </p>
    </div>
  );
}

export default Logo;
