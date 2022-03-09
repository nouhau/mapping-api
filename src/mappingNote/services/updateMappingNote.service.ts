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

      let peopleId: string

      // TODO: refactor this
      return await this.getMapping(mappingId)
        .then(async mapping => {
          peopleId = mapping.people_id
          return await this.getMappingNote(mappingId)
            .then(async mappingNote => {
              let somaProdutos = 0.0
              let somaPesos = 0.0
              let media = 0.0
              const recordPeople = await this.getRecordPeople(peopleId)
              const evaluatorMatrix = await this.getWeightSkill(mappingNote[0].skill_id, mapping.matrix_id)
              const skills = evaluatorMatrix.filter(skill => skill.skill_id === mappingNote[0].skill_id)
              skills.forEach(skill => {
                somaProdutos += skill.value * mappingNote[0].note
                somaPesos += skill.value
              })

              recordPeople.forEach(record => {
                media += record.average
              })
              media = media / evaluatorMatrix.length

              const mediaPond = somaProdutos / somaPesos

              console.log({ somaProdutos, media, somaPesos, mediaPond })

              return await this.mappingNoteRepository.updateMappingNote(
                mappingId,
                mappingNote[0].skill_id,
                mediaPond
              )
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

    private async getRecordPeople (peopleId: string): Promise<RecordPeople[]> {
      this.logger.trace(
        'Getting record people average',
        this.constructor.name
      )
      return await this.getRecordPeopleService.execute(peopleId)
    }

    private async getWeightSkill (skillId: string, matrixId: string): Promise<EvaluationMatrix[]> {
      this.logger.trace(
        'Getting skills with weight',
        this.constructor.name
      )
      return this.getWeightSkillService.execute(skillId, matrixId)
    }

    private async getMappingNote (mappingId: string): Promise<MappingNote[]> {
      this.logger.trace(
        'Getting mapping',
        this.constructor.name
      )

      return this.getMappingNoteService.execute(mappingId)
    }
}
