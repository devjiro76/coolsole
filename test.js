const coolsole = require('./dist/coolsole.min.js');

coolsole.log("just String");
coolsole.info("arrays", {1: "with", 2: "Object"});
coolsole.warn([1, 2, 3]);
coolsole.warn("or", "arrays", "okay");
coolsole.error({1: "and Object", 2: "should be okay"});