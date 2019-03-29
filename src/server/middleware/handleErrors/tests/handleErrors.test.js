import handleErrors from "../handleErrors";

jest.mock("../../logging", () => {
    return { logger: {
            error: jest.fn(),
        },
    };
})



describe("handleErrors", () => {
    test("should log error & send back 500 status", () => {
        const next = jest.fn();
        const req = {
            originalUrl: "/test",
            method: "GET",
            ip: "127.0.0.1"
        };
        const res = {
            data: null,
            code: null,
            status (status) {
                this.code = status;
                return this;
            },
            send (payload) {
                this.data = payload;
            }
        };
        
        handleErrors(new Error({
            status: 500,
            message: "Test Error"
        }), req, res, next);
        expect(res.code).toBe(500);
    });
});