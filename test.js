const { runfmt } = require("./index.js");
let target = `
SELECT SELECT SELECT "不正なSQL"
`;
let result;
try {
  result = runfmt(target);
  console.log(result);
} catch (e) {
  console.error(e);
}

console.log("test");
