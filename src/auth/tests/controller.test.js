import authController from "../controller";

jest.mock('../../users/service', () => {
    const testUser = {
        id: 1,
        email: "anyEmail",
        password: "anyPassword"
    }

    return {
        insertUser: jest.fn(() => {
            return testUser.id;
        }),
        getUserByID: jest.fn(() => {
            return testUser;
        }),
        getUserByEmail: jest.fn(() => {
            return testUser;
        }),
        checkPassword: jest.fn(() => {
            return true;
        }),
    };
});

describe("auth controller", () => {

    const req = {
        body: {
            email: "anyEmail",
            password: "anyPassword"
        }
    };

    const send = jest.fn(message => message);

    const res = {
        status: jest.fn(() => {
            return {
                send,        
            };
        }),
    };
    
    test("register creates a new user", async () => {
        await authController.register(req, res);

        expect(res.status).toBeCalledWith(201);
        expect(send).toBeCalled();
    });

    test("invalid body sent for register", async () => {
        const invalidReqBody = {
            ...req,
            body: {
                email: "anyEmail"
            }
        };

        await authController.register(invalidReqBody, res);

        expect(res.status).toBeCalledWith(400);
        expect(send).toBeCalled();
    });

    test("login an existing user", async () => {
        await authController.login(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(send).toBeCalled();
    });

    test("invalid body sent for login", async () => {
        const invalidReqBody = {
            ...req,
            body: {
                email: "anyEmail"
            }
        };

        await authController.login(invalidReqBody, res);

        expect(res.status).toBeCalledWith(400);
        expect(send).toBeCalled();
    });
});