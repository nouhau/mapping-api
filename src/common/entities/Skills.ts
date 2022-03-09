import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { randomUUID } from 'crypto'

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
      if (!this.skill_id){
        this.skill_id = randomUUID().toString()
      }
      this.name = name
      this.desc = desc
    }
}
