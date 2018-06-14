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
      const consoleType = console[type] || console.log;
      const fontColor = fillColor(type);
      const resetColor = colors.Reset;
      const say = makeSay(type);

      if (ENV === "NODE") {
        const coloredMsg = fillColor(type, msg);
        consoleType.call(console, (0, _cool.default)(), say, fontColor, arguments, resetColor);
      } else {
        consoleType.call(console, (0, _cool.default)(), say, arguments);
      }
    };
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

  function fillColor(type) {
    let color = "";

    if (type === "warn") {
      color = colors['FgYellow'] + msg;
    } else if (type === "error") {
      color = colors['FgRed'] + msg;
    } else if (type === "info") {
      color = colors['FgGreen'] + msg;
    } else {
      color = " " + msg;
    }
    return color;
  }

  return {
    log: generate("log"),
    warn: generate("warn"),
    error: generate("error"),
    info: generate("info")
  };
});