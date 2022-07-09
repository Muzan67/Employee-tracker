INSERT INTO employee (first_name, last_name, manager_id) 
VALUES 
  ("John", "Doe", 1),
  ("Mike", "Chan", 2),
  ("Shley", "Rodriguez", 3),
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

SELECT * FROM employee;
SELECT * FROM managers;
SELECT * FROM department;