export type Note = {
  id: string;
  content: string;
  created: string;
  modified: string;
  active?: boolean;
  caret?: number;
};

export function createNote(): Note {
  return {
    id: crypto.randomUUID(),
    content: "Your new note",
    created: new Date().toUTCString(),
    modified: new Date().toUTCString(),
    active: false,
  };
}
