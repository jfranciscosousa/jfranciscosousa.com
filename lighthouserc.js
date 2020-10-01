module.exports = {
  ci: {
    assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        "unused-javascript": "off",
        "uses-rel-preconnect": "off",
        "render-blocking-resources": "off",
        "uses-long-cache-ttl": "off",
        "unused-css-rules": "off",
      },
    },
  },
};
