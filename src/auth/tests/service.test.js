import authService from "../service";
import { config } from "../../../config";
import jwt from 'jsonwebtoken';

describe("authService", () => {
    test("creates a new token", () => {
        const testUser = {
            id: 100
        };
        const token = authService.createNewToken(testUser)
        const payload = jwt.verify(token, config.secrets.jwt);

        expect(payload.id).toBe(testUser.id);
    });

    test("verfies token", async () => {
        const testUser = {
            id: 100
        };


        const token = jwt.sign({ id: testUser.id }, config.secrets.jwt, {
            expiresIn: config.secrets.jwtExp
        });

        const payload = await authService.verifyToken(token);

        expect(payload.id).toEqual(testUser.id);
    });
})