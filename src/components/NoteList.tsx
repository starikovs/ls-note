import { useCallback } from "react";

import Card from "./Card.tsx";
import { useNotesContext } from "../hooks/useNotesContext.ts";
import { useDispatchContext } from "../hooks/useDispatchContext.ts";
import { Note } from "../models/note.ts";

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
                month: "numeric",
                year: "2-digit",
              })}
            </span>
            {array.length > 1 && (
              <a
                href="#"
                className="block rounded-md border-2 border-solid border-transparent p-px opacity-50 outline-none hover:opacity-100 focus:border-blue-400 focus:opacity-100 dark:hover:text-white"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleDelClick(note.id);
                }}
              >
                <svg
                  className="h-5 w-5 text-gray-800 lg:h-[24px] lg:w-[24px] dark:text-white"
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
                    strokeWidth="1.5"
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                  />
                </svg>
              </a>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}

export default NoteList;
