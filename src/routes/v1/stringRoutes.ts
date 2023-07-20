import { Router } from "express";
import handleSolutionRequest from "./handleSolutionRequest";

const stringRoutes = Router();
stringRoutes.get(
  "/pages/:min/:max",
  handleSolutionRequest({ format: "text", includePageCount: true })
);
stringRoutes.get(
  "/:min/:max",
  handleSolutionRequest({ format: "text", includePageCount: false })
);
export default stringRoutes;
