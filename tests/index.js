const assert = require("assert");
const myModule = require("..");


assert.strictEqual(myModule.add(1, 2), 3);
console.log('1 + 2 =', myModule.add(1,2));
console.log("add: ok");
console.log('---')

assert.strictEqual(myModule.factorial(3), 6);
console.log('factorial(3) =', myModule.factorial(3));
console.log("factorial: ok")
