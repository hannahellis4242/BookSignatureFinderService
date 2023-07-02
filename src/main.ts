import express, { json } from "express";
import jsonRoutes from "./routes/jsonRoutes";
import stringRoutes from "./routes/stringRoutes";
import morgan from "morgan";

const app = express();
app.use(morgan("combined"));
app.use(json());

app.use("/json", jsonRoutes);
app.use("/string", stringRoutes);

const host: string = "0.0.0.0";
const port: number = 8080;
app.listen(port, host, () => console.log(`listening on ${host}:${port}`));
