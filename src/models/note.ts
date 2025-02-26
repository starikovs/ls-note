export type Note = {
  id: string;
  content: string;
  created: string;
  modified: string;
  active?: boolean;
  caret?: number;
};

export function createFirstNote(): Note {
  const content = `Welcome to LS Note!\n\nYou can create plain text notes here, and they’re stored right in your browser’s local storage — no cloud, no servers.\n\nUse it for quick plain text edits or taking temporary notes.\n\nHotkeys for the desktop users:\nCtrl+Alt+N – Create a new note\nCtrl+Alt+J – Jump to the next note\nCtrl+Alt+K – Go back to the previous note\nCtrl+Alt+D – Delete the selected note\n\nHappy note-taking!`;
  return createNote({ content, active: true });
}

export function createNote(noteValues: Partial<Note> = {}): Note {
  return Object.assign(
    {
      id: crypto.randomUUID(),
      content: "",
      created: new Date().toUTCString(),
      modified: new Date().toUTCString(),
      active: false,
    },
    noteValues,
  );
}
