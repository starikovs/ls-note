import { useCallback } from "react";

import Card from "./Card.tsx";
import { useNotesContext } from "../hooks/useNotesContext.ts";
import { useDispatchContext } from "../hooks/useDispatchContext.ts";
import { Note } from "../models/note.ts";
import DeleteButton from "./DeleteButton.tsx";

function NoteList() {
  const notesState = useNotesContext();
  const dispatch = useDispatchContext();

  const activeNote =
    notesState.notes.find((note) => note.active) || notesState.notes[0];

  const handleClick = useCallback(
    (note: Note) => {
      dispatch({ type: "SET_ACTIVE", payload: note.id });
    },
    [dispatch],
  );

  const handlePlusIconClick = useCallback(() => {
    dispatch({ type: "ADD_NEW" });
  }, [dispatch]);

  const handleDelClick = useCallback(
    (noteId: string) => {
      dispatch({ type: "DELETE", payload: noteId });
    },
    [dispatch],
  );

  return (
    <div className="flex flex-shrink-0 flex-row flex-nowrap gap-4 overflow-x-auto py-4 lg:h-auto lg:flex-col lg:overflow-y-auto lg:px-4 lg:py-0">
      <Card active={false} onClick={handlePlusIconClick}>
        <svg
          className="inline-block h-14 w-14 text-zinc-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14m-7 7V5"
          />
        </svg>
      </Card>

      {notesState.notes.map((note, _, array) => (
        <Card
          key={note.id}
          active={note.id === activeNote?.id}
          onClick={() => handleClick(note)}
        >
          <div className="overflow-hidden">
            {note.content.substring(0, 340)}
          </div>
          <div className="flex items-center justify-between text-zinc-500">
            <span>
              {new Date(note.modified).toLocaleDateString(undefined, {
                day: "numeric",
                month: "short",
                year: "2-digit",
              })}
            </span>
            {array.length > 1 && (
              <DeleteButton noteId={note.id} onClick={handleDelClick} />
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}

export default NoteList;
