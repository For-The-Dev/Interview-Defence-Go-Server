export const config = {
  development: {
    username: 'root',
    password: 'null',
    database: 'Indego',
    dialect: 'sqlite',
    storage: './database.sqlite3',
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory',
  },
  production: {
    dialect: 'sqlite',
    storage: './database.sqlite3',
  },
};
