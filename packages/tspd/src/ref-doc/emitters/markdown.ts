import {
  DecoratorRefDoc,
  EmitterOptionRefDoc,
  ExampleRefDoc,
  NamespaceRefDoc,
  TypeSpecLibraryRefDoc,
  TypeSpecRefDoc,
  TypeSpecRefDocBase,
} from "../types.js";
import {
  MarkdownDoc,
  codeblock,
  headings,
  inlinecode,
  renderMarkdowDoc,
  section,
  table,
} from "../utils/markdown.js";
import { getTypeSignature } from "../utils/type-signature.js";

export function renderReadme(refDoc: TypeSpecRefDoc) {
  const content: MarkdownDoc[] = [];

  if (refDoc.description) {
    content.push(refDoc.description);
  }

  content.push(section("Install", [codeblock(`npm install ${refDoc.name}`, "bash")]));

  if (refDoc.emitter?.options) {
    content.push(renderEmitterUsage(refDoc));
  }

  if (refDoc.namespaces.some((x) => x.decorators.length > 0)) {
    content.push(section("Decorators", renderDecoratorSection(refDoc)));
  }

  return renderMarkdowDoc(section(refDoc.name, content));
}

export function renderEmitterUsage(refDoc: TypeSpecLibraryRefDoc): MarkdownDoc {
  if (refDoc.emitter?.options === undefined) {
    return [];
  }

  return section("Emitter usage", [
    section("Usage", [
      "1. Via the command line",
      codeblock(`tsp compile . --emit=${refDoc.name}`, "bash"),
      "2. Via the config",
      codeblock(`emit:\n  - "${refDoc.name}" `, "yaml"),
    ]),
    renderEmitterOptions(refDoc.emitter.options),
  ]);
}

function renderEmitterOptions(options: EmitterOptionRefDoc[]): MarkdownDoc {
  const content = [];
  for (const option of options) {
    content.push(headings.h3(`${inlinecode(option.name)}`));
    content.push(`**Type:** ${inlinecode(option.type)}`, "");

    content.push(option.doc);
  }
  return section("Emitter options", content);
}

export function renderDecoratorSection(refDoc: TypeSpecRefDocBase): MarkdownDoc {
  return groupByNamespace(refDoc.namespaces, (namespace) => {
    if (namespace.decorators.length === 0) {
      return undefined;
    }
    return namespace.decorators.map((x) => [renderDecoratorMarkdown(x), ""]);
  });
}

function renderDecoratorMarkdown(dec: DecoratorRefDoc, headingLevel: number = 3): MarkdownDoc {
  const content: MarkdownDoc = ["", dec.doc, codeblock(dec.signature, "typespec"), ""];

  content.push(
    headings.hx(headingLevel + 1, "Target"),
    dec.target.doc,
    inlinecode(getTypeSignature(dec.target.type.type)),
    ""
  );

  if (dec.parameters.length > 0) {
    const paramTable: string[][] = [["Name", "Type", "Description"]];
    for (const param of dec.parameters) {
      paramTable.push([param.name, inlinecode(getTypeSignature(param.type.type)), param.doc]);
    }
    content.push(headings.hx(headingLevel + 1, "Parameters"), table(paramTable), "");
  } else {
    content.push(headings.hx(headingLevel + 1, "Parameters"), "None", "");
  }

  content.push(renderExamples(dec.examples, headingLevel + 1));

  return section(`${inlinecode(dec.name)} {#${dec.id}}`, content);
}

export function renderExamples(examples: ExampleRefDoc[], headingLevel: number): MarkdownDoc {
  const content: MarkdownDoc = [];
  if (examples.length === 0) {
    return "";
  }

  content.push(headings.hx(headingLevel, "Examples"));
  for (const example of examples) {
    if (example.title) {
      content.push(headings.hx(headingLevel + 1, example.title));
    }
    content.push("", example.content, "");
  }
  return content;
}

export function groupByNamespace(
  namespaces: NamespaceRefDoc[],
  callback: (namespace: NamespaceRefDoc) => MarkdownDoc | undefined
): MarkdownDoc {
  const content: MarkdownDoc = [];
  for (const namespace of namespaces) {
    const contentForNamespace = callback(namespace);
    if (contentForNamespace) {
      content.push(section(namespace.id, contentForNamespace));
    }
  }
  return content;
}
