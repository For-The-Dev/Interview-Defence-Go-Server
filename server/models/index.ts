'use strict';

import { Sequelize } from 'sequelize';
import { config } from '../config/config';

export const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    dialect: 'sqlite',
    storage: './database.sqlite3',
  }
);

// import fs from 'fs';
// import path from 'path';
// import process from 'process';
// const basename: string = path.basename(__filename);
// const env: string = process.env.NODE_ENV || 'development';
// const config: any = require(__dirname + '/../config/config.json')[env];
// const db: any = {};

// let sequelize: Sequelize;

// sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   config
// );

// fs.readdirSync(__dirname)
//   .filter((file: string) => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach((file: string) => {
//     const model = require(path.join(__dirname, file))(sequelize, DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName: string) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// export default db as {
//   sequelize: Sequelize;
//   Sequelize: typeof Sequelize;
//   // ... 추가되는 부분
// };
