import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class recordPeople1643807546942 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'recordPeople',
        columns: [
          {
            name: 'record_id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'people_email',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'evidence_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'evaluator_1',
            type: 'float',
            isNullable: true
          },
          {
            name: 'evaluator_2',
            type: 'float',
            isNullable: true
          },
          {
            name: 'average',
            type: 'float',
            isNullable: true
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
    await queryRunner.dropTable('recordPeople')
  }
}
