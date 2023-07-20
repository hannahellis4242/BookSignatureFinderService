import express, { json } from "express";
import routes from "./routes/routes";
import morgan from "morgan";

const app = express();
app.use(morgan("combined"));
app.use(json());

app.use("/", routes);

const host: string = "0.0.0.0";
const port: number = 8080;
app.listen(port, host, () => console.log(`listening on ${host}:${port}`));
