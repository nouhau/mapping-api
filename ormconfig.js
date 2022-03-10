module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    'src/common/entities/*.ts'
  ],
  migrations: [
    'src/config/migrations/*.ts'

  ],
  cli: {
    migrationsDir: 'src/config/migrations',
    entitiesDir: 'src/common/entities'
  }
}
