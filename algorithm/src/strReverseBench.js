const Benchmark = require('benchmark')
const ary2str = require('./strReverse')

let suite = new Benchmark.Suite();
suite.add('ary2str', function () {
    ary2str('str')
})
    .on('complete', function () {
        console.log(this.filter('fastest').map('name'))
    })
    .run()