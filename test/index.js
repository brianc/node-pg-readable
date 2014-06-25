var assert = require('assert')
var pgreader = require('../')

it('works', function(done) {
  var stream = pgreader('SELECT 1::int as num')
  stream.once('readable', function() {
    var row = stream.read()
    assert.equal(row.num, 1)
    done()
  })
})

it('works with passed in constructor', function(done) {
  var stream = pgreader(require('pg.js').Client, 'SELECT 1::int as num')
  stream.once('readable', function() {
    var row = stream.read()
    assert.equal(row.num, 1)
    done()
  })
})

var reader = require('stream-reader')
var batch = new (require('batch-stream'))({size: 37})
it('works with slow consumer', function(done) {
  var stream = pgreader('SELECT * FROM generate_series(0, 2000) num', [], {batchSize: 1000})
  var count = 0
  assert.equal(stream.batchSize, 1000)
  reader(stream.pipe(batch), function(rows, cb) {
    count += rows.length
    if(count == 2001) {
      done()
    }
    setTimeout(cb, 10)
  })
})
