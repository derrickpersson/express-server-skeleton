import { makeUserService } from "../service";
import bcrypt from "bcrypt";

describe("userService", () => {
    test("inserting user", async () => {
        expect.assertions(1);
        const testUser = {
            email: "anyEmail",
            password: "anyPassword"
        };
        const mockUsersId = [1];


        const mockDb = function(table){
            return {
                returning: function(field){
                    return {
                        insert: jest.fn(function(userInfo){
                            return new Promise(function(resolve, reject){
                                return resolve(mockUsersId);
                            });
                        }),
                    }
                }
            }
        };

        const userService = makeUserService(mockDb);

        const userId = await userService.insertUser(testUser)
        expect(userId).toBe(mockUsersId[0]);
    });

    test("should return user by id", async () => {
        expect.assertions(1);

        const testUser = {
            id: 1,
            email: "anyEmail",
        };
        
        const mockDb = {
            select: function() {
                return {
                    from: function() {
                        return {
                            where: jest.fn( function(userId) {
                                return new Promise(function(resolve, reject){
                                    return resolve([testUser]);
                                });
                            })
                        }
                    }
                }
            }
        }

        const userService = makeUserService(mockDb);

        userService.getUserByID(1).then((user) => {
            expect(user).toBe(testUser);
        });
    });

    test("should return user by email", () => {
        expect.assertions(1);

        const testUser = {
            id: 1,
            email: "anyEmail",
        };
        
        const mockDb = {
            select: function() {
                return {
                    from: function() {
                        return {
                            where: jest.fn( function(userId) {
                                return new Promise(function(resolve, reject){
                                    return resolve([testUser]);
                                });
                            })
                        }
                    }
                }
            }
        }

        const userService = makeUserService(mockDb);

        userService.getUserByEmail(testUser.email).then((user) => {
            expect(user).toBe(testUser);
        });
    });
    
    test("should validate password correctly", async () => {
        const testUser = {
            email: "anyEmail",
            password: "anyPassword"
        }

        const hashedPassword = bcrypt.hashSync(testUser.password, 10);
        testUser.password = hashedPassword;

        const userService = makeUserService({});

        const testPassword = "anyPassword";

        const matchedPassword = await userService.checkPassword(testUser, testPassword);

        expect(matchedPassword).toEqual(true);
    });

    test("should validate password is incorrect", async () => {
        const testUser = {
            email: "anyEmail",
            password: "anyPassword"
        }

        const hashedPassword = bcrypt.hashSync(testUser.password, 10);
        testUser.password = hashedPassword;

        const userService = makeUserService({});

        const testPassword = "wrongPassword";

        const matchedPassword = await userService.checkPassword(testUser, testPassword);

        expect(matchedPassword).toEqual(false);
    });

    test("checkPassword should fail if bad data passed", async (done) => {
        const testUser = {
            email: "anyEmail",
            password: "anyPassword"
        }

        const hashedPassword = bcrypt.hashSync(testUser.password, 10);
        testUser.password = hashedPassword;

        const userService = makeUserService({});

        const testPassword = {};
        try {
            expect(await userService.checkPassword(testUser, testPassword)).toThrow();
        } catch (e) {
            done();
        }

    });

});

