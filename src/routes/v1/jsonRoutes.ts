import { Router } from "express";
import handleSolutionRequest from "./handleSolutionRequest";

const jsonRoutes = Router();
jsonRoutes.get(
  "/pages/:min/:max",
  handleSolutionRequest({ format: "json", includePageCount: true })
);
jsonRoutes.get(
  "/:min/:max",
  handleSolutionRequest({ format: "json", includePageCount: false })
);
export default jsonRoutes;
