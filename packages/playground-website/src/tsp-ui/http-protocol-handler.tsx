import { Interface, Namespace, Operation, Program } from "@typespec/compiler";
import { HttpServer, getHttpOperation, getServers } from "@typespec/http";
import { useProgram } from "./context.js";
import { ProtocolHandler } from "./tsp-ui.js";

export const httpProtocolHandler: ProtocolHandler = {
  operationDetails: ({ operation }) => {
    const program = useProgram();
    const httpOp = getHttpOperation(program, operation)[0];
    return (
      <div>
        <pre>
          {httpOp.verb} {httpOp.path}
        </pre>
      </div>
    );
  },
  request: async (program, operation, parameters) => {
    const httpOperation = getHttpOperation(program, operation)[0];
    const server = findServer(program, operation);
    if (server === undefined) {
      console.log("No server found for", operation.name);
      return;
    }
    console.log("Sending", httpOperation.verb, httpOperation.path, server?.url, parameters);
    const headers: Record<string, string> = {};

    const interpolatedPath = httpOperation.path.replace(/\{[^}]+\}/g, (match) => {
      return (parameters as any)[match.slice(1, -1)];
    });
    await fetch(server.url + interpolatedPath, {
      method: httpOperation.verb,
      headers,
    });
  },
};

function findServer(
  program: Program,
  type: Operation | Interface | Namespace
): HttpServer | undefined {
  if (type.kind === "Namespace") {
    const servers = getServers(program, type);
    if (servers && servers.length > 0) {
      return servers[0];
    }
  }
  if (type.kind === "Operation" && type.interface) {
    return findServer(program, type.interface);
  }
  if (type.namespace) {
    return findServer(program, type.namespace);
  }
  return undefined;
}
