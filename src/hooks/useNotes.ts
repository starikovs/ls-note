import { Dispatch, useEffect, useReducer } from "react";

import { createNote, Note } from "../models/note.ts";
import { loadNotes, saveNotes } from "../utils/localstorage-utils.ts";

export type NotesState = {
  notes: Note[];
};

type AddNewAction = {
  type: "ADD_NEW";
};

type SetActiveAction = {
  type: "SET_ACTIVE";
  payload: Note["id"];
};

type UpdateContentAction = {
  type: "UPDATE_CONTENT";
  payload: Note["content"];
};

type SelectPreviousAction = {
  type: "SELECT_PREVIOUS";
};

type SelectNextAction = {
  type: "SELECT_NEXT";
};

type StoreCaretAction = {
  type: "STORE_CARET";
  payload: { noteId: Note["id"]; caret: Note["caret"] };
};

type DeleteAction = {
  type: "DELETE";
  payload?: Note["id"];
};

export type NotesActions =
  | AddNewAction
  | SetActiveAction
  | UpdateContentAction
  | SelectPreviousAction
  | SelectNextAction
  | StoreCaretAction
  | DeleteAction;

function reducer(state: NotesState, action: NotesActions): NotesState {
  switch (action.type) {
    case "ADD_NEW": {
      const newNote = createNote();
      const notes = state.notes.map((note) => {
        return { ...note, active: false };
      });

      newNote.active = true;

      return {
        notes: [newNote, ...notes],
      };
    }
    case "SET_ACTIVE":
      return {
        notes: state.notes.map((note) => {
          note.active = note.id === action.payload;
          return note;
        }),
      };
    case "UPDATE_CONTENT":
      return {
        notes: state.notes.map((note) =>
          note.active
            ? {
                ...note,
                content: action.payload,
                modified: new Date().toUTCString(),
              }
            : note,
        ),
      };
    case "SELECT_PREVIOUS": {
      const activeIndex = state.notes.findIndex((note) => note.active);
      const prevIndex = activeIndex > 0 ? activeIndex - 1 : 0;

      return {
        notes: state.notes.map((note, index) => {
          switch (index) {
            case prevIndex:
              return { ...note, active: true };
            case activeIndex:
              return { ...note, active: false };
            default:
              return note;
          }
        }),
      };
    }
    case "SELECT_NEXT": {
      const activeIndex = state.notes.findIndex((note) => note.active);
      const nextIndex =
        activeIndex < state.notes.length - 1
          ? activeIndex + 1
          : state.notes.length - 1;

      return {
        notes: state.notes.map((note, index) => {
          switch (index) {
            case nextIndex:
              return { ...note, active: true };
            case activeIndex:
              return { ...note, active: false };
            default:
              return note;
          }
        }),
      };
    }
    case "STORE_CARET":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.noteId
            ? { ...note, caret: action.payload.caret }
            : note,
        ),
      };
    case "DELETE": {
      if (state.notes.length === 1) {
        return state;
      }

      const index = state.notes.findIndex((note) =>
        action.payload ? note.id === action.payload : note.active,
      );

      if (index === -1) {
        return state;
      }

      const isActive = state.notes[index].active;
      const notes = state.notes.filter((_, i) => i !== index);

      if (isActive) {
        const newActiveIndex = index < notes.length ? index : index - 1;
        notes[newActiveIndex] = { ...notes[newActiveIndex], active: true };
      }

      return {
        ...state,
        notes,
      };
    }
    default:
      return state;
  }
}

function useNotes(): [NotesState, Dispatch<NotesActions>] {
  const [notesState, dispatch] = useReducer(reducer, {
    notes: loadNotes(),
  });

  useEffect(() => {
    console.log("_debug", "useLocalstorage", "it's time to store!");
    const timeout = setTimeout(() => {
      console.log("_debug", "useLocalstorage", "storing...");
      saveNotes(notesState.notes);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [notesState.notes]);

  return [notesState, dispatch];
}

export default useNotes;
