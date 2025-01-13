import { useState, MouseEvent } from "react";
import { createPortal } from "react-dom";

import AboutModal from "./AboutModal.tsx";

function InfoButton() {
  const [isModalShown, setIsModalShown] = useState(false);
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsModalShown((value) => !value);
  };

  return (
    <>
      {createPortal(
        <AboutModal
          isOpen={isModalShown}
          onClose={() => setIsModalShown(false)}
        />,
        document.body,
      )}
      <a
        href="#"
        className="absolute right-1 top-0.5 opacity-75 hover:opacity-95"
        target="_blank"
        onClick={handleClick}
      >
        <svg
          className="h-[18px] w-[18px] text-gray-800 dark:text-white"
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
            strokeWidth="2"
            d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </a>
    </>
  );
}

export default InfoButton;
