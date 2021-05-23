const Benchmark = require('benchmark');
const wasm = require('.');

function runSuite(suite){
  console.log('Running', suite.name);

  suite.on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', function (event) {
    console.log(this.filter('fastest').map('name') + ' won') 
  })
  .run();
}

function addTest(){
  function addJs(a,b){
    return a + b;
  }
  const addAs = wasm.add;

  const test = Benchmark.Suite('add');

  test
    .add('AssemblyScript', function(){
      addAs(10,20)
    })
    .add('JavaScript', function(){
      addJs(10,20);
    })
  
  runSuite(test);
}

function factorialTest(){
  function factorialJs(i){
    return i === 0 ? 1 : i * factorialJs(i - 1);
  }
  const factorialAs = wasm.factorial;

  const testSmall = Benchmark.Suite('small factorial');

  testSmall
    .add('AssemblyScript', function(){
      factorialAs(3);
    })
    .add('JavaScript', function(){
      factorialJs(3);
    })

  runSuite(testSmall);
  
  const testLarge = Benchmark.Suite('large factorial');

  testLarge
    .add('AssemblyScript', function(){
      factorialAs(10000);
    })
    .add('JavaScript', function(){
      factorialJs(10000);
    })

  runSuite(testLarge);
}

function squareArrayTest(){
  function squareArrayJs(arr){
    return arr.map(i => i*i);
  }
  const squareArrayAs = wasm.squareArray;

  const testSmall = Benchmark.Suite('small squareArray');

  testSmall
    .add('AssemblyScript', function(){
      squareArrayAs(Array(3).fill(2));
    })
    .add('JavaScript', function(){
      squareArrayJs(Array(3).fill(2));
    })

  runSuite(testSmall);
  
  const testLarge = Benchmark.Suite('large squareArray');
  const largeArray = new Int32Array(1000).fill(1).map((val, i) => val + (i * 0.001))

  testLarge
    .add('AssemblyScript', function(){
      squareArrayAs(largeArray);
    })
    .add('JavaScript', function(){
      squareArrayJs(largeArray);
    })

  runSuite(testLarge);
}

function squareArrayGenTest() {
  function squareArrayGenJs(len) {
      const arr = new Int32Array(len).map((_, i) => i);
      const result = new Int32Array(len);
      for (let i = 0; i < len; ++i) {
          const e = arr[i];
          result[i] = e * e;
      }
      return result;
  }
  const squareArrayGenAs = wasm.squareArrayGen;

  const arrayLargeTest = new Benchmark.Suite("squareArrayGenLarge");

  arrayLargeTest
      .add("AssemblyScript", function () {
          squareArrayGenAs(200);
      })
      .add("JavaScript", function () {
          squareArrayGenJs(200);
      });
  runSuite(arrayLargeTest);

  const arraySmallTest = new Benchmark.Suite("squareArrayGenSmall");

  arraySmallTest
      .add("AssemblyScript", function () {
          squareArrayGenAs(20);
      })
      .add("JavaScript", function () {
          squareArrayGenJs(20);
      });
  runSuite(arraySmallTest);
}

// addTest();
// factorialTest();
// squareArrayTest();
squareArrayGenTest();