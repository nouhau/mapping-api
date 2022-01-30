import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

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
        this.evidence_id = uuid()
      }
      this.name = name
      this.desc = desc
    }
}
