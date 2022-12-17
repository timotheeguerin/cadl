import { createCadlLibrary, JSONSchemaType } from "@cadl-lang/compiler";

export interface HttpLowLevelOptions {}

const EmitterOptionsSchema: JSONSchemaType<HttpLowLevelOptions> = {
  type: "object",
  additionalProperties: false,
  properties: {},
  required: [],
};

export const $lib = createCadlLibrary({
  name: "@cadl-lang/http-low-level",
  diagnostics: {},
  emitter: {
    options: EmitterOptionsSchema as JSONSchemaType<HttpLowLevelOptions>,
  },
} as const);
export const { reportDiagnostic, createStateSymbol } = $lib;

export type OpenAPILibrary = typeof $lib;
