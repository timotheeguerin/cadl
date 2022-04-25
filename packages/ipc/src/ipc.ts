import { ChildProcess } from "child_process";
import {
  createMessageConnection,
  StreamMessageReader,
  StreamMessageWriter,
} from "vscode-jsonrpc/node.js";
import { CadlIpcConnection } from "./types.js";

export function createIpcConnection(childProcess: ChildProcess): CadlIpcConnection {
  const connection = createMessageConnection(
    new StreamMessageReader(childProcess.stdout!),
    new StreamMessageWriter(childProcess.stdin!),
    {
      error(message) {
        // eslint-disable-next-line no-console
        console.error("rpc:error: ", message);
      },
      info(message) {
        // eslint-disable-next-line no-console
        console.error("rpc:info: ", message);
      },
      log(message) {
        // eslint-disable-next-line no-console
        console.error("rpc:log: ", message);
      },
      warn(message) {
        // eslint-disable-next-line no-console
        console.error("rpc:warn: ", message);
      },
    }
  );

  connection.listen();

  function sendNotification(name: string, value: unknown) {
    connection.sendNotification(name, value);
  }
  function sendRequest(name: string, value: unknown) {
    return connection.sendRequest(name, value);
  }

  connection.onRequest((req) => {
    console.log("Got request", req);
  });

  return {
    sendNotification,
    sendRequest,
  };
}
