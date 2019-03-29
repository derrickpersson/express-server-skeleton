module.exports = {
    config: {
        db: {
            connection: {
                password : process.env.DB_PASSWORD,
                ssl      : process.env.DB_SSL
            },
            pool: {
                min: 2,
                max: 10
            },
        }
    }
}