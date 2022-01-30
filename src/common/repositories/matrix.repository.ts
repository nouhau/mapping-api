import { EntityManager, EntityRepository } from 'typeorm'
import { Matrix } from '../entities/Matrix'

@EntityRepository(Matrix)
export class MatrixRepository {
    private manager: EntityManager;

    constructor (manager: EntityManager) {
      this.manager = manager
    }

    getAll = async (): Promise<Matrix[]> => {
      return await this.manager.find(Matrix)
    }

    save = async (matrix: Matrix): Promise<Matrix> => {
      return await this.manager.save(matrix)
    }
}
