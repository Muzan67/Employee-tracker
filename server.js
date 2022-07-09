// Import and require mysql2
const mysql = require('mysql2');
// inquirer@^8.0.0
const inquirer = require("inquirer");
const consoleTables = require("console.table");
const Connection = require('mysql2/typings/mysql/lib/Connection');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // {TODO: Add your MySQL password}
    password: '',
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
            managers.push(newRole);
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
};

init ()