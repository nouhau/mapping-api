import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Mapping } from './Mapping';
import { Skill } from './Skills';

@Entity('mappingNotes')
export class MappingNote {
    @PrimaryGeneratedColumn('uuid')
    mappingNote_id: string

    @Column({ nullable: false })
    mapping_id: string
    
    @JoinColumn({ name: 'mapping_id' })
    @ManyToOne(() => Mapping)
    mappingId: Mapping;

    @Column({ nullable: false })
    skill_id: string

    @JoinColumn({ name: 'skill_id' })
    @ManyToOne(() => Skill)
    skillId: Skill;

    @Column()
    note: number | null;

    constructor (
      mapping_id: string,
      skill_id: string,
      note?: number
    ) {
      this.mapping_id = mapping_id
      this.skill_id = skill_id
      this.note = !note ? null : note
    }
}
