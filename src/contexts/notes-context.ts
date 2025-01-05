import { createContext } from "react";

import { NotesState } from "../hooks/useNotes.ts";

const NotesContext = createContext<NotesState | undefined>(undefined);

export default NotesContext;
