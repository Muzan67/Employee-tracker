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

// initiate prompts
const init = () => {
    
    inquirer
      .prompt({
        name: "init",
        type: "list",
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

    // Switch Statment for Employees, Managers, Departments, Roles, Budget
        .then((answers) => {
            console.log('answers ---> ' + answers)
          switch (answers.init) {

        case "View All Employees":
          selectEmployees();
          break;
        
        case "View All Roles":
          selectRoles();
          break;
        
        case "View All Departments":
          selectDepartments();
          break;
        
        case "Add an Employee":
          promptAddEmployee();
          break
        
        case "Add a Role":
          promptAddRole();
          break;
  
        case "Add a Department":
          promptAddDepartment();
          break;

        case "Update Employee Role":
          promptUpdateRole();
          break;

        case "Quit":
          connection.end();
          break;
      }
  });

};

const selectEmployees = () => {
    connection.query(
'SELECT E.id, E.first_name, E.last_name, R.title, D.name AS department, R.salary, CONCAT(M.first_name,' ', M.last_name) AS manager FROM employee E JOIN role R ON E.role_id = R.id JOIN department D ON R.department_id = D.id LEFT JOIN employee M ON E.manager_id = M.id;',
    (err, res) => {
        console.table(res);
        init();
    }
    )
};

const selectRoles = () => {
    connection.query('SELECT * FROM role;',
    (err, res) => {
        console.table(res);
        init();
    }
    )
};

const selectDepartments = () => {
    connection.query('SELECT * FROM department;',
    (err, res) => {
        console.table(res);
        init();
    }
    )
};

// const selectManagers = () => {
//     connection.query(`SELECT * FROM managers;`, 
//     (err, res) => {
//         console.table(res);
//         init();
//     }
//     )
// };

const promptAddEmployee = () => {
    return connection.promise().query(
        "SELECT role.id, role.title FROM roles;"
    )
    .then(([employees]) => {
        let titleChoices = employees.map(({
            id,
            title
        }) => ({
            name: title,
            value: id
        }));
    connection.promise().query(
        "SELECT employee.id, CONCAT(employee.first_name, ' ' ,employee.last_name) AS manager FROM employee;"
        )
        .then(([managers]) => {
            let managerChoices = managers.map(({
                id,
                manager
            }) => ({
                name: manager,
                value: id
            }));
        inquirer
    .prompt([
        {
        name: "firstName",
        type: "input",
        message: "What is your employees first name?",
        validate: firstName => {
            if (firstName) {
                    return true;
                } else {
                    console.log("Please enter the employees first name!");
                    return false;
                }
            }
        },
    {
        name: "lastName",
        type: "input",
        message: "What is your employees last name?",
        validate: lastName => {
            if (lastName) {
                    return true;
                } else {
                    console.log("Please enter the employees first name!");
                    return false;
                }
            }
        },
    {
        name: "role",
        type: "list",
        message: "What is your employees role?",
        choices: titleChoices
    },
    {
        name: "manager",
        type: "list",
        message: "Who is your employees manager?",
        choices: managerChoices
    },
    ])
    .then(({ firstName, lastName, role, manager }) => {
        const query = connection.query(
            'INSERT INTO employee SET',
            {
                firstName: firstName,
                lastName: lastName,
                role_id: role,
                manager_id: manager
            },
            function (err, res) {
                if (err) throw err;
                console.log({ role, manager })
            })
            }).then(() => selectEmployees())
        })
    })
}

const promptAddDepartment = () => {}
    inquirer
    .prompt([
        {
        name: "name",
        type: "input",
        message: "Name the department you woould like to add?",
        validate: departmentName => {
            if (departmentName) {
                if (departmentName) {
                    return true;
                } else {
                    console.log("Please enter the name of your department?");
                    return false;
                }
            }
        }
    }
    ])    
    .then(name => {
    connection.promise().query("INSERT INTO department SET", name);
    selectDepartments();
  })

const promptAddRole = () => {
    return connection.promise().query(
        "SELECT department.id, department.name FROM department;"
    )
    .then(([departments]) => {
        let departmentChoices = departments.map(({
            id,
            name
        }) => ({
            name: name,
            value: id
        }));
        inquirer
    .prompt([
        {
        name: "title",
        type: "input",
        message: "Enter the name of your title?",
        validate: titleName => {
            if (titleName) {
                if (titleName) {
                    return true;
                } else {
                    console.log("Please enter the title of your name?");
                    return false;
                }
            }
        }
    },
    {
        name: "department",
        type: "list",
        message: "Enter the name of your title?",
        choices: departmentChoices
    },
    {
        name: "salary",
        type: "input",
        message: "Enter your salary?",
        validate: salary => {
            if (salary) {
                if (salary) {
                    return true;
                } else {
                    console.log("Please enter the name of your department?");
                    return false;
                }
            }
        }
    }]
    )
    .then(({ title, department, salary }) => {
        const query = connection.query(
            'INSERT INTO role SET',
            {
                title: title,
                department_id: department,
                salary: salary
            },
            function (err, res) {
                if (err) throw err;
            }
        )
    }).then(() => selectRoles())
})
}

const promptUpdateRole = () => {
    return connection.promise().query(
        "SELECT role.id, role.title, role.salary, role.department_id FROM role;"
    )
    .then(([departments]) => {
        let departmentChoices = departments.map(({
            id,
            name
        }) => ({
            name: name,
            value: id
        }));
        inquirer
    .prompt([
        {
        name: "title",
        type: "input",
        message: "Enter the name of your title?",
        validate: titleName => {
            if (titleName) {
                if (titleName) {
                    return true;
                } else {
                    console.log("Please enter the title of your name?");
                    return false;
                }
            }
        }
    },
    {
        name: "department",
        type: "list",
        message: "Enter the name of your title?",
        choices: departmentChoices
    },
    {
        name: "salary",
        type: "input",
        message: "Enter your salary?",
        validate: salary => {
            if (salary) {
                if (salary) {
                    return true;
                } else {
                    console.log("Please enter the name of your department?");
                    return false;
                }
            }
        }
    }]
    )
    .then(({ title, department, salary }) => {
        const query = connection.query(
            'INSERT INTO role SET',
            {
                title: title,
                department_id: department,
                salary: salary
            },
            function (err, res) {
                if (err) throw err;
            }
        )
    }).then(() => selectRoles())
})
}

init ()