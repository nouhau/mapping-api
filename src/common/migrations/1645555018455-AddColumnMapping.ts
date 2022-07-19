import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class AddColumnMapping1645555018455 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'mappings',
      new TableColumn({
        name: 'matrix_id',
        type: 'uuid',
        isNullable: true
      })
    )

    await queryRunner.createForeignKey(
      'mappings',
      new TableForeignKey({
        name: 'FKMatrixID',
        referencedTableName: 'matrix',
        referencedColumnNames: ['matrix_id'],
        columnNames: ['matrix_id']
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('mappings', 'FKMatrixID')
    await queryRunner.dropColumn('mappings', 'matrix_id')
  }
}
