const fs = require("fs");
const path = require("path");

const CACHE_PATH = path.join(process.cwd(), "/cache/dataCache.json");

function getCache() {
  if (!fs.existsSync(CACHE_PATH)) return {};

  return JSON.parse(fs.readFileSync(CACHE_PATH));
}

function saveCache(cache) {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache));
}

module.exports = {
  put(key, value) {
    const cache = getCache();

    cache[key] = value;

    saveCache(cache);
  },

  get(key) {
    const cache = getCache();

    return cache[key];
  },
};
