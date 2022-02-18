import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Evidence } from './Evidences'

@Entity('evaluatorNotes')
export class EvaluatorNote {
    @PrimaryGeneratedColumn('uuid')
    evaluation_id: string

    @Column({ nullable: false })
    evaluator_id: string

    @Column({ nullable: false })
    people_id: string

    @Column({ nullable: false })
    evidence_id: string

    @JoinColumn({ name: 'evidence_id' })
    @ManyToOne(() => Evidence)
    evidenceId: Evidence;

    @Column()
    note: number | null;

    constructor (
      evaluator_id: string,
      people_id: string,
      evidence_id: string,
      note?: number
    ) {
      this.evaluator_id = evaluator_id
      this.people_id = people_id
      this.evidence_id = evidence_id
      this.note = !note ? null : note
    }
}
