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
  onChange(content: Note["content"], caret?: Note["caret"]): void;
  onCaretChange(noteId: Note["id"], caret: Note["caret"]): void;
};

function triggerSaPageView() {
  // Trigger a page view when the route changes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any).sa) {
    // @ts-expect-error "sa" should exist because I check above:
    window.sa("pageview");
  }
}

const NoteInput = memo(
  function NoteInput({ note, onChange, onCaretChange }: NoteInputProps) {
    const [text, setText] = useState(note.content || "");
    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      setText(note.content);

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

      triggerSaPageView();

      return () => {
        onCaretChange(note.id, textareaElement?.selectionStart || 0);
      };
    }, [note, onCaretChange]);

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        const textareaElement = ref.current;

        setText(value);

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
    return prevProps.note.id === nextProps.note.id;
  },
);

export default NoteInput;
