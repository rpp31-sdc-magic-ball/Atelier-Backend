const express = require('express');
const parser = require('body-parser')
const database = require('../database/dbQueries.js')
let app = express();

app.use(parser.json());

app.get('/qa/questions', function (req, res) {

  if (!req.query.page) {
    req.query.page = 1
  }
  if (!req.query.count) {
    req.query.count = 5
  }

 database.getQuestions(req.query.productId, req.query.count).then((questions) => {
   res.status(200).send(questions);
 }).catch((err) => {
  res.status(500);
 })

});

app.get('/qa/questions/:question_id/answers', (req, res) => {

  console.log(req)
  if (!req.params.page) {
    req.params.page = 1
  }
  if (!req.params.count) {
    req.params.count = 5
  }

  database.getAnswers(req.params.question_id, req.params.count).then((answers) => {
    res.status(200).send(answers)
  })

})

app.post('/postQuestion', (req, res) => {

  database.saveQuestion(req.body).then((result) => {
    res.status(201);
  })
  .catch((err) => {
    res.status(500)
  })

})

app.post('/postAnswer', (req, res) => {
  database.saveAnswer(req.body).then((result) => {
    res.status(201);
  })
  .catch((err) => {
    res.status(500)
  })
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
////////////uncomment//////////////////////////////////////////////////////////////////////
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

module.exports = app;