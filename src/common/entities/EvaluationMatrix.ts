/* eslint-disable camelcase */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Evidence } from './Evidences'
import { Matrix } from './Matrix'
import { Skill } from './Skills'

@Entity('evaluationMatrix')
export class EvaluationMatrix {
    @PrimaryGeneratedColumn('uuid')
    evaluation_matrix_id: string

    @Column({ nullable: false })
    evidence_id: string

    @JoinColumn({ name: 'evidence_id' })
    @ManyToOne(() => Evidence)
    evidenceId: Evidence;

    @Column({ nullable: false })
    skill_id: string

    @JoinColumn({ name: 'skill_id' })
    @ManyToOne(() => Skill)
    skillId: Skill;

    @Column({ nullable: false })
    matrix_id: string

    @JoinColumn({ name: 'matrix_id' })
    @ManyToOne(() => Matrix)
    matrixId: Matrix;

    @Column({ nullable: false })
    value: number
}
