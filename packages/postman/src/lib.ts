import { createTypeSpecLibrary, JSONSchemaType } from "@typespec/compiler";

export type FileType = "yaml" | "json";
export interface PostmanEmitterOptions {}

const EmitterOptionsSchema: JSONSchemaType<PostmanEmitterOptions> = {
  type: "object",
  additionalProperties: false,
  properties: {},
  required: [],
};

export const libDef = {
  name: "@typespec/postman",
  diagnostics: {},
  emitter: {
    options: EmitterOptionsSchema as JSONSchemaType<PostmanEmitterOptions>,
  },
} as const;

export const $lib = createTypeSpecLibrary(libDef);
export const { reportDiagnostic, createStateSymbol } = $lib;

export type OpenAPILibrary = typeof $lib;
