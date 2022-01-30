import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('skills')
export class Skill {
    @PrimaryGeneratedColumn('uuid')
    skill_id: string

    @Column({ nullable: false })
    name: string

    @Column()
    desc: string

    constructor (
      name?: string,
      desc?: string
    ) {
      if (!this.skill_id) {
        this.skill_id = uuid()
      }
      this.name = name
      this.desc = desc
    }
}
