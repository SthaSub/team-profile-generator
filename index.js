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

let engineer = {
    message: "Enter your github username",
    name: "name"
}

let manager = {
    message: "Enter your officeNumber",
    name: "name"
}

let intern = {
    message: "Enter your School name",
    name: "name"
}


let moreInfo;

const getQuestionAndAnswer = async (empolyee) => {
    return new Promise((resolved, rejected) => {
        inquirer.prompt(questions).then((answers) => {
            switch (answers.role) {
                case "Manager":
                    getEmployeeRoleInfo(answers.role).then(answer => {
                        moreInfo = answer.name;
                        resolved(empolyee.push(new Manager(answers.id, answers.name, answers.email, moreInfo)));
                    });
                    break;
                case "Engineer":
                    getEmployeeRoleInfo(answers.role).then(answer => {
                        moreInfo = answer.name;
                        resolved(empolyee.push(new Engineer(answers.id, answers.name, answers.email, moreInfo)));
                    })

                    break;
                case "Intern":
                    getEmployeeRoleInfo(answers.role).then(answer => {
                        moreInfo = answer.name;
                        resolved(empolyee.push(new Intern(answers.id, answers.name, answers.email, moreInfo)));
                    });
                    break;
            }

        }).catch((err) => {
            console.log(`${err} something went wrong`);
        });
    });
}

function getEmployeeRoleInfo(role) {
    if (role == "Manager") {
        return inquirer.prompt([manager]);
    } else if (role == "Engineer") {
        return inquirer.prompt([engineer]);
    } else {
        return inquirer.prompt([intern]);
    }
};

let empolyee = [];
const getInfoFromUser = async () => {
    let isNewMemberRequired = true;
    while (isNewMemberRequired) {
        await getQuestionAndAnswer(empolyee);
        let option = await promptAdditionalInfo().then(decision => {
            return decision;
        });
        if (option.member == "I don't want to add anymore team members") {
            isNewMemberRequired = false;
        }
    }
}

async function init() {
    getInfoFromUser();
};

init();