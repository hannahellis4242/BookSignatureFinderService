import Problem from "../src/solver/Problem";

const solve = (problem: Problem) => [];

describe("solve", () => {
  test("null problem", () => {
    const problem: Problem = { allowed: [], range: { min: 0, max: 0 } };
    const results = solve(problem);
    expect(results).toHaveLength(0);
  });
});
