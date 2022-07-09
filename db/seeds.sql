INSERT INTO employee (id, first_name, last_name, manager_id) 
VALUES 
  (1,"John Doe", 1),
  (2,"Mike Chan", 2),
  (3,"Shley Rodriguez", 3),
  (4,"Kevin Tupik", 4),
  (5. "Kunal Singh", 5),
  (6. "Malia Brown", 6),
  (7. "Sarah Lourd", 7),
  (8. "Tom Allen", 8);

INSERT INTO manager (manager_id, first_name, last_name) 
VALUES 
  (1,"null"),
  (2,"John Doe"),
  (3,"null"),
  (4,"Ashley Rodriguez"),
  (5. "null"),
  (6. "Kunal Singh"),
  (7. "null"),
  (8. "Sarah Lourd");

SELECT * FROM employee;
SELECT * FROM managers;