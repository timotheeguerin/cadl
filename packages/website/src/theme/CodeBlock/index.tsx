import { withTspPlayground } from "@site/src/components/tsp-tryit-codeblock/with-tsp-playground";
import CodeBlockDocusaurus from "@theme-original/CodeBlock";
import clsx from "clsx";

export default withTspPlayground((props) => (
  <CodeBlockDocusaurus className={clsx(props.className, "shiki")} {...props} />
));
