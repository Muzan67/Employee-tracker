INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
  ("John", "Doe", 1, "null"),
  ("Mike", "Chan", 2, 2),
  ("Shirley", "Rodriguez", 3, "null"),
  ("Kevin", "Tupik", 4, 4),
  ("Kunal", "Singh", 5, "null"),
  ("Malia", "Brown", 6, 6),
  ("Sarah", "Lourd", 7, "null"), 
  ("Tom", "Allen", 8, "null");

INSERT INTO managers (first_name, last_name, manager_id) 
VALUES 
  ("null", "null", 1),
  ("John", "Doe", 2),
  ("null", "null", 3),
  ("Ashley", "Rodriguez", 4),
  ("null", "null", 5),
  ("Kunal", "Singh", 6),
  ("null", "null", 7),
  ("Sarah", "Lourd", 8);
  
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

INSERT INTO department (name)
VALUES 
   ("Sales"),
   ("Engineering"),
   ("Finance"),
   ("Legal");


