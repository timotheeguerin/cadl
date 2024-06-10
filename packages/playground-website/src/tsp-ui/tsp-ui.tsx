import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from "@fluentui/react-components";
import { CardUiRegular } from "@fluentui/react-icons";

import {
  Interface,
  Namespace,
  getDoc,
  getTypeName,
  listServices,
  type Service,
} from "@typespec/compiler";
import { OutputViewerProps, ProgramViewer } from "@typespec/playground/react";
import { memo } from "react";
import { ProgramProvider, useProgram } from "./context.js";
import style from "./tsp-ui.module.css";

export interface TspUIProps {}
export const TspUI = ({ program }: OutputViewerProps) => {
  const services = listServices(program);
  return (
    <ProgramProvider value={program}>
      <ServiceUI service={services[0]}></ServiceUI>
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
              {child.name} {getDoc(program, child)}
            </AccordionHeader>
            <AccordionPanel>
              {child.kind === "Namespace" || child.kind === "Interface" ? (
                <ContainerUI container={child}></ContainerUI>
              ) : (
                <div>Op {child.name}</div>
              )}
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
});
