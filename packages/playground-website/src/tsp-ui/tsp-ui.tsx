import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Card,
} from "@fluentui/react-components";
import { CardUiRegular } from "@fluentui/react-icons";

import {
  Interface,
  IntrinsicScalarName,
  Namespace,
  Operation,
  Program,
  Scalar,
  Type,
  getDoc,
  getTypeName,
  isArrayModelType,
  isVoidType,
  listServices,
  type Service,
} from "@typespec/compiler";
import {
  Editor,
  OutputViewerProps,
  ProgramViewer,
  useMonacoModel,
} from "@typespec/playground/react";
import { memo } from "react";
import { ProgramProvider, useProgram } from "./context.js";
import style from "./tsp-ui.module.css";

export interface TspUIProps {}
export const TspUI = ({ program }: OutputViewerProps) => {
  const services = listServices(program);
  return (
    <ProgramProvider value={program}>
      <div className={style["tsp-ui"]}>
        <ServiceUI service={services[0]}></ServiceUI>
      </div>
    </ProgramProvider>
  );
};

export const TspUIViewer: ProgramViewer = {
  key: "tsp-ui",
  icon: <CardUiRegular />,
  label: "TSP UI",
  render: TspUI,
};

export interface ServiceUIProps {
  service: Service;
}

export const ServiceUI = memo(({ service }: ServiceUIProps) => {
  return (
    <div className={style["service-ui"]}>
      <h2>{service.title ?? getTypeName(service.type)}</h2>
      <ContainerUI container={service.type} />
    </div>
  );
});

export interface ContainerUIProps {
  container: Namespace | Interface;
}

const ContainerUI = memo(({ container }: ContainerUIProps) => {
  const program = useProgram();
  const children =
    container.kind === "Namespace"
      ? [
          ...container.namespaces.values(),
          ...container.interfaces.values(),
          ...container.operations.values(),
        ]
      : [...container.operations.values()];
  return (
    <Accordion multiple>
      {children.map((child) => {
        return (
          <AccordionItem key={child.name} value={child.name}>
            <AccordionHeader>
              <div className={style["item"]}>
                <span className={style["item-name"]}>{child.name}</span>
                <span className={style["item-description"]}>{getDoc(program, child)}</span>
              </div>
            </AccordionHeader>
            <AccordionPanel>
              {child.kind === "Namespace" || child.kind === "Interface" ? (
                <ContainerUI container={child}></ContainerUI>
              ) : (
                <OperationUI operation={child}></OperationUI>
              )}
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
});

export const OperationUI = memo(({ operation }: { operation: Operation }) => {
  return (
    <Card>
      <h4>Parameters</h4>
      <OperationParametersUI operation={operation} />
      <h4>Return type</h4>
      <ReturnTypeUI operation={operation} />
    </Card>
  );
});

const OperationParametersUI = ({ operation }: { operation: Operation }) => {
  const parametersModel = useMonacoModel(`${operation.name}/parameters.json`, "json");
  const program = useProgram();
  if (operation.parameters.properties.size === 0 && operation.parameters.indexer === undefined) {
    return <div>No parameters</div>;
  }
  const parameterExample = generateJsonSample(program, operation.parameters);
  parametersModel.setValue(JSON.stringify(parameterExample, null, 2));
  return (
    <Editor
      model={parametersModel}
      height={{ kind: "dynamic", max: 200 }}
      options={{ minimap: { enabled: false }, scrollBeyondLastLine: false }}
    ></Editor>
  );
};
const ReturnTypeUI = ({ operation }: { operation: Operation }) => {
  const returnTypeModel = useMonacoModel(`${operation.name}/returnType.json`, "json");
  const program = useProgram();
  if (isVoidType(operation.returnType)) {
    return <div>None</div>;
  }
  const example = generateJsonSample(program, operation.returnType);
  returnTypeModel.setValue(JSON.stringify(example, null, 2));
  return (
    <Editor
      model={returnTypeModel}
      height={{ kind: "dynamic", max: 200 }}
      options={{ minimap: { enabled: false }, scrollBeyondLastLine: false }}
    ></Editor>
  );
};

function generateJsonSample(program: Program, type: Type): unknown {
  switch (type.kind) {
    case "Boolean":
    case "Number":
    case "String":
      return type.value;
    case "Scalar":
      return generateScalarExample(program, type);
    case "ModelProperty":
      return generateJsonSample(program, type.type);
    case "UnionVariant":
      return generateJsonSample(program, type.type);
    case "Model":
      if (isArrayModelType(program, type)) {
        return [
          generateJsonSample(program, type.indexer.value),
          generateJsonSample(program, type.indexer.value),
        ];
      }
      return Object.fromEntries(
        Array.from(type.properties.entries()).map(([name, property]) => [
          name,
          generateJsonSample(program, property.type),
        ])
      );
    case "Union":
      return generateJsonSample(program, type.variants.values().next().value);
    default:
      return "";
  }
}

function generateScalarExample(program: Program, scalar: Scalar): unknown {
  const isStd = program.checker.isStdType(scalar);
  if (isStd) {
    return generateBuiltinScalarExample(scalar);
  } else if (scalar.baseScalar) {
    return generateScalarExample(program, scalar.baseScalar);
  } else {
    return "";
  }
}
function generateBuiltinScalarExample(scalar: Scalar & { name: IntrinsicScalarName }): unknown {
  switch (scalar.name) {
    case "bytes":
      return Buffer.from("hello").toString("base64");
    case "numeric":
      return 123;
    case "integer":
    case "int8":
    case "int16":
    case "int32":
    case "int64":
    case "safeint":
    case "uint8":
    case "uint16":
    case "uint32":
    case "uint64":
    case "float":
    case "float64":
    case "float32":
    case "decimal":
    case "decimal128":
      return 123;
    case "string":
      return "example";
    case "boolean":
      return true;
    case "plainDate":
      return "2024-05-28";
    case "utcDateTime":
    case "offsetDateTime":
      return "2024-05-28T20:47:00Z";
    case "plainTime":
      return "20:47:00Z";
    case "duration":
      return "PT20M";
    case "url":
      return "https://example.com";
    default:
      const _assertNever: never = scalar.name;
      return {};
  }
}
