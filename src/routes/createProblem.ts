import { Request } from "express";
import { Either } from "typescript-monads";
import Problem from "../solver/Problem";

const left = <L, R>(x: L) => new Either<L, R>(x, undefined);
const right = <L, R>(x: R) => new Either<L, R>(undefined, x);
const pattern: RegExp = /^\s*\[(?:\s*\d+\s*,?\s*)+\]\s*$/;

const createProblem = (req: Request): Either<string, Problem> => {
  const { min, max } = req.params;
  const { minValue, maxValue } = {
    minValue: Number.parseInt(min),
    maxValue: Number.parseInt(max),
  };
  if (isNaN(minValue)) {
    return left("minimum value must be an integer");
  }
  if (isNaN(maxValue)) {
    return left("maximum value must be an integer");
  }
  if (minValue < 4) {
    return left("minimum must be greater than 3");
  }
  if (maxValue < minValue) {
    return left("maxmum must be greater than or equal to the minimum");
  }
  const { sizes } = req.query;
  if (!sizes) {
    return left("no sizes query parameter");
  }
  if (!pattern.test(sizes.toString())) {
    return left("sizes must be an array of integers with at least one item");
  }
  const array: number[] = JSON.parse(sizes.toString());
  const unique = Array.from(new Set(array)).sort();
  return right({ allowed: unique, range: { min: minValue, max: maxValue } });
};
export default createProblem;
