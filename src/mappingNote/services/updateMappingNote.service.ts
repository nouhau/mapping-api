import { getCustomRepository } from 'typeorm'
import { EvaluationMatrix } from '../../common/entities/EvaluationMatrix'
import { Mapping } from '../../common/entities/Mapping'
import { MappingNote } from '../../common/entities/MappingNote'
import { RecordPeople } from '../../common/entities/RecordPeople'
import { LoggerService } from '../../common/LoggerService'
import { MappingNoteRepository } from '../../common/repositories/mappingNote.repository'
import { GetWeightSkillService } from '../../matrix/services/getWeightSkill.service'
import { GetRecordPeopleService } from '../../recordPeople/services/getRecordPeople.service'
import { GetMappingNoteService } from './getMappingNote.service'
import { MappingService } from './mapping.service'

export class UpdateMappingNoteService {
    private mappingNoteRepository: MappingNoteRepository
    private logger: LoggerService = new LoggerService()
    private getMappingNoteService: GetMappingNoteService
    private getRecordPeopleService: GetRecordPeopleService
    private getWeightSkillService: GetWeightSkillService
    private mappingService: MappingService

    constructor (
      mappingNoteRepository: MappingNoteRepository = getCustomRepository(MappingNoteRepository),
      getMappingNoteService: GetMappingNoteService = new GetMappingNoteService(),
      getRecordPeopleService: GetRecordPeopleService = new GetRecordPeopleService(),
      getWeightSkillService: GetWeightSkillService = new GetWeightSkillService(),
      mappingService: MappingService = new MappingService()
    ) {
      this.mappingNoteRepository = mappingNoteRepository
      this.getMappingNoteService = getMappingNoteService
      this.getRecordPeopleService = getRecordPeopleService
      this.getWeightSkillService = getWeightSkillService
      this.mappingService = mappingService
    }

    async execute (mappingId: string) {
      this.logger.trace(
        'Updating note',
        this.constructor.name
      )

      return await Promise.all([
        this.getMapping(mappingId),
        this.getMappingNote(),
        this.getRecordPeople()
      ])
        .then(async result => {
          // TODO: refactor method and split responsabilities
          const mapping = result[0]
          const mappingNote = result[1][0]
          let somaProdutos = 0.0
          let somaPesos = 0.0
          let media = 0.0

          return this.getWeightSkill(mappingNote.skill_id, mapping.matrix_id)
            .then(async evaluationMatrix => {
              console.log(evaluationMatrix)
              const skills = evaluationMatrix.filter(skill => skill.skill_id === mappingNote.skill_id)

              skills.forEach(skill => {
                somaProdutos += skill.value * mappingNote.note
                somaPesos += skill.value
              })

              result[2].forEach(recordPeople => {
                media += recordPeople.average
              })
              media = media / result[1].length

              const mediaPond = somaProdutos / somaPesos

              console.log({ somaProdutos, media, somaPesos, mediaPond })

              console.log(result)

              return await this.mappingNoteRepository.updateMappingNote()
            })
        })
    }

    // TODO: create object to improve returns
    private async getMapping (mappingId: string): Promise<Mapping> {
      this.logger.trace(
        'Getting mapping',
        this.constructor.name
      )

      return await this.mappingService.getMapping(mappingId)
    }

    private async getRecordPeople (): Promise<RecordPeople[]> {
      this.logger.trace(
        'Getting record people average',
        this.constructor.name
      )
      return await this.getRecordPeopleService.execute()
    }

    private async getWeightSkill (skillId: string, matrixId: string): Promise<EvaluationMatrix[]> {
      this.logger.trace(
        'Getting skills with weight',
        this.constructor.name
      )
      return this.getWeightSkillService.execute(skillId, matrixId)
    }

    private async getMappingNote (): Promise<MappingNote[]> {
      this.logger.trace(
        'Getting mapping',
        this.constructor.name
      )
      return this.getMappingNoteService.execute()
    }
}
