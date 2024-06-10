/// <reference types="vite/client" />
import { registerMonacoDefaultWorkersForVite } from "@typespec/playground";
import PlaygroundManifest from "@typespec/playground/manifest";
import {
  Footer,
  FooterItem,
  FooterVersionItem,
  renderReactPlayground,
} from "@typespec/playground/react";
import { SwaggerUIViewer } from "@typespec/playground/react/viewers";
import samples from "../samples/dist/samples.js";

import { MANIFEST } from "@typespec/compiler";
import "@typespec/playground/styles.css";
import "./style.css";
import { TspUIViewer } from "./tsp-ui/tsp-ui.js";

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

registerMonacoDefaultWorkersForVite();

declare const __PR__: string | undefined;
declare const __COMMIT_HASH__: string | undefined;

const commit = typeof __COMMIT_HASH__ !== "undefined" ? __COMMIT_HASH__ : undefined;
const pr = typeof __PR__ !== "undefined" ? __PR__ : undefined;
const PlaygroundFooter = () => {
  const prItem = pr ? (
    <FooterItem link={`https://github.com/microsoft/typespec/pull/${pr}`}>
      <span>PR </span>
      <span>{pr}</span>
    </FooterItem>
  ) : (
    <></>
  );

  return (
    <Footer className={pr && "pr-footer"}>
      {prItem}
      <FooterVersionItem />
      <FooterItem link={`https://github.com/microsoft/typespec/commit/${commit}`}>
        <span>Commit </span>
        <span>{MANIFEST.commit.slice(0, 6)}</span>
      </FooterItem>
    </Footer>
  );
};

await renderReactPlayground({
  ...PlaygroundManifest,
  samples,
  emitterViewers: {
    "@typespec/openapi3": [SwaggerUIViewer],
  },
  importConfig: {
    useShim: true,
  },
  viewers: [TspUIViewer],
  footer: <PlaygroundFooter />,
  onFileBug: () => {
    const bodyPayload = encodeURIComponent(`\n\n\n[Playground Link](${document.location.href})`);
    const url = `https://github.com/microsoft/typespec/issues/new?body=${bodyPayload}`;
    window.open(url, "_blank");
  },
});
