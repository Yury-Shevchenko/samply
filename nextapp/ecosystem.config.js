// pm2 process config for the Next.js researcher dashboard.
// Usage on the server:
//   pm2 start ecosystem.config.js       (first deploy)
//   pm2 restart samply-next             (subsequent deploys)
//   pm2 save                            (persist across reboots)
//   pm2 startup                         (enable auto-start on boot — run once)

module.exports = {
  apps: [
    {
      name: "samply-next",
      script: "node_modules/.bin/next",
      args: "start",
      // Set this to the absolute path of Website/nextapp on the server:
      cwd: "/var/www/samply/Website/nextapp",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  ],
};
