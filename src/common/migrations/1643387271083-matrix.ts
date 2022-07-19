import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class matrix1643387271083 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'matrix',
        columns: [
          {
            name: 'matrix_id',
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
            name: 'active',
            type: 'boolean',
            isNullable: false
          },
          {
            name: 'desc',
            type: 'varchar'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('matrix')
  }
}
