// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee.js')

class Engineer extends Employee {
  constructor(name, id, email, github, role) {
    super(name, id, email)
    this.github = github
    this.role = 'Engineer'
  }
  getRole() {
    return 'Engineer'
  }
  getGithub() {
    return this.github
  }
}

module.exports = Engineer