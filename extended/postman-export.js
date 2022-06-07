var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://hooks.zapier.com/hooks/catch/12483802/ba3043e/',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "message": "hello zapier my old friend"
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
