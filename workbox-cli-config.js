module.exports = {
  "globDirectory": "public/",
  "globPatterns": [
    "images/photos/*.{jpg,png}"
  ],
  "swSrc": "sw-base.js",
  "swDest": "public/service-worker.js",
  "globIgnores": [
    "..\\workbox-cli-config.js",
    "..\\service-worker.js",
    "schedule/*",
    "uploads/*"
  ]
};
