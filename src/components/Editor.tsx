import { useCallback } from "react";

import { useNotesContext } from "../hooks/useNotesContext.ts";
import { useDispatchContext } from "../hooks/useDispatchContext.ts";
import NoteInput from "./NoteInput.tsx";
import { Note } from "../models/note.ts";

function Editor() {
  const notesState = useNotesContext();
  const dispatch = useDispatchContext();

  const activeNote =
    notesState.notes.find((note) => note.active) || notesState.notes[0];

  const handleChange = useCallback(
    (content: Note["content"], caret?: Note["caret"]) => {
      dispatch({ type: "UPDATE_CONTENT", payload: { content, caret } });
    },
    [dispatch],
  );

  const handleCaretChange = useCallback(
    (noteId: Note["id"], caret: Note["caret"]) => {
      dispatch({ type: "STORE_CARET", payload: { noteId, caret } });
    },
    [dispatch],
  );

  return (
    <NoteInput
      note={activeNote}
      onChange={handleChange}
      onCaretChange={handleCaretChange}
    />
  );
  // return (
  //   <div className="flex-grow">
  //     <textarea
  //       className="h-full w-full resize-none rounded-md border-none bg-white p-8 text-xl text-inherit first-line:text-3xl focus:outline-none dark:bg-zinc-900 dark:text-white"
  //       ref={ref}
  //       value={text}
  //       onChange={handleChange}
  //     ></textarea>
  //   </div>
  // );
}

export default Editor;
