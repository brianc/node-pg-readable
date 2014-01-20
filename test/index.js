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

it('works with passed in constructor', function() {
  var stream = pgreader(require('pg.js').Client, 'SELECT 1::int as num')
  stream.once('readable', function() {
    var row = stream.read()
    assert.equal(row.num, 1)
    done()
  })
})
