var request = require('request');

var option = process.argv[2];

// Authentication
if(option == 1){

  request.post(
    {
      url: 'http://localhost:3000/login',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: process.argv[3], password: process.argv[4] }),
    },
    function(err, response, body){
      console.log(err);
      console.log(body);
    }
  );

}else if (option == 2) {

  // GET Authentication
  request.get(
    {
      url: 'http://localhost:3000/api/v1/admin/users',
      headers: {
        'Content-Type': 'application/json',
        'x-key': process.argv[3],
        'x-access-token': process.argv[4]
      }
    },
    function(err, response, body){
      console.log(err);
      console.log(body);
    }
  );

}else if (option == 3) {
  // GET Authentication
  request.get(
    {
      url: 'http://localhost:3000/api/v1/admin/user/' + process.argv[3],
      headers: {
        'Content-Type': 'application/json',
        'x-key': process.argv[4],
        'x-access-token': process.argv[5]
      }
    },
    function(err, response, body){
      console.log(err);
      console.log(body);
    }
  );
}
