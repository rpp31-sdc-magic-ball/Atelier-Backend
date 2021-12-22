const {Sequelize} = require('sequelize');
const db = require('../dbAuth.js');

var Questions = db.define('Questions', {
  question_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  asker_name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  question_body: {
    type: Sequelize.STRING
  },
  question_date: {
    type: Sequelize.DATE
  },
  productsId: {
    type: Sequelize.INTEGER
  },
  reported: {
    type: Sequelize.BOOLEAN
  },
  question_helpfulness: {
    type: Sequelize.INTEGER
  },
}, {
  timestamps: false
});

var Answers = db.define('Answers', {
  answer_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  answerer_name: {
    type: Sequelize.STRING
  },
  answerer_email: {
    type: Sequelize.STRING
  },
  answer_body: {
    type: Sequelize.STRING
  },
  answer_date: {
    type: Sequelize.DATE
  },
  question_id: {
    type: Sequelize.INTEGER
  },
  answer_reported: {
    type: Sequelize.BOOLEAN
  },
  answer_helpfulness: {
    type: Sequelize.INTEGER
  },
}, {
  timestamps: false
});

var Photos = db.define('Photos', {
  photo_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  url: {
    type: Sequelize.STRING
  },
  answer_id: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false
});

Questions.hasMany(Answers, {foreignKey: 'question_id'});
Answers.belongsTo(Questions, {foreignKey: 'question_id'});

Answers.hasMany(Photos, {foreignKey: 'answer_id'});
Photos.belongsTo(Answers, {foreignKey: 'answer_id'});

module.exports = {Questions, Answers, Photos}

// Questions.sync({force: true}).then(() => {
//   console.log('synced')
//   Answers.sync({force: true}).then(() => {
//     console.log('answers synced')
//     Photos.sync({force: true}).then(() => {
//       console.log('photos synced')
//     })
//   })
//  }).catch((err) => {
//    console.log(err)
//  })

// getQuestions(1).then((res) => {
//   console.log(res.results[0].answers['5'].photos)
// })
