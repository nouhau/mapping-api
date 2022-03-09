import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { randomUUID } from 'crypto'

@Entity('mappings')
export class Mapping {
    @PrimaryGeneratedColumn('uuid')
    mapping_id: string

    @Column({ nullable: false })
    people_id: string

    @Column({ nullable: false })
    matrix_id: string

    constructor (
      people_id: string,
      matrix_id: string
    ) {
      if(!this.mapping_id) {
        this.mapping_id = randomUUID().toString()
      }
      this.people_id = people_id
      this.matrix_id = matrix_id
    }
}
