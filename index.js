const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");
const teamFile = "./src/team.html";
const outputFile = "./dist/team-profile-generator.html";
const questions = [
    {
        type: "input",
        name: "id",
        message: "Enter your id",
    },
    {
        type: "input",
        name: "name",
        message: "Enter your full name",
    },
    {
        type: "input",
        message: "Enter your email address",
        name: "email",
    },
    {
        type: "list",
        message: "Enter your designation",
        choices: ["Manager", "Engineer", "Intern"],
        name: "role"
    }];

