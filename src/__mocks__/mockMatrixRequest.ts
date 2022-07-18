import { MatrixRequest } from '../matrix/dto/matrixRequest.dto'

export const getMockMatrixRequest = (
  name = 'string',
  desc = 'desc string'
): MatrixRequest => ({
  name,
  desc
})
