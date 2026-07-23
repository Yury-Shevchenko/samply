// PM2 config for the combined Express + Next.js server.
//
// IMPORTANT: instances must stay at 1 and exec_mode at "fork".
// Agenda and notificationCron must run single-instance, otherwise
// scheduled notifications get sent multiple times.

module.exports = {
  apps: [
    {
      // Canonical PM2 process name. Must match the live process (and the
      // `pm2 restart samply` in deploy.sh) so subsequent deploys and the
      // boot-time resurrect target the same entry.
      name: "samply",
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
