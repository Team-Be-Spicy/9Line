# 9Line

## Git Workflow

### Initialize repo

- Clone repository, DO NOT FORK: `git clone https://github.com/Team-Be-Spicy/9Line`.
- Navigate to repo: `cd 9Line`.
- You can run `git status` to check which branch you are on.

### Set up Dev Environment
1. Create MYSQL database called nineline
2. Start the Spring backend, use Java 17
3. `cd src/frontend`
4. `npm i`
5. `npm start`
6. You should see a message saying "Backend is working"

### Feature branching

1. When working on a new feature, create a feature branch and switch to that branch. Use a descriptive name so team members know what feature it is for. `git checkout -b my-feature-branch`.
2. When the `main` branch gets updated, merge the changes into your branch. `git pull origin main`.
3. When finished working on the feature, add, commit, and push your branch. Use descriptive commit message.
- `git add <files-to-add>`
- `git commit -m "my commit message"`
- `git push origin my-feature-branch`
4. Submit a pull request through Github to merge your branch into `main`. Ping team members to let them know a new PR has been opened.
5. When the PR gets merged, ping all members of the team to let them know that `main` has been updated and should update their branches.

### Rules

- NEVER PUSH TO `main`. All changes to `main` should come through a PR of a feature branch.
- Use descriptive branch names, should succinctly describe the feature. The final two words of a feature branch should always be `feature-branch`.  Use dashes between words: `landing-page-feature-branch`.
- Commit frequently and use descriptive commit messages. Describe what the commit is accomplishing.
- Pull Requests should be approved by 2 other team members before being merged.

### Committing and Squashing

- When working on a feature, you should be frequently adding and committing. This allows you to track what's been accomplished and split up functionality. Commit messages should be short but describe what the commit is accomplishing: `git commit -m "Added dispatcher entity to backend"`.
- You can run `git log` to see all commit history on a branch.
- If something has broken you can checkout individual commits using `git checkout <commit hash>` to figure out when the issue was introduced.
- When the branch is ready to be pushed and become a Pull Request, squash all commits into a single commit. This keeps commit history clean. If you have 3 commits on your branch for example: `git rebase -i HEAD~3`. This will bring up a list of commits that will look like:
    - `pick <hash> Added dispatcher entity to backend`
    - `pick <hash> Added responder entity to backend`
    - `pick <hash> Added requester entity to backend`
    - To squash these commits, change `pick` to `squash`, which will combine the given commit with the previous commit (the commit on the previous line). This will combine commits into a single commit:
    - `pick <hash> Added dispatcher entity to backend`
    - `squash <hash> Added responder entity to backend`
    - `squash <hash> Added requester entity to backend`
    - When you save after squashing, you will be brought to an editor that asks you to edit the message of the squashed commits. Make the subject of the commit what the overall goal of the final commit is. Seperate the body using a blank line and have the body be bullet points of all the squashed commits:
    - `Added role entities to backend`
    - ` `
    - `-Added dispatcher entity to backend`
    - `-Added responder entity to backend`
    - `-Added requester entity to backend`
    - When finished editing the final commit message, save it and push to origin.

### Pull Requests

- When reviewing a pull request check for obvious problems: TODOs, typos, styling issues, print statements, etc.
- Make sure it's following good git rules: good commit messages, squashing many commits into one, feature branch is up-to-date with `main`.
- Make sure variable/function names are clear.
- Make sure stuff that needs to be tested has tests written for it.
- If you notice any possible bugs or implementation issues, please write a comment and discuss with the code's author.
