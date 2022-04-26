import { MessageConnection } from "vscode-jsonrpc";
import { ObjectRegistry } from "./object-registry.js";
import {
  ImportModuleRequest,
  MetaType,
  MethodCallRequest,
  ObjectMember,
  ObjectMetaType,
  PropertyAccessRequest,
  RemoteAccessor,
} from "./types.js";

export enum RemoteRequests {
  PropertyGet = "CADL_OBJECT_PROP_GET",
  MethodCall = "CADL_OBJECT_METHOD_CALL",
  ImportModule = "CADL_IMPORT_MODULE",
}

export function createRemoteAccessor(connection: MessageConnection): RemoteAccessor {
  const objectRegistry = new ObjectRegistry();

  function ensureObject(id: number): Record<string, any> {
    const object = objectRegistry.get(id);
    if (object === undefined) {
      throw new Error(`Cannot access object with ID ${id} it doesn't exists.`);
    }
    return object;
  }

  connection.onRequest(RemoteRequests.PropertyGet, (req: PropertyAccessRequest) => {
    const object = ensureObject(req.objectId);
    return valueToMeta(object[req.key]);
  });

  connection.onRequest(RemoteRequests.MethodCall, async (req: MethodCallRequest) => {
    const object = ensureObject(req.objectId);
    const args = req.args.map((x) => {
      switch (x.type) {
        case "value":
          return x.value;
        case "object":
          return ensureObject(x.id);
      }
    });
    const result = await object[req.key](...args);
    console.log("args", result);
    return valueToMeta(result);
  });

  connection.onRequest(RemoteRequests.ImportModule, async (req: ImportModuleRequest) => {
    const module = await import(req.name);
    return valueToMeta(module);
  });

  function valueToMeta(value: unknown): MetaType | undefined {
    switch (typeof value) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "symbol":
        return { type: "value", value };
      case "undefined":
        return undefined;
      case "object":
        if (value === null) {
          return { type: "value", value: null };
        }
        if (Array.isArray(value)) {
          return {
            type: "array",
            items: value.map((x) => valueToMeta(x)!),
          };
        }
        return objectToMeta(value);
      case "function":
        return undefined;
    }
  }

  function objectToMeta(item: Record<string, any>): ObjectMetaType {
    const id = objectRegistry.getIdFor(item);
    return {
      type: "object",
      id,
      members: getObjectMembers(item),
    };
  }

  function getObjectMembers(object: Record<string, any>): ObjectMember[] {
    let names = Object.getOwnPropertyNames(object);

    // Map properties to descriptors.
    return names.map((name) => {
      const descriptor = Object.getOwnPropertyDescriptor(object, name)!;
      let type: ObjectMember["type"];
      if (descriptor.get === undefined && typeof object[name] === "function") {
        type = "method";
      } else {
        type = "property";
      }
      return { name, type };
    });
  }

  return { valueToMeta };
}
