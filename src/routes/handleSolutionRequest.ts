import { RequestHandler } from "express";
import OutputConfig from "../solver/OutputConfig";
import createProblem from "./createProblem";
import { StatusCodes } from "http-status-codes";
import Problem from "../solver/Problem";
import solve from "../solver/solve";

const handleSolutionRequest =
  (config: OutputConfig): RequestHandler =>
  (req, res) => {
    const problemResult = createProblem(req);
    if (problemResult.isLeft()) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send(problemResult.match({ left: (x) => x, right: () => "" }));
      return;
    }
    const problem: Problem = problemResult.match({
      left: (x) => ({ allowed: [], range: { min: 0, max: 0 } }),
      right: (x) => x,
    });
    const solveProblem = solve(problem);
    res.json(solveProblem(config));
  };
export default handleSolutionRequest;
