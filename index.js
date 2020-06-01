#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const axios = require('axios');
const requireEnv = require("require-environment-variables");
const _ = require('lodash');

try {
  requireEnv(['CIRCLECI_TOKEN']);
} catch(e){
  console.log("Please set the value and try again.")
  return 1
}

const init = () => {

  console.log(
      chalk.blue.bold(
          figlet.textSync("KGrid Release CLI", {
            horizontalLayout: "default",
            verticalLayout: "default"
          })
      )
  );

}

const askQuestions = () => {
  const questions = [
    {
      name: "component",
      type: "list",
      message: "What KGrid Component are you Releasing?",
      choices: [
        new inquirer.Separator("--- Components ---"),
        {
          name: 'Activator',
          value: 'kgrid/kgrid-activator'
        },
        {
          name: 'Adapter',
          value: 'kgrid/kgrid-adapter'
        },
        {
          name: 'Library',
          value: 'kgrid/kgrid-library'
        },
        {
          name: 'Play',
          value: 'kgrid/kgrid-play'
        },
        {
          name: 'Shelf',
          value: 'kgrid/kgrid-shelf'
        },
        {
          name: 'Release CLI',
          value: 'kgrid/kgrid-release-cli'
        },
        {
          name: 'KGrid CLI',
          value: 'kgrid/kgrid-cli'
        },
        new inquirer.Separator("--- KO Collections ---"),
        {
          name: 'IPP Collection',
          value: 'kgrid-objects/ipp-collection'
        },
        {
          name: 'CPIC Collection',
          value: 'kgrid-objects/cpic-collection'
        },
        {
          name: 'Example Collection',
          value: 'kgrid-objects/example-collection'
        },
        {
          name: 'Opioid Collection',
          value: 'kgrid-objects/opioid-collection'
        },
        new inquirer.Separator("--- Demo Clients ---"),
        {
          name: 'Cancer Advisor Demo',
          value: 'kgrid-demos/cancer-advisor'
        },
        {
          name: 'Labwise Demo',
          value: 'kgrid-demos/labwise'
        },
        {
          name: 'RxPattern Demo',
          value: 'kgrid-demos/rxpattern'
        },
        {
          name: 'Cardiac Advisor aka postpci Demo',
          value: 'kgrid-demos/cardiac-advisor'
        },
        {
          name: 'Drug Gene Tool Demo',
          value: 'kgrid-demos/druggenetool'
        },
        {
          name: 'CPIC Demo',
          value: 'kgrid-demos/cpic-demo'
        }
      ],
      filter: function(val) {
        return val.toLowerCase();
      }
    },
    {
      type: "input",
      name: "branch",
      message: "What branch (e.g. hotfix, feature or master)?",
      default:"master"
    },
    {
      type: "input",
      name: "module",
      message: "What is the Component Module (e.g. adapter-api or javascript-adapter or blank)?"
    },
    {
      type: "input",
      name: "releaseversion",
      message: "What is the Release Version (e.g. 1.0.3)?"
    },
    {
      type: "input",
      name: "deploymentversion",
      message: "What is the Development Version (e.g 1.0.4-SNAPSHOT)?"
    },
    {
      type: 'confirm',
      name: 'prerelease',
      message: 'Is this PreRelease?',
      default: false
    }
  ];
  return inquirer.prompt(questions);
};

const run = async () => {
  // show script introduction
  init();

  const answers = await askQuestions();

  let url = "https://circleci.com/api/v1.1/project/github/"+ answers.component + "/tree/" + answers.branch +"?circle-token="+process.env.CIRCLECI_TOKEN;
  let data = {"build_parameters":{
      "RELEASE":answers.releaseversion,
      "NEXT":answers.deploymentversion,
      "PRERELEASE": answers.prerelease,
      "MODULE":answers.module,
      "GIT_USER_NAME": "KGridReleaseCLI",
      "GIT_USER_EMAIL":"kgrid-developers@umich.edu"}};

  axios.post(url, data)
  .then(function (response) {
    // handle success
    console.log("Build has started" );
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

};

run();
