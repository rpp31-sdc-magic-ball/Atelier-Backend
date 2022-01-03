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

 database.getQuestions(req.query.product_id, req.query.count).then((questions) => {

   res.status(200).send(questions);
 }).catch((err) => {
   console.log(err)
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

app.post('/qa/questions', (req, res) => {

  database.saveQuestion(req.body).then((result) => {
    res.status(201).send(result);
  })
  .catch((err) => {
    res.status(500)
  })

})

app.post('/qa/questions/:question_id/answers', (req, res) => {
  req.body.questionId = req.params.question_id
  database.saveAnswer(req.body).then((result) => {
    console.log(result)
    res.status(201).send(result);
  })
  .catch((err) => {
    res.status(500)
  })
})

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  database.questionHelpful(req.params.question_id).then((res) => {
   res.sendStatus(200);
 })
 .catch(err => {
   res.sendStatus(500);
 })
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  database.answerHelpful(req.params.answer_id).then(() => {
    res.sendStatus(200);
  })
  .catch(err => {
    res.sendStatus(500);
  })
})

app.put('/qa/questions/:question_id/report', (req, res) => {
  database.reportQuestion(req.params.question_id).then(() => {
    res.sendStatus(200);
  })
  .catch(err => {
    res.sendStatus(500);
  })
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  database.reportAnswer(req.params.answer_id).then(() => {
    console.log('reported')
    res.sendStatus(200);
  })
  .catch(err => {
    res.sendStatus(500);
  })
})


let port = 3055;
////////////uncomment//////////////////////////////////////////////////////////////////////
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

module.exports = app;