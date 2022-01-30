import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

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
      desc?: string
    ) {
      if (!this.matrix_id) {
        this.matrix_id = uuid()
        this.active = false
      }
      this.name = name
      this.desc = desc
    }
}
