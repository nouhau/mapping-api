module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    // DO NOT DO THIS
    // set up your ca correctly to trust the connection
    rejectUnauthorized: false
  },
  entities: [
    'build/common/entities/*.js'
  ],
  migrations: [
    'build/config/migrations/*.js'

  ],
  cli: {
    migrationsDir: 'src/config/migrations',
    entitiesDir: 'src/common/entities'
  }
}
