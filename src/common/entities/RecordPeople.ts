
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Evidence } from './Evidences'
import { randomUUID } from 'crypto'

@Entity('recordPeople')
export class RecordPeople {
    @PrimaryGeneratedColumn('uuid')
    record_id: string

    @Column({ nullable: false })
    people_id: string

    @Column({ nullable: false })
    evidence_id: string

    @JoinColumn({ name: 'evidence_id' })
    @ManyToOne(() => Evidence)
    evidenceId: Evidence;

    @Column()
    average: number | null;

    constructor (
      people_id: string,
      evidence_id: string,
      average?: number
    ) {
      if(!this.record_id) {
        this.record_id = randomUUID().toString()
      }
      this.people_id = people_id
      this.evidence_id = evidence_id
      this.average = !average ? null : average
    }
}
