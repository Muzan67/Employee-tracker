// Import and require mysql2
const mysql = require('mysql2');
// inquirer@^8.0.0
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const connection = require('mysql2/typings/mysql/lib/Connection');
const { getMaxListeners } = require('process');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // {TODO: Add your MySQL password}
    password: 'password',
    database: 'employee_db'
  },
  console.log(`Connected to the inventory_db database.`)
);

var roles = [];
var employees = [];
var managers = [];

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
                name: first_name.concat("", lastName),
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
    });

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
            "Add Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View All Roles",
            "Add Role",
            "Remove Role",
            "View All Departments",
            "Add Department",
            "Quit",
           "(Move up and down to reveal more choices)",
        ],
    })
        .then((answers) => {
          switch (answers.init) {
        case "View All Employees":
          allEmployees();
          break;

        case "Which Department would you like to see Employees by Department":
          allEmployeeByDepartment();
          break;

        case "View All Employees by Manager":
            allEmployeeByManager();
          break;

        case "Assign a Manager to an Employee":
            updateManager();
          break;

        case "View All Roles":
            allRoles();
          break;

          case "View All Managers":
            allManagers();
          break;

        case "Add Employee":
            addEmployee();
          break;

        case "Add Role":
            addRole();
          break;

        case "View All Department":
            allDepartment();
          break;

        case "Add Department":
            removeDepartment();
          break;

        case "Remove Department":
            addDepartment();
          break;

        case "View Total Ustilized Budget By Department":
          allBudget();
        break;

        case "Update Employee Role":
            updateRole();
          break;

        case "Remove Employee":
            removeEmployee();
          break;

        case "Quit":
          connection.end();
          break;
      }
  });

};

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
        connection.query(`UPDATE employee SET new role_id = ${answer.role}
        WHERE id = ${answer.employee}`, (err, res) => {
            if(err) throw err;
            init()
        })
    })
};

const allEmployeeByManager = () => {
    inquirer
    .prompt({
        name: "manager",
        type: "list",
        message: "Choose A Manager? (Use arrow keys)",
        choices: managers
    })
    .then((answer) => {
        connection.query(`SELECT first_name, last_name FROM employee Where manager_id = ${answer.manager};`, (err, res) => {
            if(err) throw err;
            console.table(res);
            init()
        })
    })
};

const updateManager = () => {
    inquirer
    .prompt([{
        name: "employee",
        type: "list",
        message: "The Selected Employee Has No Direct Reports? (Use arrow keys)",
        choices: employees
    },
    {
        name: "manager",
        type: "list",
        message: "Assign Employee With a Direct Manager? (Use arrow keys)",
        choices: managers
    },
    ])
    .then((answer) => {
        connection.query(`UPDATE employee SET assign manager_id = ${answer.manager}
        WHERE id = ${answer.employee}`, (err, res) => {
            if(err) throw err;
            init()
        })
    })
};

const allRoles = () => {
    connection.query(`SELECT title FROM Role`, (err, res) => {
            if(err) throw err;
            console.log("\nAll MANAGERS\n");
            console.table(res);
            init();
    })
};

const allEmployees = () => {
    connection.query(roleCheck, (err, res) => {
            if (err) throw err;
            console.log("\nAll Employees\n");
            console.table(res);
            init();
    })
};

const allManagers = () => {
    connection.query(`SELECT Manager FROM Managers`, (err, res) => {
            if(err) throw err;
            console.log("\nAll MANAGERS\n");
            console.table(res);
            init();
    })
};

const allEmployeeByDepartment = () => {
    inquirer
    .prompt({
        name: "department",
        type: "rawlist",
        message: "Choose a Department? (Use arrow keys)",
        choices: ["Sales", "Engineering", "Finance", "Legal"]
    })
    .then(answer) => {
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
    else if (answer.departments === "Finance") {
        connection.query(`SELECT employee.first_name, employee.last_name, name FROM employee
                          JOIN role ON employee.role_id = role.role.id
                          JoIN department ON role.department_id = department.department_id and department.role = "Finance"`, (err, res) => {
        console.log("\nFinance\n");
        if (err) throw err;
        console.table(res);
        init();
       })
    }
    else if (answer.departments === "Finance") {
        connection.query(`SELECT employee.first_name, employee.last_name, name FROM employee
                          JOIN role ON employee.role_id = role.role.id
                          JoIN department ON role.department_id = department.department_id and department.role = "Finance"`, (err, res) => {
        console.log("\nFinance\n");
        if (err) throw err;
        console.table(res);
        init();
       })
    }
    else if (answer.departments === "Finance") {
        connection.query(`SELECT employee.first_name, employee.last_name, name FROM employee
                          JOIN role ON employee.role_id = role.role.id
                          JoIN department ON role.department_id = department.department_id and department.role = "Finance"`, (err, res) => {
        console.log("\nFinance\n");
        if (err) throw err;
        console.table(res);
        init();
       })
    }

};

init ()}