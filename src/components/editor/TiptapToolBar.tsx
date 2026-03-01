"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link2,
  Heading3,
} from "lucide-react";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface ToolbarProps {
  editor: Editor | null;
}

interface SelectedOptions {
  heading3: boolean;
  bold: boolean;
  italic: boolean;
  strike: boolean;
  bulletList: boolean;
  orderedList: boolean;
  blockquote: boolean;
  link: boolean;
}

export default function TiptapToolbar({ editor }: ToolbarProps) {
  const [selected, setSelected] = useState<SelectedOptions>({
    heading3: false,
    bold: false,
    italic: false,
    strike: false,
    bulletList: false,
    orderedList: false,
    blockquote: false,
    link: false,
  });

  useEffect(() => {
    if (!editor) return;

    const updateSelection = () => {
      setSelected({
        heading3: editor.isActive("heading", { level: 3 }),
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        strike: editor.isActive("strike"),
        bulletList: editor.isActive("bulletList"),
        orderedList: editor.isActive("orderedList"),
        blockquote: editor.isActive("blockquote"),
        link: editor.isActive("link"),
      });
    };

    editor.on("selectionUpdate", updateSelection);
    editor.on("transaction", updateSelection);

    updateSelection();

    return () => {
    };
  }, [editor]);

  const buttonClass = (active: boolean) =>
    clsx(
      "p-2 rounded hover:bg-white/10 transition",
      active ? "bg-white/15 text-white" : "text-white/60"
    );

  const setLink = () => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor?.chain().focus().unsetLink().run();
      return;
    }

    editor?.chain().focus().setLink({ href: url }).run();
  };

  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-1 border-b border-white/10 bg-white/5 px-2 py-1">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={buttonClass(selected.heading3)}
      >
        <Heading3 className="w-4 h-4" />
      </button>

      <div className="w-px bg-white/10 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClass(selected.bold)}
      >
        <Bold className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClass(selected.italic)}
      >
        <Italic className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={buttonClass(selected.strike)}
      >
        <Strikethrough className="w-4 h-4" />
      </button>

      <div className="w-px bg-white/10 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={buttonClass(selected.bulletList)}
      >
        <List className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={buttonClass(selected.orderedList)}
      >
        <ListOrdered className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={buttonClass(selected.blockquote)}
      >
        <Quote className="w-4 h-4" />
      </button>

      <div className="w-px bg-white/10 mx-1" />

      <button
        type="button"
        onClick={setLink}
        className={buttonClass(selected.link)}
      >
        <Link2 className="w-4 h-4" />
      </button>

      <div className="w-px bg-white/10 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="p-2 rounded text-white/60 hover:bg-white/10"
      >
        <Undo className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="p-2 rounded text-white/60 hover:bg-white/10"
      >
        <Redo className="w-4 h-4" />
      </button>
    </div>
  );
}