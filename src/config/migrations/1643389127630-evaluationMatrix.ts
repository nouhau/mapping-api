import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class evaluationMatrix1643389127630 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'evaluationMatrix',
        columns: [
          {
            name: 'evaluation_matrix_id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'evidence_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'skill_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'matrix_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'value',
            type: 'float',
            isNullable: false
          }
        ],
        foreignKeys: [
          {
            name: 'FKEvidenceID',
            referencedTableName: 'evidences',
            referencedColumnNames: ['evidence_id'],
            columnNames: ['evidence_id']
          },
          {
            name: 'FKSkillID',
            referencedTableName: 'skills',
            referencedColumnNames: ['skill_id'],
            columnNames: ['skill_id']
          },
          {
            name: 'FKMatrixID',
            referencedTableName: 'matrix',
            referencedColumnNames: ['matrix_id'],
            columnNames: ['matrix_id']
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('evaluationMatrix')
  }
}
