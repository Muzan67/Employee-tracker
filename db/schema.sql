DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
 PRIMARY KEY (department_id),
 role VARCHAR(30),
 department_id INTEGER AUTO_INCREMENT
);

INSERT INTO department (role)
VALUES 
   ("Sales"),
   ("Engineering"),
   ("Finance"),
   ("Legal");

CREATE TABLE role (
  PRIMARY KEY (role_id),
  title VARCHAR(30),
  salary VARCHAR(20),
  department_id INTEGER,
  role_id INTEGER AUTO_INCREMENT,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
  PRIMARY KEY (id),
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

CREATE TABLE managers (
  PRIMARY KEY (manager_id),
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager VARCHAR(30),
  manager_id INTEGER AUTO_INCREMENT
);
