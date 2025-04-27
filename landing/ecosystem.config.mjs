require("dotenv").config()

module.exports = {
    apps: [
        {
            name: "landing",
            script: ".output/server/index.mjs",
            interpreter: "node",
            max_restarts: 5,
            env: {
                NITRO_PORT: process.env.NITRO_PORT,
            },
        },
    ],
}
