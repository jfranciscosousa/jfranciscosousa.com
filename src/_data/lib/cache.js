const fs = require("fs");
const path = require("path");

const CACHE_DIR = path.join(process.cwd(), ".data-cache");
const CACHE_FILE = path.join(CACHE_DIR, "dataCache.json");

if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR);

function getCache() {
  if (!fs.existsSync(CACHE_FILE)) return {};

  return JSON.parse(fs.readFileSync(CACHE_FILE));
}

function saveCache(cache) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache));
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
