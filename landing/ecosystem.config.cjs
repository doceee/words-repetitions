require("dotenv").config()

module.exports = {
    apps: [
        {
            name: "landing",
            script: ".output/server/index.mjs",
            interpreter: "node",
            instances: 1,
            exec_mode: "cluster",
            watch: false,
            max_restarts: 5,
            env: {
                NITRO_PORT: process.env.NITRO_PORT,
            },
        },
    ],
}
