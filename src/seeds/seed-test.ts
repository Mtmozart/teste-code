// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criando dados de exemplo para ContactInfo
  const contactInfo1 = await prisma.contactInfo.create({
    data: {
      phone: '123456789',
      address: 'Rua das Flores, 123',
    }, 
  });

  const contactInfo2 = await prisma.contactInfo.create({
    data: {
      phone: '987654321',
      address: 'Avenida das Palmeiras, 456',
    },
  });

  // Criando candidatos com suas informações de contato
  const candidate1 = await prisma.candidate.create({
    data: {
      name: 'João Silva',
      email: 'joao.silva@example.com',
      age: 25,
      about: 'Desenvolvedor Full Stack',
      password: '$2b$10$88jSg53qlK4T0cyDsqNR6eUn07qSyE2gcRKjjuANNDQqpmxaeDIsq',
      contactInfoId: contactInfo1.id, // Referência ao ContactInfo
    },
  });
  
  const candidate2 = await prisma.candidate.create({
    data: {
      name: 'Maria Oliveira',
      email: 'maria.oliveira@example.com',
      age: 30,
      about: 'Designer Gráfico',
      password: '$2b$10$88jSg53qlK4T0cyDsqNR6eUn07qSyE2gcRKjjuANNDQqpmxaeDIsq',
      contactInfoId: contactInfo2.id, // Referência ao ContactInfo
    },
  });

  // Criando dados de exemplo para Educação
  await prisma.education.createMany({
    data: [
      {
        formation: 'Engenharia de Software',
        experience: '5 anos em desenvolvimento.',
        curriculum: 'curriculo_joao.pdf',
        candidateId: candidate1.id, // Referência ao Candidate
      },
      {
        formation: 'Design Gráfico',
        experience: '3 anos em design.',
        curriculum: 'curriculo_maria.pdf',
        candidateId: candidate2.id, // Referência ao Candidate
      },
    ],
  });

  console.log('Dados semeados com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
