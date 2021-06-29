# node-koa-poc

This is a project that serves as reference materials/POC for Node JS with KOA. Since a good course regarding KOA could not be found, a [Udemy course](https://www.udemy.com/course/nodejs-the-complete-guide/) that mainly uses Node JS, Express JS and Sequelize will be used as a basis for this project. KOA will be refactored into the project at a later date.

## Getting Started

1. Get node (v16+) and npm from <https://nodejs.org/en/>
2. Setup and run a MySQL server at localhost
   1. Get MySQL server here: <https://dev.mysql.com/downloads/mysql/>
   2. Configure your MySQL database following the configurations stated at `project_root_folder/sequelize-db/config.json` e.g. username, password, database name etc.
3. Run the following commands

   ```bash
   npm ci
   npm run init-db
   npm run start
   ```

4. Visit <http://localhost:3000>
