const express = require('express');
const database = require('../database/dbQueries.js')
let app = express();

app.get('/questions', function (req, res) {
  if (!req.query.page) {
    req.query.page = 1
  }
  if (!req.query.count) {
    req.query.count = 5
  }

 database.getQuestions(req.query.productId, req.query.count).then((results) => {
  //  console.log(results)
   res.status(200).send(results)
 })
});

app.get('/answers', (req, res) => {

})

app.post('/postQuestion', (req, res) => {

})

app.post('/postAnswer', (req, res) => {

})

app.put('/questionHelpful', (req, res) => {

})

app.put('/answerHelpful', (req, res) => {

})

app.put('/reportQuestion', (req, res) => {

})

app.put('/reportAnswer', (req, res) => {

})


let port = 3055;

// app.listen(port, function() {
//   console.log(`listening on port ${port}`);
// });

module.exports = app;