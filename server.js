const express = require('express');
let app = express();

app.get('/questions', function (req, res) {
  res.send('Hello')
});


let port = 3055;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});