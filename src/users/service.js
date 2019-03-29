import { knex } from "../../db";
import bcrypt from "bcrypt";

export function makeUserService(db) {
  return {
    insertUser: async function(userData){
      let { email, password } = userData;
      const hashedPassword = await bcrypt.hash(password, 10);
      const users = await db('users').returning('id').insert({
        email,
        password: hashedPassword,
      });
      return users[0];
    },
    getUserByID: async function(id) {
      const users = await db.select("*").from('users').where('id', id);
      return users[0];
    },
    getUserByEmail: async function(email) {
        const users = await db.select("*").from('users').where('email', email);
        return users[0];
    },
    checkPassword: function(user, password) {
      const hashedPassword = user.password;
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, ((err, same) => {
          if(err){
            reject(err);
          }
          resolve(same);
        }))
      })
    }
  }
}

export const userService = makeUserService(knex);

export default userService;
