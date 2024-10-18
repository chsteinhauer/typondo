import { useState } from "react";
import dynamic from "next/dynamic";
//import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import type ReactQuill from "react-quill";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const QuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill-new");
    // eslint-disable-next-line react/display-name
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    ssr: false,
  },
) as typeof ReactQuill;

/*
 * Simple editor component that takes placeholder text as a prop
 */
export function Editor() {
  const [editorHtml, setEditorHtml] = useState<string>("");
  //   const ReactQuill =
  //     typeof window === "object" ? require("react-quill") : () => false;

  //   const ReactQuill = dynamic(
  //     () => {
  //       return import("react-quill");
  //     },
  //     { ssr: false },
  //   );

  let modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  let formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <div>
      {/* <ReactQuill
        theme="snow"
        onChange={(html: string) => setEditorHtml(html)}
        value={editorHtml}
        modules={modules}
        formats={formats}
        //bounds={".app"}
        placeholder="hello"
      /> */}

      <QuillWrapper theme="snow" value={editorHtml} onChange={setEditorHtml} />
    </div>
  );
}
