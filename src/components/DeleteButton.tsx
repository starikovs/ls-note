import { Note } from "../models/note.ts";

type DeleteButtonProps = {
  noteId: Note["id"];
  onClick: (noteId: Note["id"]) => void;
};

function DeleteButton({ noteId, onClick }: DeleteButtonProps) {
  return (
    <a
      href="#"
      className="block rounded-md border-2 border-solid border-transparent p-px opacity-50 outline-none hover:opacity-100 focus:border-blue-400 focus:opacity-100 dark:hover:text-white"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick(noteId);
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
  );
}

export default DeleteButton;
