import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { randomUUID } from 'crypto'

@Entity('matrix')
export class Matrix {
    @PrimaryGeneratedColumn('uuid')
    matrix_id: string

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false })
    active: boolean

    @Column()
    desc: string

    @Column()
    created_at: Date

    constructor (
      name?: string,
      desc?: string,
      active?: boolean
    ) {
      if(!this.matrix_id) {
        this.matrix_id = randomUUID().toString()
      }
      this.name = name
      this.desc = desc
      this.active = active ? active : false
    }
}
