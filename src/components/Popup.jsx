"use client"
import React from "react";
import { Button } from "./index";

export default function Popup({
  isOpen,
  title = "Are you sure?",
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/0 ">
      <div className="bg-white dark:bg-black rounded-2xl shadow-xl p-6 w-[90%] max-w-md text-center">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
        <div className="flex justify-center gap-3">
          {cancelText && (
            <Button
              onClick={onCancel}
              children={cancelText}
              className=" px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition  "
            />
          )}
          <Button
            onClick={onConfirm}
            children={confirmText}
            className="px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition "
          />
        </div>
      </div>
    </div>
  );
}
