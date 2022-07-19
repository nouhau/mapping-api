import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class mappingNotes1645024070170 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'mappingNotes',
        columns: [
          {
            name: 'mappingNote_id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'mapping_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'skill_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'note',
            type: 'float',
            default: 0
          }
        ],
        foreignKeys: [
          {
            name: 'FKMappingID',
            referencedTableName: 'mappings',
            referencedColumnNames: ['mapping_id'],
            columnNames: ['mapping_id']
          },
          {
            name: 'FKSkillID',
            referencedTableName: 'skills',
            referencedColumnNames: ['skill_id'],
            columnNames: ['skill_id']
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('mappingNotes')
  }
}
