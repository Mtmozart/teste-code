import { PrismaClient } from '@prisma/client';
import { TCandidate } from '../types/cadidate';
import { hashPassword } from '../config/bcrypt';

class CandidateModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // método para cadastrar um candidato, falta revisar
  async register(data: any) {
    const { name, email, phone, address, age, about, experience, formation, curriculum, password } = data;

    // iniciando uma transação
    const transaction = await this.prisma.$transaction(async (prisma) => {

      // salvando os dados de contato do candidato
      const contact = await this.prisma.contactInfo.create({
        data: {
          phone,
          address,
        },
      });

      // salvando os dados do candidato
      const candidate = await this.prisma.candidate.create({
        data: {
          name,
          email,
          password,
          age:parseInt(age),
          about,
          contactInfo: {
            connect: {
              id: contact.id,
            },
          },
        },
      });

      // salvando os dados de formação e experiência do candidato e caminho do currículo (faltando implementar o upload do currículo)
      const education = await prisma.education.create({
        data: {
          formation,
          experience,
          curriculum,
          candidateId: candidate.id,
        },
      });
    });

    // finalizando a conexão com o banco de dados
    await this.prisma.$disconnect();
    
    // se tudo ocorrer bem, retornar a mensagem de usuário registrado, se nao, o middleware de erro do express irá capturar o erro
    return {
      message: 'Usuário registrado!',
    };
  }

  
  // método para buscar um candidato pelo id, falta revisar
  async findById(id: number) {
    const candidate = await this.prisma.candidate.findUnique({
      where: {
        id,
      },
      include: {
        contactInfo: true,
        educations: true,
      },
    });

    // se o candidato não for encontrado, retornar uma mensagem de erro
    if (!candidate) {
      return {
        error: 'Candidato não encontrado!',
      };
    }

    const { password, ...rest } = candidate;

    // retornar o candidato encontrado sem a senha
    return rest;
  }

  // método para buscar todos os candidatos, falta revisar
  async findAll() {
    const candidates = await this.prisma.candidate.findMany();

    const result = candidates.map((candidate) => {
      const { password, ...rest } = candidate;
      return rest;
    });

    // retornar todos os candidatos encontrados sem a senha
    return result;
  }

  // método para atualizar um candidato, falta revisar 
  async update(data: TCandidate) {
    const { id, name, email, phone, address, age, about, experience, formation, password } = data;
  
    try {
      const candidateExists = await this.prisma.candidate.findUnique({
        where: { id },
        include: {
          contactInfo: true,
          educations: true,
        },
      });
    
      if (!candidateExists) return { error: 'Candidato não encontrado!' };
    
      // Iniciando uma transação
     await this.prisma.$transaction(async (prisma) => {
    
        // Atualizando os dados de contato do candidato, se não houver alteração mantém o valor antigo
        await prisma.contactInfo.update({
          where: { id: candidateExists.contactInfo.id },
          data: {
            phone: phone || candidateExists.contactInfo.phone,
            address: address || candidateExists.contactInfo.address,
          },
        });
    
        // Só realiza o hash da senha se uma nova senha for fornecida
        const hashPass = password ? await hashPassword(password) : candidateExists.password;
    
        await prisma.candidate.update({
          where: { id },
          data: {
            name: name || candidateExists.name,
            email: email || candidateExists.email,
            password: hashPass,
            age: age || candidateExists.age,
            about: about || candidateExists.about,
          },
        });
    
        // Atualizando múltiplas educações do candidato
        if (formation && experience) {
          await Promise.all(
            candidateExists.educations.map(async (education, index) => {
              await prisma.education.update({
                where: { id: education.id },
                data: {
                  formation: formation[index] || education.formation,
                  experience: experience[index] || education.experience,
                },
              });
            })
          );
        }
      });
  
      // finalizando a conexão com o banco de dados
      await this.prisma.$disconnect();
  
      return {
        message: 'Candidato atualizado com sucesso!',
      };
      
    } catch (error) {
      return {
        error: 'Erro ao atualizar o candidato.',
      };
    }
  }
  

  // método para deletar um candidato, falta revisar
  async delete(id: number) {
    try {
      // Verificar se o candidato existe antes de realizar o soft delete
      const candidateExists = await this.prisma.candidate.findUnique({
        where: { id },
      });
  
      if (!candidateExists) {
        return {
          message: 'Candidato não encontrado!',
        };
      }
  
      // Realizar soft delete, desativando o candidato
      await this.prisma.candidate.update({
        where: { id },
        data: {
          isDeleted: true,
        },
      });
  
      return {
        message: 'Candidato deletado com sucesso!',
      };

    } catch (error) {
      return {
        error: 'Erro ao deletar o candidato.',
      };
    }
  }
  
  // restaurar um candidato, falta revisar
  async restore(id: number) {
    try {
      // Verificar se o candidato existe antes de restaurá-lo
      const candidateExists = await this.prisma.candidate.findUnique({
        where: { id },
      });
  
      if (!candidateExists || !candidateExists.isDeleted) {
        return {
          message: 'Candidato não encontrado ou já está ativo.',
        };
      }
  
      // Restaurar o candidato, desativando a flag de soft delete
      await this.prisma.candidate.update({
        where: { id },
        data: {
          isDeleted: false,
        },
      });
  
      return {
        message: 'Candidato restaurado com sucesso!',
      };

    } catch (error) {
      return {
        error: 'Erro ao restaurar o candidato.',
      };
    }
  }  
}

export default CandidateModel;