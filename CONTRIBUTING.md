 # Guide to Contributing and Team values 

 Our extension is open source and is more than happy to accept contributions.

 ## the Team Norms 

- **main communication**: Our team will mainly use either Zoom or discord to work together on sprints/holding daily standups 
- **secondary communication**: If one teammate requests to meet in person and other teammates agree, we will do so. 
- **Availability**: team members should have a few days a week to work and contribute to the project

## Team Values 
- team will work together effectively through proper communication and procedures
- if a team member requires help, they will ask for help in our primary communication channel 
- team members are expected to respond to messages within 24 hours 
- if a team member is falling behind, other team members will try and help them out 
- if there is a disagreement on directions, ultimately, the team will vote on how to proceed. 

## Sprint cadence 
- sprints should take be 2-3 weeks long. 

## Daily standups
- daily standup should take place anytime after five and should last at most 30 minutes 
- members are expected to be present synchronously.
- members will not cover for other members who do not participate
- a member who makes no progress on a task for two standups or more in a row will be reported to management.

## Coding standards
- Members will use vscode for their code editor and es-lint for their linter. 
- Always push working code, if you break the pipeline/build then fix it.
- try and comit as often even if tis a small bug fix
- Provide descriptive commit messages.
- Write self documenting code. Use descriptive variable and function names. Avoid unnecessary name shortening.
- Don't leave dead/commented out code behind. If you see such code, delete it.
- Write automated tests to cover critical integration points and functionality (once you learn how to do that).

## Git Workflow 

- Developers are expected to work on the code by using branches; they should create branches, edit code, push those changes to the branch, and ultimately make a pull request in teh original repo and wait for review from another teammate in which, if accepted, changes will be merged into the main branch 
- branch names should be specific to the category. For example, if it is a feature, feature-1 would be appropriate, and if it is a bug, bug-1 would be appropriate 

 ## Ways to contribute 
 
- **fix a issue**: if you encounter an issue or see an issue you want to work on in the issue tracker feel free to report the issue of request to work on an issue. 
- **Add to the extension**: If you feel like there can be additional features that could be benefical feel free to make a suggestion in the issue tracker.

## How to contribute

1. clone the repository locally on your machine. 
    ```
     git clone https://github.com/agiledev-students-spring2024/4-final-project-chef-it-up.git
    ```
3. Create a new branch and checkout to that branch.
    ```
     git branch <What you want the branch name to be>
     git checkout <the name you gave the branch>
    ```
4. make changes, add those changes to the staging area, commit, and push them to your branch 
    ```
     git add <name of files changed>
     git commit -m "description of what changes you made"
     git push origin <your branch name>
    ```
5. navigate to the original repo and create a pull request. 
6. Wait for your pull request to be merged if approved.

## instructions to setup local development environment 

1. Clone the repository to your local machine
2. Install project dependencies for both the front-end and back-end using the command below from teh root repository
   ```
    cd front-end
    npm install

   ```
   and 
   ```
    cd back-end
    npm install

   ```
3. from there add codes and to start the front-end and back-end navigate to those directory and input:
    ```
     npm start 
    ```

## instructions for building and testing the project 