// PM2 config for the combined Express + Next.js server.
//
// IMPORTANT: instances must stay at 1 and exec_mode at "fork".
// Agenda and notificationCron must run single-instance, otherwise
// scheduled notifications get sent multiple times.

module.exports = {
  apps: [
    {
      // Distinct from the old PM2 entry "samply" so rollback is just
      // `pm2 stop samply-combined && pm2 start samply`. After Stage 3c
      // stability, you can rename to "samply" (or just leave as-is).
      name: "samply-combined",
      cwd: __dirname,
      script: "server.js",
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "1G",
      env_production: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
  ],
};
