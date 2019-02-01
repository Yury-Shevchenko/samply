module.exports = {
  "globDirectory": "public\\",
  "globPatterns": [
    "**/*.{map,ttf,otf,woff,woff2,json}",
    "images/photos/*.{jpg,png}"
  ],
  "swSrc": "sw-base.js",
  "swDest": "public/service-worker.js",
  "globIgnores": [
    "..\\workbox-cli-config.js"
  ]
};
