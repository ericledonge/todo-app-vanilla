CREATE DATABASE todoapp;

CREATE TABLE todos (id VARCHAR(255) PRIMARY KEY, user_id INT, title VARCHAR(30), is_done BOOLEAN);

CREATE TABLE users (id VARCHAR(255) PRIMARY KEY, email VARCHAR(255), hashed_password VARCHAR(255));

INSERT INTO todos(id, user_id, title, is_done) VALUES ('1', 1, 'Buy milk', false);
INSERT INTO todos(id, user_id, title, is_done) VALUES ('2', 1, 'Buy eggs', false);
INSERT INTO todos(id, user_id, title, is_done) VALUES ('3', 2, 'Buy bread', false);
INSERT INTO todos(id, user_id, title, is_done) VALUES ('4', 2, 'Buy butter', false);

INSERT INTO users(id, email, hashed_password) VALUES (1, 'john@doe.com', '123456');
INSERT INTO users(id, email, hashed_password) VALUES (2, 'jane@doe.com', '123456');
