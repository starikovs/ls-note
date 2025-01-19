import { useEffect } from "react";

const useGlobalKeydownHandler = (
  upHandler: () => void,
  downHandler: () => void,
  deleteHandler: () => void,
  addHandler: () => void,
) => {
  useEffect(() => {
    const keypressHandler = (event: KeyboardEvent) => {
      if (event.altKey && event.ctrlKey) {
        if (event.code === "KeyK" || event.code === "KeyH") {
          event.preventDefault();
          upHandler();
        } else if (event.code === "KeyJ" || event.code === "KeyL") {
          event.preventDefault();
          downHandler();
        } else if (event.code === "KeyD") {
          event.preventDefault();
          deleteHandler();
        } else if (event.code === "KeyN") {
          event.preventDefault();
          addHandler();
        }
      }
    };

    addEventListener("keydown", keypressHandler);

    return () => {
      removeEventListener("keydown", keypressHandler);
    };
  }, [upHandler, downHandler, deleteHandler]);
};

export default useGlobalKeydownHandler;
