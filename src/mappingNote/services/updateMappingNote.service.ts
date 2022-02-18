import { getCustomRepository } from 'typeorm'
import { EvaluationMatrix } from '../../common/entities/EvaluationMatrix'
import { MappingNote } from '../../common/entities/MappingNote'
import { RecordPeople } from '../../common/entities/RecordPeople'
import { LoggerService } from '../../common/LoggerService'
import { MappingNoteRepository } from '../../common/repositories/mappingNote.repository'
import { GetWeightSkillService } from '../../matrix/services/getWeightSkill.service'
import { GetRecordPeopleService } from '../../recordPeople/services/getRecordPeople.service'
import { GetMappingNoteService } from './getMappingNote.service'

interface IUpdateMappingNoteService {
  mappingNoteRepository?: MappingNoteRepository,
  getMappingNoteService?: GetMappingNoteService,
  getRecordPeopleService?: GetRecordPeopleService,
  getWeightSkillService?: GetWeightSkillService
}

export class UpdateMappingNoteService {
    private mappingNoteRepository: MappingNoteRepository
    private logger: LoggerService = new LoggerService()
    private getMappingNoteService: GetMappingNoteService
    private getRecordPeopleService: GetRecordPeopleService
    private getWeightSkillService: GetWeightSkillService

    constructor ({
      mappingNoteRepository = getCustomRepository(MappingNoteRepository),
      getMappingNoteService = new GetMappingNoteService(),
      getRecordPeopleService = new GetRecordPeopleService(),
      getWeightSkillService = new GetWeightSkillService()
    }: IUpdateMappingNoteService) {
      this.mappingNoteRepository = mappingNoteRepository
      this.getMappingNoteService = getMappingNoteService
      this.getRecordPeopleService = getRecordPeopleService
      this.getWeightSkillService = getWeightSkillService
    }

    async execute () {
      this.logger.trace(
        'Updating note',
        this.constructor.name
      )

      return await Promise.all([
        this.getMappingNote(),
        this.getRecordPeople(),
        this.getWeightSkill()
      ])
        .then(async result => {
          // TODO: refactor method and split responsabilities
          const mappingNote = result[0][0]
          const skills = result[2].filter(skill => skill.skill_id === mappingNote.skill_id)
          let somaProdutos = 0
          let somaPesos = 0
          skills.forEach(skill => {
            somaProdutos += skill.value * mappingNote.note
            somaPesos += skill.value
          })

          let media = 0
          result[1].forEach(recordPeople => {
            media += recordPeople.average
          })
          media = media / result[1].length

          const mediaPond = somaProdutos / somaPesos

          console.log({ somaProdutos, media, somaPesos, mediaPond })

          return this.mappingNoteRepository.updateMappingNote()
        })
    }

    // TODO: create object to improve returns
    private async getRecordPeople (): Promise<RecordPeople[]> {
      this.logger.trace(
        'Getting record people average',
        this.constructor.name
      )
      return await this.getRecordPeopleService.execute()
    }

    private async getWeightSkill (): Promise<EvaluationMatrix[]> {
      this.logger.trace(
        'Getting skills with weight',
        this.constructor.name
      )
      return this.getWeightSkillService.execute()
    }

    private async getMappingNote (): Promise<MappingNote[]> {
      this.logger.trace(
        'Getting mapping',
        this.constructor.name
      )
      return this.getMappingNoteService.execute()
    }
}
