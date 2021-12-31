const { Questions, Answers, Photos } = require('./index.js');


const getQuestions = (id, count) => {
  return new Promise((resolve, reject) => {
    Questions.findAll({
        where: {
          productsId: id
        },
        limit: count
      }).then((questions) => {

        let allQuestions = {
          productId: id,
          results: []
        }
        for (var i = 0; i < questions.length; i++) {
          let question = questions[i].dataValues
          question.question_date = question.question_date
          let id = question.question_id
          getAnswers(id).then((answers) => {
            question.answers = answers
            allQuestions.results.push(question)

            if (allQuestions.results.length === questions.length) {
              resolve(allQuestions)
            }
          })
        }
      })
      .catch((err) => {
        reject(err)
      })
  });
}

// getQuestions(1).then(res => console.log(res));

const getAnswers = (id, count) => {
  return new Promise((resolve, reject) => {
    Answers.findAll({
        where: {
          question_id: id
        },
        limit: count
      }).then((answers) => {
        if (answers.length === 0) {
          resolve({})
        }
        let allAnswers = {}
        for (var i = 0; i < answers.length; i++) {
          let answerId = answers[i].dataValues.answer_id
          let answerObj = answers[i].dataValues;
          Photos.findAll({
            where: {
              answer_id: answerId
            }
          }).then((res) => {
            let photos = []
            for (var j = 0; j < res.length; j++) {
              photos.push(res[j].dataValues)
            }
            answerObj.photos = photos
            allAnswers[answerId] = answerObj
            if (Object.keys(allAnswers).length === answers.length) {
              resolve(allAnswers)
            }
          })
        }
      })
      .catch((err) => {
        reject(err)
      })
  });
}
// getAnswers(2).then(res => console.log(res));

const saveQuestion = (data) => {
  let question = {
    asker_name: data.name,
    question_body: data.body,
    email: data.email,
    productsId: data.product_id,
    reported: false,
    question_helpfulness: '0',
    question_date: new Date()
  }

  Questions.create(question).then(res => console.log('question created!')).catch(err => console.log('err saving question', err))
}

// saveQuestion(question);


const saveAnswer = (data) => {

let answer = {
  answerer_name: data.name,
  answer_body: data.body,
  answerer_email: data.email,
  question_id: data.questionId,
  photos: data.photos,
  answer_reported: false,
  answer_helpfulness: '0',
  answer_date: new Date(),
}

  if (answer.photos.length === 0) {
    Answers.create(answer).then(res => console.log('answer added')).catch(err => console.log('err saving answer', err))
  } else {
    Answers.create(answer).then((res) => {
      for (var i = 0; i < answer.photos.length; i++) {
        let photo = {
          url: answer.photos[i],
          answer_id: res.dataValues.answer_id
        }
        Photos.create(photo).then(res => console.log('photo added')).catch(err => console.log(err))
      }
    }).catch(err => console.log('err saving answer', err))
  }
}

const questionHelpful = (questionId) => {
  return new Promise((resolve, reject) => {
    Questions.update({
        question_helpfulness: Sequelize.literal('question_helpfulness + 1')
      }, {
        where: {
          question_id: questionId
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}
// questionHelpful(1);

const reportQuestion = (questionId) => {
  return new Promise((resolve, reject) => {
    Questions.update({
      reported: true
    }, {
      where: {
        question_id: questionId
      }
    })
    .catch((err) => {
      reject(err)
    })
  })
}
// reportQuestion(1)

const answerHelpful = (answerId) => {
  return new Promise((resolve, reject) => {
    Answers.update({
      answer_helpfulness: Sequelize.literal('answer_helpfulness + 1')
    }, {
      where: {
        answer_id: answerId
      }
    })
    .catch((err) => {
      reject(err)
    })
  })
}

const reportAnswer = (answerId) => {
  return new Promise((resolve, reject) => {
    Answers.update({
      answer_reported: true
    }, {
      where: {
        answer_id: answerId
      }
    })
    .catch((err) => {
      reject(err)
    })
  })
}


module.exports = {
  getQuestions,
  getAnswers,
  saveQuestion,
  saveAnswer,
  questionHelpful,
  reportQuestion,
  answerHelpful,
  reportAnswer
}
