// Import and require mysql2
const mysql = require('mysql2');
// inquirer@^8.0.0
const inquirer = require('inquirer');
const cTable = require('console.table');
const dotenv = require('dotenv');

// Connect to database
const connection = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // {TODO: Add your MySQL password}
    password: 'Papooz@10128!',
    database: 'employee_db'
  },
  console.log(`Connected to the inventory_db database.`)
);

// var roles = [];
// var employees = [];
// var managers = [];

// GET Role
const getRole = () => {
    connection.query(`SELECT title, role_id FROM role`, (err, res) => {
        if(err) throw err;
        roles = [];
        for (let i = 0; i < res.length; i++) {
            const id = res(i).role_id;
            const title = res(i).title_id;
            var newRole = {
                name: title,
                value: id
            }
            roles.push(newRole);
        }
        // console.log(managers)
        return managers;
        // console.log(managers)
    });
};

// GET Employees
const getEmployee = () => {
    connection.query(`SELECT first_name, last_name, id FROM employee`, (err, res) => {
        if(err) throw err;
        employees = [];
        for (let i = 0; i < res.length; i++) {
            const first_name = res(i).first_name;
            const last_name = res(i).last_name;
            var newEmployees = {
                name: first_name.concat("", last_name),
                value: id
            }
            employees.push(newEmployees);
        }
        // console.log(newEmployees)
        return employees;
        // console.log(newEmployees)
    });
};

// GET Manager
const getManager = () => {
    connection.query(`SELECT manager, manager_id FROM managers`, (err, res) => {
        if(err) throw err;
        managers = [];
        for (let i = 0; i < res.length; i++) {
            const manager = res(i).manager;
            const manager_id = res(i).manager_id;
            var newManager = {
                name: manager,
                value: manager_id
            }
            managers.push(newManager);
        }
        // console.log(managers)
        return managers;
        // console.log(managers)
    })
};

// initiate prompts
const init = () => {
      getRole();
      getEmployee();
      getManager();
    inquirer
      .prompt({
        name: "init",
        type: "rawlist",
        message: "What would you like to do? (Use arrow keys)",
        choices: [
            "View All Employees",
            "View All Roles",
            "View All Departments",
            "Add an Employee",
            "Add a Role",
            "Add a Department",
            "Update an Employee Role",
            "Quit",
           "(Move up and down to reveal more choices)"
        ],
    })
    // Switch Statment for Employees, Managers, Departments, Roles
        .then((answers) => {
          switch (answers.init) {

        case "View All Employees":
          allEmployees();
          break;
        
        case "View All Roles":
          allRoles();
          break;

        case "View All Department":
          allDepartments();
          break;

        case "Add an Employee":
          addEmployee();
          break;

        case "Add a Role":
          addRole();
          break;

        case "Add a Department":
          addDepartment();
          break;

        case "Update Employee Role":
          updateRole();
          break;

        case "Quit":
          connection.end();
          break;
      }
  });
};

const allEmployees = () => {
    connection.query(roleCheck, (err, res) => {
            if (err) throw err;
            console.log("\nAll Employees\n");
            console.table(res);
            init();
    })
};

const allRoles = () => {
    connection.query(roleCheck, (err, res) => {
            if (err) throw err;
            console.log("\nAll Roles\n");
            console.table(res);
            init();
    })
};

const allDepartments = () => {
    connection.query(roleCheck, (err, res) => {
            if (err) throw err;
            console.log("\nAll Departments\n");
            console.table(res);
            init();
    })
};

const addEmployee = () => {
    managers.push('none');
    inquirer
    .prompt([
        {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?"
    },
    {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?"
    },
    {
        name: "role",
        type: "input",
        message: "What is the employee's role?",
        choices: roles
    },
    {
        name: "manager",
        type: "input",
        message: "Who is the employee's manager?",
        choices: managers
    },
])
    .then((answer) => {
        if(answer.manager === "none") {
    connection.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id)
    Values ('${answer.first_name}', '${answer.last_name}', '${answer.roles}', '${answer.managers}',) `, (err, res) => {
        if(err) throw err;
        init();
    });
} else {
    connection.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id)
    Values ('${answer.first_name}', '${answer.last_name}', '${answer.roles}', '${answer.managers}',) `, (err, res) => {
        if(err) throw err;
        init();
    })
    }
  })
}

