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

addTest();