const shim = require("fabric-shim");
const SimpleToken = require("./examples/SimpleToken");

shim.start(new SimpleToken());
