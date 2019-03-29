module.exports = {
    config: {
        db: {
            seeds: {
                directory: './db/seeds'
            }
        }
    },
    corsOptions: {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    },
}