"use client"
import  { useMemo } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";

export default function RTE({ name, control, label }) {
  const themeMood = useSelector((state) => state.theme.mood);

const { skin, contentCss } = useMemo(() => {
    if (themeMood === "dark") {
      return { skin: "oxide-dark", contentCss: "dark" };
    }
    return { skin: "oxide", contentCss: "default" };
  }, [themeMood]);

  return (
    <div className="w-full">
 
      {label && (
        <label className="inline-block mb-2 pl-2 font-bold text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="w-full py-3">
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Editor
              key={themeMood}
              onEditorChange={(data) => onChange(data)}
              value={value}
              apiKey="ij0wxiglm84zt0qz8xooyy7q5ouaqu9pptcw3a1svv3fwvjz"
              init={{
                height: 300,

                // --- Dark Mode Configuration ---
                skin: skin ,
                content_css: contentCss,
                // -------------------------------

                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style:
                 
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          )}
        />
      </div>
    </div>
  );
}
