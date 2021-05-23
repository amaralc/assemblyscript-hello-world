const assert = require("assert");
const myModule = require("..");


assert.strictEqual(myModule.add(1, 2), 3);
console.log('1 + 2 =', myModule.add(1,2));
console.log("add: ok");
console.log('---')

assert.strictEqual(myModule.factorial(3), 6);
console.log('factorial(3) =', myModule.factorial(3));
console.log("factorial: ok")
console.log('---')

assert.deepStrictEqual(myModule.squareArray([1, 2, 3, 4]), new Int32Array([1,4,9,16]));
console.log('squareArray([1,2,3,4]) =', myModule.squareArray([1,2,3,4]));
console.log("squareArray: ok")
console.log('---')


