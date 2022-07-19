import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class mappings1645023803788 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'mappings',
        columns: [
          {
            name: 'mapping_id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'people_id',
            type: 'uuid',
            isNullable: false
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('mappings')
  }
}