const addRole = () => {
    inquirer
    .prompt([
        {
        name: "department",
        type: "rawlist",
        message: "Choose a Department? (Use arrow keys)",
        choices: ["Sales", "Engineering", "Finance", "Legal"]
        }
    ])
    .then((answer) => {
       if(answer.departments === "Sales") {
        connection.query(`SELECT employee.first_name, employee.last_name, name FROM employee
                          JOIN role ON employee.role_id = role.role.id
                          JoIN department ON role.department_id = department.department_id and department.role = "Sales"`, (err, res) => {
        console.log("\nSales\n");
        if (err) throw err;
        console.table(res);
        init();
       })
    }
    else if (answer.departments === "Engineering") 
    {
        connection.query(`SELECT employee.first_name, employee.last_name, name FROM employee
                          JOIN role ON employee.role_id = role.role.id
                          JoIN department ON role.department_id = department.department_id and department.role = "Engineering"`, (err, res) => {
        console.log("\nEngineering\n");
        if (err) throw err;
        console.table(res);
        init();
       })
    }
    else if (answer.departments === "Finance") 
    {
        connection.query(`SELECT employee.first_name, employee.last_name, name FROM employee
                          JOIN role ON employee.role_id = role.role.id
                          JoIN department ON role.department_id = department.department_id and department.role = "Finance"`, (err, res) => {
        console.log("\nFinance\n");
        if (err) throw err;
        console.table(res);
        init();
       })
    }
    else if (answer.departments === "Legal") 
    {
        connection.query(`SELECT employee.first_name, employee.last_name, name FROM employee
                          JOIN role ON employee.role_id = role.role.id
                          JoIN department ON role.department_id = department.department_id and department.role = "Legal"`, (err, res) => {
        console.log("\nLegal\n");
        if (err) throw err;
        console.table(res);
        init();
       })
    }
    })
}

const addDepartment = () => {
    inquirer
    .prompt([
        {
        name: "department",
        type: "rawlist",
        message: "Choose a Department? (Use arrow keys)",
        choices: ["Sales Lead", "Sales Person", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"]
        }
    ])
    .then((answer) => {
       if(answer.departments === "Sales Lead") {
        connection.query(`SELECT employee.first_name, employee.last_name, name FROM employee
                          JOIN role ON employee.role_id = role.role.id
                          JoIN department ON role.department_id = department.department_id and department.role = "Sales Lead"`, (err, res) => {
        console.log("\nSales Lead\n");
        if (err) throw err;
        console.table(res);
        init();
       })
    }
    else if (answer.departments === "Sales Person") 
    {
        connection.query(`SELECT employee.first_name, employee.last_name, name FROM employee
                          JOIN role ON employee.role_id = role.role.id
                          JoIN department ON role.department_id = department.department_id and department.role = "Sales Person"`, (err, res) => {
        console.log("\nSales Person\n");
        if (err) throw err;
        console.table(res);
        init();
       })
    }
    else if (answer.departments === "Lead Engineer") 
    {
        connection.query(`SELECT employee.first_name, employee.last_name, name FROM employee
                          JOIN role ON employee.role_id = role.role.id
                          JoIN department ON role.department_id = department.department_id and department.role = "Lead Engineer"`, (err, res) => {
        console.log("\nLead Engineer\n");
        if (err) throw err;
        console.table(res);
        init();
       })
    }
    else if (answer.departments === "Software Engineer") 
    {
        connection.query(`SELECT employee.first_name, employee.last_name, name FROM employee
                          JOIN role ON employee.role_id = role.role.id
                          JoIN department ON role.department_id = department.department_id and department.role = "Software Engineer"`, (err, res) => {
        console.log("\nSoftware Engineer\n");
        if (err) throw err;
        console.table(res);
        init();
       })
    }
    else if (answer.departments === "Account Manager") 
    {
        connection.query(`SELECT employee.first_name, employee.last_name, name FROM employee
                          JOIN role ON employee.role_id = role.role.id
                          JoIN department ON role.department_id = department.department_id and department.role = "Account Manager"`, (err, res) => {
        console.log("\nAccount Manager\n");
        if (err) throw err;
        console.table(res);
        init();
       })
    }
    else if (answer.departments === "Accountant") 
    {
        connection.query(`SELECT employee.first_name, employee.last_name, name FROM employee
                          JOIN role ON employee.role_id = role.role.id
                          JoIN department ON role.department_id = department.department_id and department.role = "Accountant"`, (err, res) => {
        console.log("\nAccountant\n");
        if (err) throw err;
        console.table(res);
        init();
       })
    }
    else if (answer.departments === "Legal Team Lead") 
    {
        connection.query(`SELECT employee.first_name, employee.last_name, name FROM employee
                          JOIN role ON employee.role_id = role.role.id
                          JoIN department ON role.department_id = department.department_id and department.role = "Legal Team Lead"`, (err, res) => {
        console.log("\nLegal Team Lead\n");
        if (err) throw err;
        console.table(res);
        init();
       })
    }
    else if (answer.departments === "Lawyer") 
    {
        connection.query(`SELECT employee.first_name, employee.last_name, name FROM employee
                          JOIN role ON employee.role_id = role.role.id
                          JoIN department ON role.department_id = department.department_id and department.role = "Lawyer"`, (err, res) => {
        console.log("\nLawyer\n");
        if (err) throw err;
        console.table(res);
        init();
       })
    }
    })
}

// Update Role for Employees, 
const updateRole = () => {
    inquirer
    .prompt([{
        name: "employee",
        type: "list",
        message: "What is The Name of The Role? (Use arrow keys)",
        choices: employees
    },
    {
        name: "role",
        type: "list",
        message: "Assign Employee With a New Role? (Use arrow keys)",
        choices: roles
    },
    ])
    .then((answer) => {
        connection.query(`UPDATE employee SET new role_id = ${answer.roles}
        WHERE id = ${answer.employees}`, (err, res) => {
            if(err) throw err;
            init()
        })
    })
};

init ()