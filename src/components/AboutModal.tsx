import { useRef, memo, useEffect, useCallback, MouseEvent } from "react";

declare const sa_event: (eventName: string) => void;

type AboutModalProps = {
  isOpen: boolean;
  onClose(): void;
};

const AboutModal = memo(function AboutModal({
  isOpen,
  onClose,
}: AboutModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();

      try {
        if (sa_event) {
          sa_event("About modal is opened");
        }
      } catch {
        console.warn("sa_event is not defined");
      }
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleBackdropClick = useCallback(
    (event: MouseEvent<HTMLDialogElement>) => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      const rect = dialog.getBoundingClientRect();
      const clickedOutside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

      if (clickedOutside) {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      onClick={handleBackdropClick}
      className="absolute left-5 right-5 top-5 m-0 flex min-h-fit flex-col gap-2 rounded-md p-6 text-zinc-900 lg:left-1/2 lg:top-1/2 lg:h-3/6 lg:w-3/6 lg:-translate-x-1/2 lg:-translate-y-1/2 dark:bg-zinc-700 dark:text-white"
    >
      <h1 className="text-2xl text-zinc-400">Welcome to LS Note!</h1>
      <p>
        This is a simple, offline-first, note-taking app that lives right in
        your browser. Notes are stored only in your browser's local storage. No
        data goes online — your notes stay private.
      </p>
      <p>Use it for quick plain text edits or taking temporary notes.</p>
      <h2 className="text-xl text-zinc-400">Plain text</h2>
      <p>Your notes are 100% in plain text - no formatting, no fuss.</p>
      <h2 className="text-xl text-zinc-400">Open source</h2>
      <p>
        <span className="block">
          The source code and more details are in the GitHub repository:
        </span>
        <a
          href="https://github.com/starikovs/ls-note/"
          target="_blank"
          className="text-blue-400"
        >
          <svg
            className="mr-1 inline-block h-[18px] w-[18px] text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
              clipRule="evenodd"
            />
          </svg>
          github.com/starikovs/ls-note
        </a>
      </p>
      <h2 className="text-xl text-zinc-400">Public analytics</h2>
      <p>
        <a
          href="https://dashboard.simpleanalytics.com/lsnote.website?utm_source=lsnote.website&utm_content=badge&affiliate=daqof"
          referrerPolicy="origin"
          target="_blank"
        >
          <picture>
            <source
              srcSet="https://simpleanalyticsbadges.com/lsnote.website?mode=dark"
              media="(prefers-color-scheme: dark)"
            />
            <img
              src="https://simpleanalyticsbadges.com/lsnote.website?mode=light"
              loading="lazy"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
          </picture>
        </a>
      </p>
      <p className="mt-2 text-center">
        <button
          className="rounded-md bg-zinc-200 px-6 py-2 dark:bg-zinc-900"
          onClick={handleClose}
        >
          Close
        </button>
      </p>
    </dialog>
  );
});

export default AboutModal;
