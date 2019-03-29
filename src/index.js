import { app } from "./server";
import { config } from "../config";

app.listen(config.port, () => { console.log(`Listening on port ${config.port}`)});