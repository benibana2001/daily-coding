const Benchmark = require('benchmark')
const aryFuncs = require('./array')
const { twoSum, twoSum2 } = aryFuncs

const suite = new Benchmark.Suite()
suite.add('twoSum2', function(){
    twoSum2([3, 4, 9, 2], 11)
}).add('twoSum', function(){
    twoSum([3, 4, 9, 2], 11)
}).on('complete', function () {
    console.log(this.filter('fastest').map('name'))
}).run()