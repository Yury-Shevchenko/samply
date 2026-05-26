// Temporary PM2 config for the PR 3 staging deploy.
//
// Runs the combined server on port 3100 alongside the existing
// Express (3000) and Next.js (3001) processes. Used to validate the
// combined server in production conditions without affecting users.
//
// IMPORTANT: This file is for the staging-validation window only.
// Delete (or stop the app) once cutover (PR 4) is complete.
//
// Usage:
//   pm2 start ecosystem.staging.config.js
//   pm2 logs samply-staging --lines 50
//   pm2 stop samply-staging         # to tear down

module.exports = {
  apps: [
    {
      name: "samply-staging",
      cwd: __dirname,
      script: "server.js",
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: "3100",
        // Override so NextAuth callback URLs match the temporary staging listener.
        NEXTAUTH_URL: "https://samply.uni-konstanz.de:4002",
      },
    },
  ],
};
