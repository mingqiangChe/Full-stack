const { hasVersion } = require("../utils/util.js");

let baseURL = "";
if (hasVersion("develop")) {
  // baseURL = 'http://127.0.0.1:7001';
  // baseURL = 'http://192.168.2.133:7001';
  // baseURL = "http://192.168.2.18:7001";
  // baseURL = "http://39.108.225.249:8899";
  baseURL = "https://api.rightsun.top";
} else if (hasVersion("trial")) {
  baseURL = "http://39.108.225.249:8899";
  // baseURL = "https://api.rightsun.top";
} else if (hasVersion("release")) {
  baseURL = "https://api.rightsun.top";
} else {
  baseURL = "http://127.0.0.1:7001";
}

export { baseURL };
