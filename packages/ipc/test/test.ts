import { Program } from "@cadl-lang/compiler";
import { spawn } from "child_process";
import { createIpcConnection } from "../src/index.js";

export async function $onEmit(program: Program) {
  const cp = spawn("dotnet", ["run"], {
    cwd: "C:/dev/azsdk/cadl/packages/ipc/test/cs-client",
    stdio: "pipe",
  });
  cp.stderr.pipe(process.stderr);

  cp.stdout.on("data", (e) => {
    console.error("Stdout:", e.toString());
  });
  cp.stdin.on("data", (e) => {
    console.error("Stdin:", e.toString());
  });
  const connection = createIpcConnection(cp);
  await connection.sendRequest("test", { a: 1, b: 3 });
}
