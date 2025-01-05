import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Note } from "../models/note.ts";

type NoteInputProps = {
  note: Note;
  onChange(content: Note["content"]): void;
  onCaretChange(noteId: Note["id"], caret: Note["caret"]): void;
};

const NoteInput = memo(
  function NoteInput({ note, onChange, onCaretChange }: NoteInputProps) {
    console.log("_debug", "NoteInput", note.id);
    const [text, setText] = useState(note.content || "");
    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      console.log("_debug", "NoteInput", "re-rendering");
      setText(note.content);

      const textareaElement = ref.current;

      if (textareaElement) {
        // it doesn't set a focus on the beginning of the textarea without this setTimeout hack:
        setTimeout(() => {
          const caret = note.caret || 0;
          console.log("_debug", "selection", textareaElement, caret);
          textareaElement.setSelectionRange(caret, caret);
          // focus() should go after setSelectionRange() to scroll to a cursor if it's outside textarea's visible area
          textareaElement.focus();
        }, 10); // don't set 0 because on Safari setSelectionRange() doesn't work in this case
      }

      return () => {
        console.log("_debug", "NoteInput", "cleaning up");
        onCaretChange(note.id, textareaElement?.selectionStart || 0);
      };
    }, [note, onCaretChange]);

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;

        setText(value);
        onChange(value);
      },
      [onChange],
    );

    return (
      <>
        <div className="flex-grow">
          <textarea
            className="h-full w-full resize-none rounded-md border-none bg-white p-8 text-inherit focus:outline-none dark:bg-zinc-900 dark:text-white"
            ref={ref}
            value={text}
            onChange={handleChange}
          ></textarea>
        </div>
      </>
    );
  },
  (prevProps, nextProps) => {
    console.log("_debug", "NoteInput", "Comparing", prevProps, nextProps);
    return prevProps.note.id === nextProps.note.id;
  },
);

export default NoteInput;
