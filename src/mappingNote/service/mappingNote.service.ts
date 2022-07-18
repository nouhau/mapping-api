import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MappingNote } from '../../common/entities/MappingNote';
import { Repository, UpdateResult } from 'typeorm';
import { Mapping } from '../../common/entities/Mapping';
import { MappingService } from '../../mapping/mapping.service';
import { RecordPeopleService } from '../../recordPeople/service/recordPeople.service';
import { RecordPeople } from '../../common/entities/RecordPeople';
import { EvaluationMatrixService } from '../../evaluationMatrix/service/evaluationMatrix.service';
import { EvaluationMatrix } from '../../common/entities/EvaluationMatrix';

@Injectable()
export class MappingNoteService {

  constructor(
    private readonly logger: Logger = new Logger(MappingNoteService.name),
    @InjectRepository(MappingNote) private mappingNoteMappingNoteRepository: Repository<MappingNote>,
    private readonly mappingService: MappingService,
    private readonly recordPeopleService: RecordPeopleService,
    private readonly evaluationMatrixService: EvaluationMatrixService
  ) {}

  
  getMappingNote = async (mappingId: string): Promise<MappingNote[]> => {
    this.logger.log(
      `Getting mappingNote from ${mappingId}`
    )

    return this.mappingNoteMappingNoteRepository.find({
      where: {
        mapping_id: mappingId
      }
    })
  }

  //TODO: REFACTOR THIS METHOD
  updateMappingNote = async (mappingId: string): Promise<{ affected: number }> => {
    this.logger.log(
      `Updating mappingNote from ${mappingId}`
    )

    const mapping: Mapping = await this.getMapping(mappingId)
    const mappingNote: MappingNote[] = await this.getMappingNote(mappingId)

    if(mappingNote) {
      let affected: number = 0

      const recordPeople: RecordPeople[] = await this.getRecordPeople(mapping.people_id)

      for(const notes of mappingNote){
        let somaProdutos: number = 0.0
        let somaPesos: number = 0.0
        const evaluatorMatrix: EvaluationMatrix[] = await this.getWeightSkill(notes.skill_id, mapping.matrix_id)
        const skills: EvaluationMatrix[] = evaluatorMatrix.filter(skill => skill.skill_id === notes.skill_id)
        
        skills.forEach(skill => {
          const records = recordPeople.filter(record => record.evidence_id === skill.evidence_id)
          if(records.length > 0) {
            somaProdutos += skill.value * records[0].average
            somaPesos += skill.value
          }
        })
        
        const mediaPond: number = Number((somaProdutos / somaPesos).toFixed(2))

        this.logger.log(
          `Updating mappingNotes with mappingId: ${mappingId}, skillId: ${notes.skill_id} with note: ${mediaPond}`
        )

        const updateMappingNote: UpdateResult = await this.mappingNoteMappingNoteRepository.update({
          mapping_id: mappingId,
          skill_id: notes.skill_id
        },
        {
          note: mediaPond
        })

        if (updateMappingNote.affected === 1) affected++

        this.logger.log(
          `Affected rows with this query, ${updateMappingNote.affected}. Total affected rows, ${affected}`
        )
      }

      return {
        affected
      }
    }
  }

  getMapping = async(mappingId: string): Promise<Mapping> => {
    this.logger.log(
      `Getting mapping from ${mappingId}`
    )

    return this.mappingService.getMapping(mappingId)
  }

  getRecordPeople = async (peopleId: string): Promise<RecordPeople[]> => {
    this.logger.log(
      `Getting records from ${peopleId}`
    )

    return this.recordPeopleService.getRecordPeople(peopleId)
  }

  getWeightSkill = async (skillId: string, matrixId: string): Promise<EvaluationMatrix[]> => {
    this.logger.log(
      `Getting skills with weight for skill: ${skillId}, matrix: ${matrixId}`
    )

    return this.evaluationMatrixService.getWeightSkill(skillId, matrixId)
  }
}
