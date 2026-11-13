
import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/index.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando o seed do banco de dados...');

  // Limpeza das tabelas em ordem reversa às dependências
  await prisma.respostaSimulado.deleteMany();
  await prisma.questaoSimulado.deleteMany();
  await prisma.simulado.deleteMany();
  await prisma.noticia.deleteMany();
  await prisma.carreiras.deleteMany();
  await prisma.dica.deleteMany();
  await prisma.estagio.deleteMany();
  await prisma.video.deleteMany();
  await prisma.sobreNos.deleteMany();
  await prisma.membroEquipe.deleteMany();
  await prisma.administrador.deleteMany();

  // 1. Administrador
  const senhaHash = await bcrypt.hash('Admin@123', 10);

  await prisma.administrador.create({
    data: {
      nome: 'Administrador Principal',
      email: 'admin@portal.edu.br',
      senha: senhaHash,
      ativo: true,
    },
  });

  // 2. Sobre Nós
  await prisma.sobreNos.create({
    data: {
      nomeProjeto: 'Portal Guia de Carreiras & Estudos',
      descricao:
        'Plataforma dedicada a auxiliar estudantes do ensino médio e técnico na preparação para vestibulares, escolha profissional e ingresso no mercado de trabalho.',
      objetivo:
        'Democratizar o acesso a simulados, orientação vocacional e oportunidades de estágio.',
      membros: ['Ana Clara Souza', 'Lucas Mendes', 'Beatriz Lima'],
      contatos: ['contato@portal.edu.br', '@portalcarreiras'],
    },
  });

  // 3. Membros da Equipe
  await prisma.membroEquipe.createMany({
    data: [
      {
        nome: 'Ana Clara Souza',
        funcao: 'Coordenadora Pedagógica',
        bio: 'Mestre em Educação com 10 anos de experiência em orientação vocacional.',
        foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
        ordem: 1,
        ativo: true,
      },
      {
        nome: 'Lucas Mendes',
        funcao: 'Desenvolvedor Full Stack',
        bio: 'Responsável pela arquitetura e manutenção da plataforma.',
        foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        ordem: 2,
        ativo: true,
      },
      {
        nome: 'Beatriz Lima',
        funcao: 'Curadora de Conteúdo',
        bio: 'Especialista em produção de simulados e materiais didáticos.',
        foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
        ordem: 3,
        ativo: true,
      },
    ],
  });

  // 4. Notícias
  await prisma.noticia.createMany({
    data: [
      {
        titulo: 'Inscrições abertas para o ENEM e principais vestibulares',
        resumo: 'Confira o cronograma oficial, prazos de isenção e documentos necessários.',
        conteudo_completo:
          'Os candidatos já podem realizar suas inscrições através da página oficial do participante. Fique atento ao prazo para solicitação de atendimento especializado e pagamento da taxa.',
        img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
        categoria: 'Vestibular',
        publicada: true,
        destaque: true,
      },
      {
        titulo: 'Mercado de Tecnologia projeta alta demanda por desenvolvedores',
        resumo: 'Áreas de dados, inteligência artificial e segurança da informação lideram contratações.',
        conteudo_completo:
          'Um novo levantamento aponta que empresas de médio e grande porte buscam profissionais com conhecimentos em cloud computing e desenvolvimento web moderno.',
        img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
        categoria: 'Mercado de Trabalho',
        publicada: true,
        destaque: false,
      },
    ],
  });

  // 5. Carreiras
  await prisma.carreiras.createMany({
    data: [
      {
        nome: 'Engenharia de Software',
        descricao:
          'Área focada na concepção, desenvolvimento, testes e manutenção de sistemas e aplicações.',
        cursos_relacionados: [
          'Ciência da Computação',
          'Engenharia de Software',
          'Análise e Desenvolvimento de Sistemas',
        ],
        profissoes: [
          'Desenvolvedor Full Stack',
          'Arquiteto de Software',
          'Engenheiro de DevOps',
        ],
        habilidades: [
          'Lógica de Programação',
          'Banco de Dados',
          'Trabalho em Equipe',
          'Resolução de Problemas',
        ],
        img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
        salario_medio: 'R$ 6.500,00 - R$ 14.000,00',
        area: 'Tecnologia e Exatas',
      },
      {
        nome: 'Biomedicina',
        descricao:
          'Atua na pesquisa de doenças humanas, análises clínicas, diagnóstico por imagem e biotecnologia.',
        cursos_relacionados: [
          'Biomedicina',
          'Ciências Biológicas',
          'Farmácia',
        ],
        profissoes: [
          'Biomédico Esteta',
          'Pesquisador Clínico',
          'Analista Laboratorial',
        ],
        habilidades: [
          'Atenção aos Detalhes',
          'Análise Laboratorial',
          'Ética Profissional',
        ],
        img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800',
        salario_medio: 'R$ 3.800,00 - R$ 8.500,00',
        area: 'Saúde e Biológicas',
      },
    ],
  });

  // 6. Dicas
  await prisma.dica.createMany({
    data: [
      {
        titulo: 'Como aplicar a Técnica Pomodoro nos estudos',
        descricao: 'Aumente seu foco dividindo o tempo em blocos de 25 minutos.',
        conteudo:
          'Escolha uma tarefa, ajuste um cronômetro para 25 minutos e estude sem interrupções. Ao final, faça uma pausa de 5 minutos. A cada 4 ciclos, descanse de 15 a 30 minutos.',
        categoria: 'Produtividade',
        img: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800',
        urlFonte: 'https://exemplo.com/pomodoro',
        destaque: true,
      },
      {
        titulo: '5 passos para montar seu primeiro currículo sem experiência',
        descricao: 'Destaque projetos acadêmicos, cursos livres e habilidades comportamentais.',
        conteudo:
          'Mesmo sem experiência formal, você pode valorizar trabalhos voluntários, participação em feiras de ciências, domínio de ferramentas e idiomas.',
        categoria: 'Carreira',
        img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800',
        destaque: false,
      },
    ],
  });

  // 7. Estágios
  await prisma.estagio.createMany({
    data: [
      {
        titulo: 'Estágio em Desenvolvimento Web Front-end',
        empresa: 'TechNova Soluções',
        descricao: 'Auxiliar na criação de interfaces responsivas com React e consumo de APIs REST.',
        requisitos: 'Cursando Ensino Técnico ou Superior em TI; noções de HTML, CSS e JavaScript.',
        cursos: [
          'Informática',
          'Análise e Desenvolvimento de Sistemas',
          'Ciência da Computação',
        ],
        modalidade: 'Híbrido',
        bolsa_auxilio: 'R$ 1.400,00 + Vale Transporte',
        carga_horaria: '6h/dia (30h semanais)',
        ativo: true,
      },
      {
        titulo: 'Estágio Administrativo e Financeiro',
        empresa: 'Grupo Horizonte',
        descricao: 'Apoio no controle de planilhas, emissão de notas e organização de documentos.',
        requisitos: 'Cursando Administração, Contabilidade ou Economia; pacote Office intermediário.',
        cursos: ['Administração', 'Ciências Contábeis'],
        modalidade: 'Presencial',
        bolsa_auxilio: 'R$ 1.200,00 + Vale Refeição',
        carga_horaria: '6h/dia (30h semanais)',
        ativo: true,
      },
    ],
  });

  // 8. Vídeos
  await prisma.video.createMany({
    data: [
      {
        titulo: 'Revisão Geral de Matemática Básica para Vestibulares',
        descricao: 'Porcentagem, regra de três, razão e proporção resolvidos passo a passo.',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        plataforma: 'YouTube',
        thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
        disciplina: 'Matemática',
        duracao: '32:15',
        ordem: 1,
        publicado: true,
      },
      {
        titulo: 'Estrutura da Redação Dissertativo-Argumentativa',
        descricao: 'Como construir introdução, desenvolvimento e proposta de intervenção nota 1000.',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        plataforma: 'YouTube',
        thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800',
        disciplina: 'Redação',
        duracao: '24:40',
        ordem: 2,
        publicado: true,
      },
    ],
  });

  // 9. Simulado + Questões (Nested Write)
  const simulado = await prisma.simulado.create({
    data: {
      titulo: 'Simulado Preparatório - Conhecimentos Gerais',
      descricao: 'Avaliação diagnóstica abrangendo Matemática, Ciências e Atualidades.',
      disciplina: 'Multidisciplinar',
      tempo: 30,
      quantidade_questoes: 3,
      publicado: true,
      questoes: {
        create: [
          {
            enunciado: 'Qual é o valor de 25% de 320?',
            alternativas: ['60', '75', '80', '85', '90'],
            respostaCorreta: 2,
            explicacao: '25% equivale a 1/4. Dividindo 320 por 4, obtemos 80.',
            ordem: 1,
          },
          {
            enunciado: 'Qual organela celular é responsável pela respiração celular e produção de ATP?',
            alternativas: [
              'Ribossomo',
              'Mitocôndria',
              'Complexo de Golgi',
              'Lisossomo',
              'Retículo Endoplasmático',
            ],
            respostaCorreta: 1,
            explicacao: 'A mitocôndria realiza a respiração celular aeróbica, gerando energia (ATP) para a célula.',
            ordem: 2,
          },
          {
            enunciado: 'Em qual protocolo de rede se baseia a comunicação padrão da World Wide Web?',
            alternativas: ['FTP', 'SMTP', 'HTTP/HTTPS', 'SSH', 'POP3'],
            respostaCorreta: 2,
            explicacao: 'HTTP (e sua versão segura HTTPS) é o protocolo de transferência de hipertexto usado na web.',
            ordem: 3,
          },
        ],
      },
    },
  });

  // 10. Resposta de Simulado
  await prisma.respostaSimulado.create({
    data: {
      nome_aluno: 'João Pedro Silva',
      simuladoId: simulado.id,
      acertos: 2,
      total_questoes: 3,
      percentual: 66.67,
      tempo_gasto: 420,
    },
  });

  console.log('✅ Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
