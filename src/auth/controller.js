import { authService } from "./";
import { userService } from "../users";
import { HTTPStatus } from "../server/models";

export class AuthController {
    register = async (req, res) => {
        if(this.__isInvalidBody(req)) {
            return this.__invalidBodyResponse(res);
        }
        const user = await userService.insertUser({ email: req.body.email, password: req.body.password });
        const token = authService.createNewToken(user);
        return res.status(HTTPStatus.created).send({ token });
    }

    login = async (req, res) => {
        if(this.__isInvalidBody(req)) {
            return this.__invalidBodyResponse(res);
        }

        const user = await userService.getUserByEmail(req.body.email);

        if (!user) {
            return res.status(HTTPStatus.notAuthorized).send( { message: "Invalid email and password" });
        }

        const match = await userService.checkPassword(user, req.body.password);

        if (!match) {
            return res.status(HTTPStatus.notAuthorized).send( { message: "Invalid email and password" });
        }

        const token = authService.createNewToken(user);
        return res.status(HTTPStatus.OK).send({ token });
    }


    __isInvalidBody = (req) => {
        if(!req.body.email || !req.body.password) {
            return true
        }

        return false;
    }

    __invalidBodyResponse = (res) => {
        return res.status(HTTPStatus.badRequest).send({ message: "Bad Request: missing data" });
    }

}

const authController = new AuthController();

export default authController;