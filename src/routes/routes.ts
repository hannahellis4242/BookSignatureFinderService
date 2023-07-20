import { Router } from "express";
import { createClient } from "redis";
import createProblem from "./createProblem";
import { StatusCodes } from "http-status-codes";
import createConfig from "./createConfig";
import Problem from "../solver/Problem";
import OutputConfig from "../solver/OutputConfig";
import solve from "../solver/solve";
import { v4 } from "uuid";

const routes = Router();
const client = createClient({
  url: "redis://redis:6379",
});

routes.post("/", async (req, res) => {
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
    await client.set(key, JSON.stringify(solutions), { EX: 120 });
    res.send(key);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(JSON.stringify(e));
  } finally {
    await client.disconnect();
  }
});

routes.get("/", async (req, res) => {
  const { key } = req.query;
  if (!key) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send("expect a query parameter called key");
    return;
  }
  try {
    await client.connect();
    const solution = await client.get(key.toString());
    if (!solution) {
      res.sendStatus(StatusCodes.NOT_FOUND);
      return;
    }
    res.json(JSON.parse(solution));
  } catch (e) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  } finally {
    client.disconnect();
  }
});
export default routes;
