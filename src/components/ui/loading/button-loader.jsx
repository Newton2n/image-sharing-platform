import React from 'react';

const ButtonLoader = ({ size = "w-5 h-5", color = "border-white" }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`${size} border-2 ${color} border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default ButtonLoader;