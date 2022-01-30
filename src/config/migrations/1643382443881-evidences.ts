import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class evidences1643382443881 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'evidences',
        columns: [
          {
            name: 'evidence_id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'desc',
            type: 'varchar'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('evidences')
  }
}
