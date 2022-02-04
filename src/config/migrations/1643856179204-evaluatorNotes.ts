import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class evaluatorNotes1643856179204 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'evaluatorNotes',
        columns: [
          {
            name: 'evaluation_id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'evaluator_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'evidence_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'people_id',
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
            name: 'FKEvidenceID',
            referencedTableName: 'evidences',
            referencedColumnNames: ['evidence_id'],
            columnNames: ['evidence_id']
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('evaluatorNotes')
  }
}
