const { Questions, Answers, Photos } = require('./index.js');
const Sequelize = require('sequelize');

let syncTables = () => {
  Questions.sync()
  Answers.sync()
  Photos.sync()
}

const getQuestions = (productId, count) => {
  let id = Number(productId)
  return new Promise((resolve, reject) => {
    Questions.findAll({
        where: {
          productId: id,
          reported: 0
        },
        limit: Number(count)
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
          question_id: id,
          answer_reported: 0
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
          let transformedAnswer = {};
          transformedAnswer.id = answerId;
          transformedAnswer.body = answers[i].dataValues.answer_body;
          transformedAnswer.date = answers[i].dataValues.answer_date;
          transformedAnswer.helpfulness = answers[i].dataValues.answer_helpfulness;
          transformedAnswer.photos = answers[i].dataValues.photos;
          transformedAnswer.answerer_name = answers[i].dataValues.answerer_name;
          Photos.findAll({
            where: {
              answer_id: answerId
            }
          }).then((res) => {
            let photos = []
            for (var j = 0; j < res.length; j++) {
              photos.push(res[j].dataValues.url)
            }
            transformedAnswer.photos = photos
            allAnswers[answerId] = transformedAnswer
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
    productId: data.product_id,
    reported: false,
    question_helpfulness: '0',
    question_date: new Date()
  }

 return new Promise((resolve, reject) => {
    Questions.create(question).then(res => resolve(res)).catch(err => reject(err))
 });

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
return new Promise((resolve, reject) => {
  if (answer.photos.length === 0) {
    Answers.create(answer).then(res => resolve(res)).catch(err => reject(err))
  } else {
    Answers.create(answer).then((res) => {
      for (var i = 0; i < answer.photos.length; i++) {
        let photo = {
          url: answer.photos[i],
          answer_id: res.dataValues.answer_id
        }
        Photos.create(photo).then(res => resolve(res)).catch(err => reject(err))
      }
    }).catch(err => reject(err))
  }
});
}

const questionHelpful = (questionId) => {
  return new Promise((resolve, reject) => {
    Questions.update({
        question_helpfulness: Sequelize.literal('question_helpfulness + 1')
      }, {where: {question_id: questionId}
      }).then((res) => {
        console.log('res', res)
        resolve(res)
      }).catch((err) => {
        console.log('errrr', err)
        reject(err)
      })
  })
}
// questionHelpful(3518969);

const reportQuestion = (questionId) => {
  return new Promise((resolve, reject) => {
    Questions.update({
      reported: true
    }, {
      where: {
        question_id: questionId
      }
    })
    .then((res) => {
      resolve(res)
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
    .then((res) => {
      resolve(res)
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
    }).then((res) => {
      resolve(res)
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
  reportAnswer,
  syncTables
}
