import Problem from "../src/solver/Problem";
import { EmptySignatureKey } from "../src/solver/SignatureKey";
import SolutionVisitor from "../src/solver/SolutionVisitor";
import { OutputStringVisitor } from "../src/solver/OutputVisitor";
//import GraphVisitor from "../src/solver/Visitors/GraphVisitor";
import ComponentCache from "../src/solver/ComponentCache";

const solve = (problem: Problem) => {
  const cache = new ComponentCache(problem);
  cache.get(EmptySignatureKey()); //kicks off tree construction
  /*{
    const graphVisitor = new GraphVisitor();
    Array.from(cache.data.values()).forEach((v) => v.visit(graphVisitor));
    console.log(graphVisitor.toDot());
  }*/
  const solutonVisitor = new SolutionVisitor(problem);
  Array.from(cache.data.values()).forEach((v) => v.visit(solutonVisitor));
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
  test("test problem", () => {
    const problem: Problem = {
      allowed: [3, 4, 5],
      range: { min: 100, max: 102 },
    };
    const visitor = new OutputStringVisitor();
    const results = solve(problem).map((x) => x.visit(visitor));
    expect(results).toHaveLength(8);
  });
});
