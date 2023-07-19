import { Router } from "express";
import { createClient, RedisClientType } from "redis";
import createProblem from "../v2/createProblem";
import { StatusCodes } from "http-status-codes";
import createConfig from "./createConfig";
import Problem from "../../solver/Problem";
import OutputConfig from "../../solver/OutputConfig";
import solve from "../../solver/solve";
import { v4 } from "uuid";

const v2 = Router();
const client = createClient();

v2.post("/", async (req, res) => {
  const problemResult = createProblem(req.body);
  if (problemResult.isLeft()) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(problemResult.match({ left: (x) => x, right: () => "" }));
    return;
  }
  const configResult = createConfig(req.body);
  if (configResult.isLeft()) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(configResult.match({ left: (x) => x, right: () => "" }));
    return;
  }
  const problem: Problem = problemResult.match({
    left: (_) => ({ allowed: [], range: { min: 0, max: 0 } }),
    right: (x) => x,
  });
  const config: OutputConfig = configResult.match({
    left: (_) => ({ format: "text", includePageCount: true }),
    right: (x) => x,
  });
  const solutions = solve(problem)(config);
  try {
    await client.connect();
    const key = v4();
    await client.set(key, JSON.stringify(solutions));
    res.send(key);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(JSON.stringify(e));
  } finally {
    await client.disconnect();
  }
});
