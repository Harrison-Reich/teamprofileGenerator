const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const fse = require('fs-extra');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// using inquirer to gather information about the development team members
let teamMembers = []

const add = () => {
  inquirer.prompt([
    {
      name: 'add',
      type: 'confirm',
      message: 'Would you like to create another employee profile?'
    }
  ])
    .then(data => {
      if (data.add === true) {
        createEmployee()
      } else {
        const team = render(teamMembers)
        render(teamMembers)
        fse.outputFile('output/team.html', team, err => {
          if (err) { console.log(err) }
        });
      };
    });
};

const createEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your employee name?',
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is your employee identification number?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your employee email address?',
    },
    {
      type: 'list',
      name: 'role',
      message: 'What is the role of your employee?',
      choices: ['Intern', 'Engineer', 'Manager',]
    }
  ])
    .then(answers => {
      if (answers.role === 'Manager') {
        inquirer.prompt([
          {
            type: 'input',
            name: 'officeNumber',
            message: 'What is the manager office number?',
          }
        ])
          .then(manager1 => {
            const manager = new Manager(answers.name, answers.id, answers.email, manager1.officeNumber)
            teamMembers.push(manager)
            console.log(teamMembers)
            add()
          })
      } else if (answers.role === 'Engineer') {
        inquirer.prompt([
          {
            type: 'input',
            name: 'github',
            message: "What is the engineer's github page?",
          }
        ])
          .then(engineer1 => {
            const engineer = new Engineer(answers.name, answers.id, answers.email, engineer1.github)
            console.log(engineer1.github)
            console.log(engineer.getGithub())
            teamMembers.push(engineer)
            console.log(teamMembers)
            add()
          })
      } else if (answers.role === 'Intern') {
        inquirer.prompt([
          {
            type: 'input',
            name: 'school',
            message: 'What is the interns school?',
          }
        ])
          .then(intern1 => {
            const intern = new Intern(answers.name, answers.id, answers.email, intern1.school)
            teamMembers.push(intern)
            console.log(teamMembers)
            add()

          })
      }
    })
    .catch(err => console.log(err))
}

createEmployee()
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
