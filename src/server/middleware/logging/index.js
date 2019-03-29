import "dotenv";
import { winston } from "./winston";
import morgan from "morgan";

const logger = {
    general: morgan('dev'),
    error: process.env.NODE_ENV === "production" ? winston.error : morgan('dev'),
}

export { logger };