import cool from 'cool-ascii-faces';

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
      consoleType.call(console, cool(), say, fontColor, arguments, resetColor);
    } else {
      consoleType.call(console, cool(), say, arguments);
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
    color = colors['FgYellow'];
  } else if (type === "error") {
    color = colors['FgRed'];
  } else if (type === "info") {
    color = colors['FgGreen'];
  }

  return color;
}

window.coolsole = {
  log: generate("log"),
  warn: generate("warn"),
  error: generate("error"),
  info: generate("info")
};