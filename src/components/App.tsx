import { useCallback } from "react";

import NotesContext from "../contexts/notes-context";
import DispatchContext from "../contexts/dispatch-context";
import useNotes from "../hooks/useNotes";
import Editor from "./Editor";
import NoteList from "./NoteList";
import useGlobalKeydownHandler from "../hooks/useGlobalKeydownHandler.ts";

function App() {
  const [notesState, dispatch] = useNotes();

  useGlobalKeydownHandler(
    useCallback(() => {
      dispatch({ type: "SELECT_PREVIOUS" });
    }, [dispatch]),
    useCallback(() => dispatch({ type: "SELECT_NEXT" }), [dispatch]),
    useCallback(() => dispatch({ type: "DELETE" }), [dispatch]),
    useCallback(() => dispatch({ type: "ADD_NEW" }), [dispatch]),
  );

  return (
    <>
      <NotesContext.Provider value={notesState}>
        <DispatchContext.Provider value={dispatch}>
          <Editor />
          <NoteList />
        </DispatchContext.Provider>
      </NotesContext.Provider>
    </>
  );
}

export default App;
