import OutputConfig from "../src/solver/OutputConfig";
import Problem from "../src/solver/Problem";
import solve from "../src/solver/solve";
describe("solve", () => {
  const config: OutputConfig = { format: "string", includePageCount: true };
  test("null problem", () => {
    const problem: Problem = { allowed: [], range: { min: 0, max: 0 } };
    const results = solve(problem)(config);
    expect(results).toHaveLength(1);
  });
  test("simple problem", () => {
    const problem: Problem = { allowed: [1], range: { min: 1, max: 6 } };
    const results = solve(problem)(config);
    expect(results).toHaveLength(1);
  });
  test("test problem", () => {
    const problem: Problem = {
      allowed: [3, 4, 5],
      range: { min: 100, max: 102 },
    };
    const results = solve(problem)(config);
    expect(results).toHaveLength(8);
  });
});
