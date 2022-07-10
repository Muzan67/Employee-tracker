DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
 PRIMARY KEY (department_id),
 role VARCHAR(30),
 department_id INTEGER AUTO_INCREMENT
);

INSERT INTO department(role)
VALUES 
   ("Sales"),
   ("Engineering"),
   ("Finance"),
   ("Legal");

CREATE TABLE role(
  PRIMARY KEY (role_id),
  title VARCHAR(30),
  salary VARCHAR(20),
  department_id INTEGER,
  role_id INTEGER AUTO_INCREMENT
);

INSERT INTO role_id (department_id, title, salary) 
VALUES
  (1,"Sales Lead", "$100,000" ),
  (2,"Salesperson", "$80,000"),
  (3,"Lead Engineer", "$150,000"),
  (4,"Software Engineer", "$120,000"),
  (5, "Account Manager", "$160,000"),
  (6, "Accountant", "$125,000"),
  (7, "Legal Team Lead", "$250,000"),
  (8, "Lawyer", "$190,000");

CREATE TABLE employee(
  PRIMARY KEY (id),
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER NULL,
  manager_id INTEGER NULL,
  id INTEGER AUTO_INCREMENT
);

CREATE TABLE managers (
  PRIMARY KEY (manager_id),
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager VARCHAR(30),
  manager_id INTEGER AUTO_INCREMENT
);