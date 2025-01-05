import { createContext, Dispatch } from "react";

import { NotesActions } from "../hooks/useNotes.ts";

const DispatchContext = createContext<Dispatch<NotesActions> | undefined>(
  undefined,
);

export default DispatchContext;
