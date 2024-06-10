import { Uri, editor, type IDisposable } from "monaco-editor";
import { useEffect, useMemo, useRef, useState, type FunctionComponent } from "react";

export interface EditorProps {
  model: editor.IModel;
  actions?: editor.IActionDescriptor[];
  options: editor.IStandaloneEditorConstructionOptions;
  height?: { kind: "fill" } | { kind: "dynamic"; max?: number };
  onMount?: (data: OnMountData) => void;
}

export interface OnMountData {
  editor: editor.IStandaloneCodeEditor;
}

export interface EditorCommand {
  binding: number;
  handle: () => void;
}

export const Editor: FunctionComponent<EditorProps> = ({
  height,
  model,
  options,
  actions,
  onMount,
}) => {
  const editorContainerRef = useRef(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    editorRef.current = editor.create(editorContainerRef.current!, {
      model,
      ...options,
    });
    editorRef.current.onDidContentSizeChange((e) => {
      setContentHeight(e.contentHeight);
    });
    const obs = new ResizeObserver(() => {
      editorRef.current?.layout();
    });
    obs.observe(editorContainerRef.current!);
    onMount?.({ editor: editorRef.current });
  }, []);

  useEffect(() => {
    editor.setTheme(options.theme ?? "typespec");
  }, [options.theme]);

  useEffect(() => {
    const disposables: IDisposable[] = [];
    for (const command of actions ?? []) {
      disposables.push(editorRef.current!.addAction(command));
    }
    return () => {
      disposables.forEach((x) => x.dispose());
    };
  }, [actions]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setModel(model);
    }
  }, [model]);

  const resolvedHeight =
    height === undefined || height.kind === "fill"
      ? "100%"
      : contentHeight
        ? Math.min(contentHeight, height.max ?? Infinity)
        : undefined;
  return (
    <div
      className="monaco-editor-container"
      style={{ width: "100%", height: resolvedHeight, minHeight: 0 }}
      ref={editorContainerRef}
      data-tabster='{"uncontrolled": {}}' // https://github.com/microsoft/tabster/issues/316
    ></div>
  );
};

export function useMonacoModel(uri: string, language?: string): editor.IModel {
  return useMemo(() => {
    const monacoUri = Uri.parse(uri);
    return editor.getModel(monacoUri) ?? editor.createModel("", language, monacoUri);
  }, [uri, language]);
}
