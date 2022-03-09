import { Client } from 'pg'
import 'dotenv/config'

export class DataTest {
  private client: Client = new Client({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: 5005,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME
  })

  createConnection = async () => {
    await this.client.connect()
  }

  closeConnection = async () => {
    await this.client.end()
  }

  createSkills = async () => {
    return this.client.query(
      `INSERT INTO "skills"("skill_id", "name", "desc") VALUES
      ('cd5cd3a0-ae55-47a0-899e-82ed8c659122', 'Skill', 'Description'), 
      ('41e7d0a5-2772-4094-ad66-d85349366a34', 'Another Skill', 'Description')`
    )
  }

  createEvidences = async () => {
    return this.client.query(
      `INSERT INTO "evidences"("evidence_id", "name", "desc") VALUES
      ('cd5cd3a0-ae55-47a0-899e-82ed8c659122', 'Evidence', 'Description'), 
      ('41e7d0a5-2772-4094-ad66-d85349366a34', 'Another Evidence', 'Description')`
    )
  }

  createMatrix = async () => {
    return this.client.query(
      `INSERT INTO "matrix"("matrix_id", "name", "active", "desc") VALUES
      ('1535806b-24e6-4815-9561-a5112ff05146', 'Matrix', False, 'Description'), 
      ('8362a3ca-9721-43b4-a0b3-527a4dee3337', 'Another Matrix', False, 'Description')`
    )
  }

  deleteData = async ( data: string, id: string ) => {
    const table = data === 'evidence' || 'skill' ? `${data}s` : 'matrix'
    return this.client.query(
      `DELETE FROM "${table}" WHERE "${data}_id" = '${id}'`
    )
  }
}
