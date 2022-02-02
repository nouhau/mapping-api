/* eslint-disable camelcase */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Evidence } from './Evidences'

@Entity('recordPeople')
export class RecordPeople {
    @PrimaryGeneratedColumn('uuid')
    record_id: string

    @Column()
    people_email: string

    @Column({ nullable: false })
    evidence_id: string

    @JoinColumn({ name: 'evidence_id' })
    @ManyToOne(() => Evidence)
    evidenceId: Evidence;

    @Column()
    evaluator_1: number | null;

    @Column()
    evaluator_2: number | null;

    @Column()
    average: number | null;

    constructor (
      people_email: string,
      evidence_id: string,
      evaluator_1?: number,
      evaluator_2?: number,
      average?: number
    ) {
      this.people_email = people_email
      this.evidence_id = evidence_id
      this.evaluator_1 = !evaluator_1 ? null : evaluator_1
      this.evaluator_2 = !evaluator_2 ? null : evaluator_2
      this.average = !average ? null : average
    }
}
