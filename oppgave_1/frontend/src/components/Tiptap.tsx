"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function Tiptap() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
            <h2>This is a title</h2>
            <p>This is a paragraph</p>
        `,
    editorProps: {
      attributes: {
        class: "prose focus:outline-none",
      },
    },
    // Setter umiddelbar rendering til false for å unngå SSR-feil
    immediatelyRender: false,
  });

  if (!editor) {
    return null; // Render ingenting før editor er initialisert
  }

  return <EditorContent editor={editor} />;
}
