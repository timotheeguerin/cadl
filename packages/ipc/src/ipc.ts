import { ChildProcess } from "child_process";
import {
  createMessageConnection,
  StreamMessageReader,
  StreamMessageWriter,
} from "vscode-jsonrpc/node.js";
import { CadlIpcConnection, PropertyAccessRequest } from "./types.js";

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

  function sendRequest(name: string, value: unknown) {
    return connection.sendRequest(name, value);
  }

  connection.onRequest("CADL_OBJECT_PROP_ACCESS", (req: PropertyAccessRequest) => {
    const object = objects.get(req.objectId);
    if (object === undefined) {
      return undefined;
    }

    return Promise.resolve(ipcify(object[req.key]));
  });

  const objectIds = new Map<any, number>();
  const objects = new Map<number, any>();
  let idCounter = 0;

  function ipcify(item: unknown) {
    switch (typeof item) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "symbol":
        return item;
      case "undefined":
        return undefined;
      case "object":
        if (item === null) {
          return null;
        }
        return ipcifyObject(item);
      case "function":
        return undefined;
    }
  }

  function ipcifyObject(item: object) {
    if (Array.isArray(item)) {
      return undefined; // Todo implement array
    }
    let id = objectIds.get(item);
    if (id === undefined) {
      id = idCounter++;
      objects.set(id, item);
      objectIds.set(item, id);
    }

    return {
      type: "object",
      id,
      properties: Object.keys(item),
    };
  }

  return {
    sendRequest,
    ipcify,
  };
}

export interface IpcObject {
  type: "object";
  id: number;
  properties: string[];
}
