const express = require('express');
const database = require('./database/dbQueries.js')
let app = express();

app.get('/questions', function (req, res) {

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

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});