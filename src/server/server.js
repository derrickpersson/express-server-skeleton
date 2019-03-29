import { knexLogger } from "../../db";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import healthCheck from "express-healthcheck";
import { 
    handleErrors,
    logger
} from "./middleware";
import { config } from "../../config";
import auth from "../auth/routes";

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors(config.corsOptions));

app.use(knexLogger);

app.use(bodyParser.json());

app.use(logger.general);

app.use('/health', healthCheck());

app.get('/info', async function (req, res) {
    const packageJson = require("../../package.json");
    res.send({
        name: packageJson.name,
        description: packageJson.description,
        version: packageJson.version
    });
})

app.use('/auth', auth);

app.use(handleErrors);

export default app;