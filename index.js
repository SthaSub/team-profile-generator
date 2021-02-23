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

const promptAdditionalInfo = async () => {
    return new Promise((resolved, rejected) => {
        inquirer.prompt([
            {
                type: "list",
                message: "Which type of team member would you like to add?",
                name: "member",
                choices: ["Engineer", "Intern", "I don't want to add anymore team members"]
            }
        ]).then(getAns => {
            resolved(getAns);
        });
    })
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
    getHtml();
}

const readHtmlFile = (filePath, employeeType) => {
    let employeeHtml = fs.readFileSync(filePath, "utf8");
    if (employeeType.getRole() == "Manager") {
        return employeeHtml.replace(/{role}/g, employeeType.getRole())
            .replace(/{managerID}/g, employeeType.getID())
            .replace(/{managerID}/g, employeeType.getID())
            .replace(/{managerName}/g, employeeType.getName())
            .replace(/{managerEmail}/g, employeeType.getEmail())
            .replace(/{managerOfficeNo}/g, employeeType.getOfficerNumber());
    } else if (employeeType.getRole() == "Engineer") {
        return employeeHtml.replace(/{role}/g, employeeType.getRole())
            .replace(/{engineerID}/g, employeeType.getID())
            .replace(/{engineerName}/g, employeeType.getName())
            .replace(/{engineerEmail}/g, employeeType.getEmail())
            .replace(/{engineerGithub}/g, employeeType.getGitHub());
    } else if (employeeType.getRole() == "Intern") {
        return employeeHtml.replace(/{role}/g, employeeType.getRole())
            .replace(/{internID}/g, employeeType.getID())
            .replace(/{internName}/g, employeeType.getName())
            .replace(/{internEmail}/g, employeeType.getEmail())
            .replace(/{internSchool}/g, employeeType.getSchool());
    }
    return;
}


const getHtml =  () => {
    let mergeHtml = ""
    let htmlofEmployee = "";
    for (const key in empolyee) {
        if (empolyee[key].getRole() == "Manager") {
            htmlofEmployee = readHtmlFile("./src/manager.html", empolyee[key]);
        } else if (empolyee[key].getRole() == "Intern") {
            htmlofEmployee = readHtmlFile("./src/intern.html", empolyee[key]);
        } else if (empolyee[key].getRole() == "Engineer") {
            htmlofEmployee = readHtmlFile("./src/engineer.html", empolyee[key]);
        };
        mergeHtml += htmlofEmployee;
    }

    let teamHtml;
    teamHtml = fs.readFileSync(teamFile, "utf8");
    let finalTeamHtml = teamHtml.replace(/<!-- employee here -->/g, mergeHtml);
    
    fs.writeFileSync(outputFile,finalTeamHtml,(err)=>{
        err?console.log(err):console.log("successfully added");
    });

}

async function init() {
    getInfoFromUser();
};

init();