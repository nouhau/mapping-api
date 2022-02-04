import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { randomUUID } from 'crypto'

@Entity('evidences')
export class Evidence {
    @PrimaryGeneratedColumn('uuid')
    evidence_id: string

    @Column({ nullable: false })
    name: string

    @Column()
    desc: string

    constructor (
      name: string,
      desc?: string
    ) {
      if (!this.evidence_id) {
        this.evidence_id = randomUUID().toString()
      }
      this.name = name
      this.desc = desc
    }
}
