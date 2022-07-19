import { MigrationInterface, QueryRunner } from 'typeorm'

export class changeColumnEvaluatorNoteValue1647913199811 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "evaluatorNotes" ALTER COLUMN "note" DROP NOT NULL;')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "evaluatorNotes" ALTER COLUMN "note" SET NOT NULL;')
  }
}
