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
} from "lucide-react";
import clsx from "clsx";
import StarterKit from "@tiptap/starter-kit";

interface ToolbarProps {
  editor: Editor | null;
}

export default function TiptapToolbar({ editor }: ToolbarProps) {
  if (!editor) return null;

  const buttonClass = (active = false) =>
    clsx(
      "p-2 rounded hover:bg-white/10 transition",
      active ? "bg-white/15 text-white" : "text-white/60"
    );

  return (
    <div className="flex flex-wrap gap-1 border-b border-white/10 bg-white/5 px-2 py-1">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClass(editor.isActive("bold"))}
      >
        <Bold className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClass(editor.isActive("italic"))}
      >
        <Italic className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={buttonClass(editor.isActive("strike"))}
      >
        <Strikethrough className="w-4 h-4" />
      </button>

      <div className="w-px bg-white/10 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={buttonClass(editor.isActive("bulletList"))}
      >
        <List className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={buttonClass(editor.isActive("orderedList"))}
      >
        <ListOrdered className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={buttonClass(editor.isActive("blockquote"))}
      >
        <Quote className="w-4 h-4" />
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