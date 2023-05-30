* instalar nodemon
npm install --save-dev nodemon


mkdir report
cd report
git init
echo 'node_modules/' >.gitignore
touch app.js
npm init

git add .
git commit -m 'git and app init setup'
[master (root-commit) 7d98c94] git and app init setup
3 files changed, 12 insertions(+)
create mode 100644 .gitignore
create mode 100644 app.js
create mode 100644 package.json
npm i csv-parser csv-writer nodemailer