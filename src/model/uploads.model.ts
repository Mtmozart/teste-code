import { PrismaClient } from '@prisma/client';

class UploadsModel {

  constructor(private prisma: PrismaClient) { }

  async registerCurriculum(fileName: string, candidateId: number) {
    const result = await this.prisma.candidate.findUnique({
      where: {
        id: candidateId
      }
    });

    if (!result) {
      return {
        error: 'Candidato não encontrado'
      }
    };

    await this.prisma.education.update({
      where: {
        id: candidateId
      },
      data: {
        curriculum: fileName
      }
    });

    return {
      message: 'Curriculum cadastrado com sucesso'
    };

  }


}

export default UploadsModel;