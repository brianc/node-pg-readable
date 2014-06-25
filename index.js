var QueryStream = require('pg-query-stream')

var execute = function(Client, text, params, options) {
  var client = new Client()
  client.connect()
  client.on('drain', client.end.bind(client))
  return client.query(new QueryStream(text, params, options))
}

var getClient = function() {
  try {
    return require('pg').Client
  } catch(e) {
    try {
      return require('pg.js').Client
    } catch(e) {
      console.log('You need to `npm install pg.js` or `npm install pg` or pass a pg Client constructor as first argument')
    }
  }
}

module.exports = function(Client, text, params, options) {
  if(typeof Client == 'string') {
    return execute(getClient(), Client, text, params)
  }
  return execute(Client, text, params, options)
}
