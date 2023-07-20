import express, { json } from "express";
import jsonRoutes from "./routes/v1/jsonRoutes";
import stringRoutes from "./routes/v1/stringRoutes";
import v2 from "./routes/v2/v2";
import morgan from "morgan";

const app = express();
app.use(morgan("combined"));
app.use(json());

app.use("/json", jsonRoutes);
app.use("/string", stringRoutes);
app.use("/v2", v2);

const host: string = "0.0.0.0";
const port: number = 8080;
app.listen(port, host, () => console.log(`listening on ${host}:${port}`));
