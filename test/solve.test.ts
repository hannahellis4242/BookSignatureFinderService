import Problem from "../src/solver/Problem";
import Composite from "../src/solver/Composite";
import { EmptySignatureKey } from "../src/solver/SignatureKey";
import SolutionVisitor from "../src/solver/SolutionVisitor";

const root = (problem: Problem) =>
  new Composite(problem, EmptySignatureKey(), 0);

const solve = (problem: Problem) => {
  const tree = root(problem);
  const solutonVisitor = new SolutionVisitor(problem);
  tree.visitRecursive(solutonVisitor);
  return solutonVisitor.getSolutions();
};

describe("solve", () => {
  test("null problem", () => {
    const problem: Problem = { allowed: [], range: { min: 0, max: 0 } };
    const results = solve(problem);
    expect(results).toHaveLength(1);
  });
  test("simple problem", () => {
    const problem: Problem = { allowed: [1], range: { min: 1, max: 6 } };
    const results = solve(problem);
    expect(results).toHaveLength(1);
  });
});
