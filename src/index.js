(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD
    define("coolsole", ["cool-ascii-faces"], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node
    module.exports = factory(require("cool-ascii-faces"));
  } else {
    // Browser
    global.coolsole = factory(global.cool);
  }
})(this, function (cool) {
  "use strict";

  let ENV = "";
  if (typeof define === "function" && define.amd) {
    ENV = "AMD";
  } else if (typeof module === 'object' && module.exports) {
    ENV = "NODE";
  } else {
    ENV = "BROWSER";
  }

  var _cool = _interopRequireDefault(cool);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const colors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",

    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",

    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m"
  };

  function generate(type) {
    return function () {
      const msg = Array.prototype.reduce.call(arguments, joinPrevCurr, '');

      printOut(msg, type);
    };
  }

  function makeMessage(param) {
    if (getType(param) === "[object String]") {
      return param;
    } else if (getType(param) === "[object Array]") {
      return param.reduce(joinPrevCurr, '');
    } else {
      return JSON.stringify(param);
    }
  }

  function joinPrevCurr(prev, curr) {
    const comma = prev ? ", " : "";
    return prev + comma + makeMessage(curr);
  }

  function getType(obj) {
    return Object.prototype.toString.call(obj);
  }

  function printOut(msg, type) {
    const consoleType = console[type] || console.log;
    const say = makeSay(type);

    if (ENV === "NODE") {
      const resetColor = colors['Reset'];
      const coloredMsg = fillColor(type, msg);
      consoleType((0, _cool.default)(), say, coloredMsg + resetColor);
    } else {
      consoleType((0, _cool.default)(), say, msg);
    }
  }

  function makeSay(type) {
    let says = "";

    if (type === "warn") {
      says = " yelled:";
    } else if (type === "error") {
      says = " shouted:";
    } else if (type === "info") {
      says = " informed:";
    } else {
      says = " said:";
    }
    return says;
  }

  function fillColor(type, msg) {
    let coloredMsg = "";

    if (type === "warn") {
      coloredMsg = colors['FgYellow'] + msg;
    } else if (type === "error") {
      coloredMsg = colors['FgRed'] + msg;
    } else if (type === "info") {
      coloredMsg = colors['FgGreen'] + msg;
    } else {
      coloredMsg = " " + msg;
    }
    coloredMsg += " ";
    return coloredMsg;
  }

  const coolsole = {
    log: generate("log"),
    warn: generate("warn"),
    error: generate("error"),
    info: generate("info")
  };

  return coolsole;
});
