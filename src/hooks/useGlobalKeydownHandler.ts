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
          upHandler();
        } else if (event.code === "KeyJ" || event.code === "KeyL") {
          downHandler();
        } else if (event.code === "KeyD") {
          deleteHandler();
        } else if (event.code === "KeyN") {
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
