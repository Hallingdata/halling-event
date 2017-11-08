"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const R = require("ramda");
const toJson = R.composeP(JSON.parse, R.trim, R.invoker(0, "text"));
const writeToDB = R.composeP();
exports.Execute = (db) => {
    return R.composeP(writeToDB, toJson, node_fetch_1.default)("http://kvaskjer.hallingdal.no/events/json.php?l=no&q=&fd=&td=");
};
//# sourceMappingURL=index.js.map