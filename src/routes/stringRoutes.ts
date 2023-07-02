import { Router } from "express";
import handleSolutionRequest from "./handleSolutionRequest";

const stringRoutes = Router();
stringRoutes.get(
  "/pages/:min/:max",
  handleSolutionRequest({ format: "string", includePageCount: true })
);
stringRoutes.get(
  "/:min/:max",
  handleSolutionRequest({ format: "string", includePageCount: false })
);
export default stringRoutes;
