export const config = {
  development: {
    username: 'root',
    password: 'null',
    database: 'Indego',
    dialect: 'sqlite',
    storage: './database.sqlite3',
    timezone: '+09:00',
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory',
    timezone: '+09:00',
  },
  production: {
    dialect: 'sqlite',
    storage: './database.sqlite3',
    timezone: '+09:00',
  },
};
