import { Either } from "typescript-monads";
import Problem from "../solver/Problem";
import ProblemBody from "./ProblemBody";

const left = <L, R>(x: L) => new Either<L, R>(x, undefined);
const right = <L, R>(x: R) => new Either<L, R>(undefined, x);

const createProblem = (body: Partial<ProblemBody>): Either<string, Problem> => {
  const { minimum, maximum, sizes } = body;
  if (!minimum) {
    return left(
      "must give a value for the minimum number of pages in your book"
    );
  }
  if (!Number.isInteger(minimum)) {
    return left("minimum number of pages in your book must be a whole number");
  }
  if (minimum < 4) {
    return left("minumum number of pages in your book must be at least 4");
  }
  if (!maximum) {
    return left(
      "must give a value for the maximum number of pages in your book"
    );
  }
  if (!Number.isInteger(maximum)) {
    return left("minimum number of pages in your book must be a whole number");
  }
  if (maximum < minimum) {
    return left(
      "maxmum number of pages in your book must be greater than or equal to the minimum number of pages in your book"
    );
  }
  if (!sizes) {
    return left(
      "must include a list of the number of sheets per signature you wish to create your book from"
    );
  }
  if (sizes.length === 0) {
    return left(
      "the list of the number of sheets per signature you wish to create your book from must contain at least one option"
    );
  }
  const unique = Array.from(new Set(sizes)).sort();
  return right({ allowed: unique, range: { min: minimum, max: maximum } });
};
export default createProblem;
