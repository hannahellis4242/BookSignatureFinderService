import { Either } from "typescript-monads";
import ProblemBody from "./ProblemBody";
import OutputConfig from "../solver/OutputConfig";
import Format from "../solver/Format";

const left = <L, R>(x: L) => new Either<L, R>(x, undefined);
const right = <L, R>(x: R) => new Either<L, R>(undefined, x);

const parseFormat = (formatStr: string): Format | undefined => {
  switch (formatStr) {
    case "json":
      return "json";
    case "text":
      return "text";
    default:
      return undefined;
  }
};

const createConfig = (
  body: Partial<ProblemBody>
): Either<string, OutputConfig> => {
  const { format, pageCount } = body;
  if (!format) {
    return left("must specify the output format");
  }
  const formatValue = parseFormat(format);
  if (!formatValue) {
    return left('format can either be "text" or "json"');
  }
  if (pageCount === undefined) {
    return left("must specify if a page count is required or not");
  }
  return right({ format: formatValue, includePageCount: pageCount });
};
export default createConfig;
