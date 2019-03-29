import { logger } from "../";
import { HTTPStatus } from "../../models";

const handleErrors = (error, req, res, next) => {
    res.status(HTTPStatus.serverError).send({ message: "Oops, something went wrong!" });
    logger.error(`${error.status || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    next(error);
};

export default handleErrors;