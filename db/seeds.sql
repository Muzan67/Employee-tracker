INSERT INTO employee (first_name, last_name, manager_id) 
VALUES 
  ("John", "Doe", 1),
  ("Mike", "Chan", 2),
  ("Shirley", "Rodriguez", 3),
  ("Kevin", "Tupik", 4),
  ("Kunal", "Singh", 5),
  ("Malia", "Brown", 6),
  ("Sarah", "Lourd", 7),
  ("Tom", "Allen", 8);

INSERT INTO managers (first_name, last_name) 
VALUES 
  ("null", "null"),
  ("John", "Doe"),
  ("null", "null"),
  ("Ashley", "Rodriguez"),
  ("null", "null"),
  ("Kunal", "Singh"),
  ("null", "null"),
  ("Sarah", "Lourd");
  
INSERT INTO role (department_id, title, salary) 
VALUES
  (1,"Sales Lead", "$100,000" ),
  (2,"Salesperson", "$80,000"),
  (3,"Lead Engineer", "$150,000"),
  (4,"Software Engineer", "$120,000"),
  (5, "Account Manager", "$160,000"),
  (6, "Accountant", "$125,000"),
  (7, "Legal Team Lead", "$250,000"),
  (8, "Lawyer", "$190,000");

INSERT INTO department (title)
VALUES 
   ("Sales"),
   ("Engineering"),
   ("Finance"),
   ("Legal");

SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM role;
