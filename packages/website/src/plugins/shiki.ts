import rehypeShiki, { RehypeShikiOptions } from "@shikijs/rehype";
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
} from "@shikijs/transformers";
import { readFileSync } from "fs";
import { resolve } from "path";
import { bundledLanguages } from "shiki";

const root = resolve(__dirname, "../../../..");
const typespecTmLanguage = JSON.parse(
  readFileSync(resolve(root, "grammars/typespec.json"), "utf-8")
);
export const RehypeShikiPlugin = [
  rehypeShiki,
  {
    themes: {
      dark: "one-dark-pro",
      light: "min-light",
    },
    transformers: [
      transformerMetaHighlight(),
      transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerNotationFocus(),
    ],
    langs: [
      ...(Object.keys(bundledLanguages) as Array<keyof typeof bundledLanguages>),
      typespecTmLanguage,
    ],
  } satisfies RehypeShikiOptions,
];
