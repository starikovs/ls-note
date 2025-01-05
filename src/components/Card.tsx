import { ReactNode, useEffect, useRef, useState } from "react";

function isElementVisible(element: HTMLButtonElement | null) {
  if (!element || !element.parentElement) {
    return false;
  }

  const parentRect = element.parentElement.getBoundingClientRect();
  const rect = element.getBoundingClientRect();

  return (
    rect.left >= parentRect.left &&
    rect.right <= parentRect.right &&
    rect.top >= parentRect.top &&
    rect.bottom <= parentRect.bottom
  );
}

type CardProps = {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
};

function Card({ active = false, onClick, children }: CardProps) {
  const [isImageCard, setIsImageCard] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tagName =
      ref.current?.firstElementChild?.firstElementChild?.tagName.toLowerCase();

    if (tagName === "svg" || tagName === "img") {
      setIsImageCard(true);
    }
  }, []);

  useEffect(() => {
    if (active && !isElementVisible(ref.current)) {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [active]);

  return (
    <button
      ref={ref}
      className={
        "block h-56 w-40 flex-shrink-0 cursor-pointer select-none rounded-md border-2 border-solid bg-zinc-100 p-4 text-left text-base outline-none lg:h-48 lg:w-80 dark:bg-zinc-800 dark:text-white" +
        (active
          ? " border-blue-500"
          : isImageCard
            ? " border-transparent lg:hover:bg-white lg:focus:bg-white lg:dark:hover:bg-zinc-900 lg:dark:focus:bg-zinc-900"
            : " border-transparent lg:hover:border-blue-400 lg:focus:border-blue-400") +
        (isImageCard ? " text-center" : "")
      }
      onClick={onClick}
    >
      <div
        className={
          "overflow-hidden" +
          (!isImageCard ? " flex h-full flex-col justify-between gap-2" : " ")
        }
      >
        {children}
      </div>
    </button>
  );
}

export default Card;
