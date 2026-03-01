import { EditorContent, useEditor } from "@tiptap/react";
import TiptapToolbar from "./TiptapToolBar";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function TiptapEditor({ value, onChange, disabled }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({
        levels: [3],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
    ],
    content: value,
    editable: !disabled,
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div
      onClick={() => editor?.commands.focus()}
      className="bg-white/5 border border-white/10 rounded-md focus-within:ring-2 focus-within:ring-blue-500/50"
    >
      <TiptapToolbar editor={editor} />

      <EditorContent
        editor={editor}
        className="p-4 text-white/80"
      />
    </div>
  );
}