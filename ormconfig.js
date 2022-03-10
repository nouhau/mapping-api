module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
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
