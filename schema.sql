CREATE DATABASE sdc;

-- use sdc;


-- CREATE TABLE questions (
--   question_id int not null auto_increment,
--   asker_name varchar(60),
--   question_body varchar(1000),
--   question_date datetime default current_timestamp,
--   reported boolean,
--   question_helpfulness int,
--   email varchar(100),
--   productsId int,
--   primary key(question_id)
-- );

-- CREATE TABLE answers (
--   answer_id int not null auto_increment,
--   answerer_name varchar(60),
--   answer_body varchar(1000),
--   answerer_email varchar(100),
--   answer_reported boolean,
--   answer_helpfulness int,
--   answer_date datetime default current_timestamp,
--   question_id int,
--   primary key(answer_id),
--   foreign key(question_id) references questions(question_id)
-- );

-- CREATE TABLE photos (
--   photo_id int not null auto_increment,
--   url varchar(200),
--   answer_id int,
--   primary key(photo_id),
--   foreign key(answer_id) references answers(answer_id)
-- );
