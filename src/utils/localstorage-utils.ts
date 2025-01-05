import { createFirstNote, createNote, Note } from "../models/note.ts";

const lsKey = "MY_LS_NOTES";

function showNoNotesWarning(): void {
  console.warn(
    "There are no notes found under the MY_TEXT_NOTES key in the browser's local storage. A default note has been created.",
  );
}

function notesCompareFn(a: Note, b: Note) {
  if (a.modified > b.modified) {
    return -1;
  } else if (a.modified === b.modified) {
    return 0;
  } else {
    return 1;
  }
}

export function loadNotes(): Note[] {
  const rawNotes = localStorage.getItem(lsKey);

  if (!rawNotes) {
    showNoNotesWarning();
    return [createFirstNote()];
  }

  try {
    const parsedNotes = JSON.parse(rawNotes, (key, value: unknown) => {
      if (
        typeof value === "string" &&
        (key === "created" || key === "modified")
      ) {
        return new Date(value);
      }

      return value;
    });

    if (!Array.isArray(parsedNotes)) {
      console.warn(
        "The MY_TEXT_NOTES key found but it has the incorrect data. It should contain an array of notes.",
      );
      return [createNote()];
    }

    return parsedNotes.sort(notesCompareFn);
  } catch {
    showNoNotesWarning();
    return [createFirstNote()];
  }
}

export function saveNotes(notes: Note[]): void {
  localStorage.setItem(lsKey, JSON.stringify(notes));
}
