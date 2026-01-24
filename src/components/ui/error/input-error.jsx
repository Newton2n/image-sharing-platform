import React from "react";
import { AlertCircle } from "lucide-react"; 

const InputError = ({ message ,className =""}) => {
  if (!message) return null;

  return (
    <div 
      className={`flex items-center gap-2 mt-1 animate-in fade-in slide-in-from-top-1 duration-200 ${className}`}
      role="alert"
    >
      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
      <p className="text-sm font-medium text-red-400 leading-tight md:text-base">
        {message}
      </p>
    </div>
  );
};

export default InputError;