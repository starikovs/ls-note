import { useContext } from "react";

import NotesContext from "../contexts/notes-context.ts";

export function useNotesContext() {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error(
      "useNotesContext must be used within the NotesContext.Provider and the NotesContext.Provider should provide a corresponding value.",
    );
  }

  return context;
}
