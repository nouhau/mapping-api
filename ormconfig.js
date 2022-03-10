module.exports = {
  type: 'postgres',
  url: `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
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
