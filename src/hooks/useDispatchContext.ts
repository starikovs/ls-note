import { useContext } from "react";

import DispatchContext from "../contexts/dispatch-context.ts";

export function useDispatchContext() {
  const context = useContext(DispatchContext);

  if (!context) {
    throw new Error(
      "useDispatchContext must be used within the DispatchContext.Provider and the DispatchContext.Provider should provide a corresponding value.",
    );
  }

  return context;
}
