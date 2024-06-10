import { Program } from "@typespec/compiler";
import { createContext, useContext } from "react";

const ProgramContext = createContext<Program | undefined>(undefined);

export const ProgramProvider = ProgramContext.Provider;
export function useProgram(): Program {
  const program = useContext(ProgramContext);
  if (program === undefined) {
    throw new Error("useProgram must be used within a ProgramProvider");
  }
  return program;
}
