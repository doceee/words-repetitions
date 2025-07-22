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
            max_memory_restart: "256M",
            node_args: "--max-old-space-size=256",
            restart_delay: 5000,
            env: {
                NITRO_PORT: process.env.NITRO_PORT,
            },
        },
    ],
}
