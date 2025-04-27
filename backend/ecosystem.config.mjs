module.exports = {
    apps: [
        {
            name: 'api',
            script: 'dist/src/main',
            max_restarts: 5,
            watch: false,
            ignore_watch: ['node_modules', 'logs'],
            instances: 'max',
            exec_mode: 'cluster',
            autorestart: true,
            restart_delay: 5000,
            max_memory_restart: '1G',
            node_args: '--max-old-space-size=4096'
        }
    ]
};
