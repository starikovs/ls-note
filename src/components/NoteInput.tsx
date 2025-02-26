import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Note } from "../models/note.ts";
import InputStats from "./InputStats.tsx";

const countLines = (s: string): number => {
  let result = 1;

  for (const c of s) {
    if (c === "\n") {
      result++;
    }
  }

  return result;
};

type NoteInputProps = {
  note: Note;
  onChange(content: Note["content"], caret?: Note["caret"]): void;
  onCaretChange(noteId: Note["id"], caret: Note["caret"]): void;
};

const NoteInput = memo(
  function NoteInput({ note, onChange, onCaretChange }: NoteInputProps) {
    const [text, setText] = useState(note.content);
    const [lines, setLines] = useState(countLines(note.content));
    const [chars, setChars] = useState(note.content.length);
    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      setText(note.content);
      setChars(note.content.length);
      setLines(countLines(note.content));

      const textareaElement = ref.current;

      if (textareaElement) {
        // it doesn't set a focus on the beginning of the textarea without this setTimeout hack:
        setTimeout(() => {
          const caret = note.caret || 0;
          textareaElement.setSelectionRange(caret, caret);
          // focus() should go after setSelectionRange() to scroll to a cursor if it's outside textarea's visible area
          textareaElement.focus();
        }, 10); // don't set 0 because on Safari setSelectionRange() doesn't work in this case
      }

      return () => {
        onCaretChange(note.id, textareaElement?.selectionStart || 0);
      };
    }, [note, onCaretChange]);

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        const textareaElement = ref.current;

        setText(value);
        setChars(value.length);
        setLines(countLines(value));

        if (textareaElement) {
          // for the case: load page -> edit current note -> reload -> get caret restored:
          onChange(value, textareaElement.selectionStart);
        } else {
          onChange(value);
        }
      },
      [onChange],
    );

    return (
      <>
        <div className="relative flex-grow">
          <textarea
            placeholder="Start writing"
            className="h-full w-full resize-none rounded-md border-none bg-white p-8 text-inherit focus:outline-none dark:bg-zinc-900 dark:text-white"
            ref={ref}
            value={text}
            onChange={handleChange}
          ></textarea>
          <InputStats charsCount={chars} linesCount={lines} />
        </div>
      </>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.note.id === nextProps.note.id;
  },
);

export default NoteInput;
