import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class skills1643383853316 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'skills',
        columns: [
          {
            name: 'skill_id',
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
    await queryRunner.dropTable('skills')
  }
}
