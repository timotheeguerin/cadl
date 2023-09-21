import {
  EmitContext,
  Program,
  Service,
  emitFile,
  getDoc,
  getTypeName,
  listServices,
  resolvePath,
} from "@typespec/compiler";
import type { CollectionDefinition } from "postman-collection";
import postman from "postman-collection";
import { PostmanEmitterOptions } from "./lib.js";
const { Collection } = postman;

export async function $onEmit(context: EmitContext<PostmanEmitterOptions>) {
  const services = listServices(context.program);
  for (const service of services) {
    const collection = new Collection(getDefinition(context.program, service));
    await emitFile(context.program, {
      path: resolvePath(context.emitterOutputDir, "postman.json"),
      content: JSON.stringify(collection.toJSON(), null, 2),
    });
    break; // TODO support multiple services
  }
}

function getDefinition(program: Program, service: Service): CollectionDefinition {
  return {
    info: {
      name: service.title ?? getTypeName(service.type),
      version: service.version,
    },
    description: getDoc(program, service.type),
  };
}
