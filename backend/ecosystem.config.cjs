module.exports = {
    apps: [
        {
            name: 'api',
            script: 'dist/main.js',
            max_restarts: 5,
            ignore_watch: ['node_modules', 'logs'],
            instances: 1,
            exec_mode: 'cluster',
            autorestart: true,
            watch: false,
            restart_delay: 5000,
            max_memory_restart: '512M',
            node_args: '--max-old-space-size=512'
        }
    ]
};
