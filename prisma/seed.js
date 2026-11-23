import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

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
      nome: 'Murilo Milan',
      email: 'murilo@portal.edu.br',
      senha: senhaHash,
      ativo: true,
    },
    data: {
      nome: 'Lívia Oliveira',
      email: 'livia@portal.edu.br',
      senha: senhaHash,
      ativo: true,
    },
  });

   // 2. Sobre Nós
  await prisma.sobreNos.create({
    data: {
      nomeProjeto: 'BioVerse',
      descricao:
        'Portal educacional dedicado ao ensino de Biologia, reunindo notícias científicas, conteúdos de estudo, dicas, informações sobre carreiras e oportunidades de estágio relacionadas à área.',
      objetivo:
        'Facilitar o acesso dos estudantes ao conhecimento biológico e científico, incentivar a aprendizagem, aproximar os conteúdos da realidade e apresentar possibilidades de formação e atuação profissional.',
      membros: ['Beatriz Miotto', 'Bianca Luisa', 'Daniel Casalli', 'Gustavo Victor', 'Livia Oliveira', 'Murilo Milan', 'Yasmin Crisostomo'],
      contatos: ['contato@bioverse.edu.br', '@bioverse_edu'],
    },
  });

  // 3. Membros da Equipe
  await prisma.membroEquipe.createMany({
    data: [
      {
    nome: 'Daniel Casalli',
    funcao: 'Desenvolvedor',
    bio: 'Estudante de Desenvolvimento de Sistemas, participa da construção e implementação das funcionalidades do BioVerse.',
    foto: 'https://avatars.githubusercontent.com/u/197295431?v=4',
    ordem: 1,
    ativo: true,
},
{
    nome: 'Bianca Teodoro',
    funcao: 'Product Owner (PO)',
    bio: 'Responsável pela organização do projeto, definição de prioridades e acompanhamento das atividades da equipe.',
    foto: 'https://avatars.githubusercontent.com/u/201223146?s=130&v=4',
    ordem: 2,
    ativo: true,
},
{
    nome: 'Gustavo Victor',
    funcao: 'Desenvolvedor',
    bio: 'Atua no desenvolvimento do sistema, colaborando na implementação de recursos e soluções para o BioVerse.',
    foto: 'https://avatars.githubusercontent.com/u/196837781?s=130&v=4',
    ordem: 3,
    ativo: true,
},
{
    nome: 'Yasmin Crisostomo',
    funcao: 'Desenvolvedora',
    bio: 'Contribui para a criação e evolução da plataforma, participando do desenvolvimento das funcionalidades do projeto.',
    foto: 'https://lh3.googleusercontent.com/a-/ALV-UjX1az4Ii6JAhwQqJ_XLtcMt_6sE7c7BsCYS95Qx0zDMnlY5qb1t=s240-p-k-rw-no',
    ordem: 4,
    ativo: true,
},
{
    nome: 'Beatriz Miotto',
    funcao: 'Desenvolvedora Full Stack',
    bio: 'Atua no desenvolvimento do front-end e back-end, trabalhando na construção das interfaces, funcionalidades e integração do sistema.',
    foto: 'https://avatars.githubusercontent.com/u/197295679?v=4',
    ordem: 5,
    ativo: true,
},
{
    nome: 'Livia Oliveira',
    funcao: 'Product Owner (PO)',
    bio: 'Responsável por alinhar as necessidades do projeto, organizar as demandas e acompanhar o desenvolvimento das entregas.',
    foto: 'https://avatars.githubusercontent.com/u/202319744?v=4',
    ordem: 6,
    ativo: true,
},
{
    nome: 'Murilo Milan',
    funcao: 'Desenvolvedor',
    bio: 'Participa da implementação das funcionalidades do BioVerse, contribuindo para o desenvolvimento e aprimoramento da plataforma.',
    foto: 'https://avatars.githubusercontent.com/u/197281503?v=4',
    ordem: 7,
    ativo: true,
},
    ],
  });

   // 4. Notícias
  await prisma.noticia.createMany({
    data: [
      {
        titulo: 'Pesquisadores descobrem nova espécie de inseto aquático na Mata Atlântica',
        resumo:
          'Uma nova espécie de inseto aquático, chamada Massartella aurora, foi identificada no Parque Estadual da Serra do Brigadeiro, em Minas Gerais. A descoberta demonstra que ainda existem espécies desconhecidas pela ciência mesmo em regiões já estudadas.',
        conteudo_completo:
          'Pesquisadores da Universidade Federal de Viçosa (UFV), em colaboração com uma instituição científica alemã e com apoio do Instituto Estadual de Florestas (IEF), identificaram uma nova espécie de inseto aquático na Mata Atlântica, em Minas Gerais.\n\nA espécie recebeu o nome científico de Massartella aurora e pertence à ordem Ephemeroptera, grupo de insetos popularmente conhecidos como efêmeras. Esses animais possuem uma fase jovem que se desenvolve na água, principalmente em ambientes como riachos e rios.\n\nPara confirmar a descoberta, os cientistas analisaram exemplares jovens, adultos e ovos. Também utilizaram microscopia e microtomografia de raios X, tecnologia que permite observar estruturas internas e produzir modelos tridimensionais.\n\nA descoberta é importante porque as efêmeras são consideradas organismos sensíveis à poluição e às alterações ambientais. Por isso, sua presença pode fornecer informações sobre a qualidade dos ambientes aquáticos.\n\nAlém de aumentar o conhecimento sobre a biodiversidade brasileira, o estudo demonstra a importância da preservação das unidades de conservação e do investimento em pesquisas científicas.',
        img: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=800',
        data: new Date('2026-11-14T12:00:00.000Z'),
        categoria: 'Zoologia e Entomologia',
        publicada: true,
        destaque: true,
      },
      {
        titulo: 'Pau-brasil passa a ser considerado criticamente em perigo de extinção',
        resumo:
          'A atualização da lista nacional de espécies da flora ameaçadas de extinção classificou o pau-brasil como criticamente em perigo. A relação reúne 3.730 espécies de plantas brasileiras ameaçadas.',
        conteudo_completo:
          'O Ministério do Meio Ambiente e Mudança do Clima atualizou, em outubro de 2026, a Lista Nacional Oficial das Espécies da Flora Ameaçadas de Extinção. A nova relação reúne 3.730 espécies e representa um importante instrumento para orientar políticas de conservação da vegetação brasileira.\n\nUm dos principais destaques é o pau-brasil (Paubrasilia echinata), árvore nativa da Mata Atlântica que passou da categoria Em Perigo para Criticamente em Perigo.\n\nEssa classificação indica um risco extremamente elevado de extinção na natureza. Historicamente, a espécie sofreu com a exploração de sua madeira, a destruição de habitats e a redução das áreas de vegetação nativa.\n\nA atualização também apresenta outras espécies ameaçadas, como determinadas plantas carnívoras e espécies de sempre-vivas.\n\nÉ importante entender que uma lista de espécies ameaçadas não serve apenas para registrar quais organismos estão em risco. Ela também ajuda pesquisadores e órgãos ambientais a definir prioridades de conservação, desenvolver projetos de recuperação e orientar medidas de proteção.\n\nO levantamento contou com a participação de 507 pesquisadores, demonstrando como o trabalho científico coletivo é fundamental para conhecer e proteger a biodiversidade.',
        img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
        data: new Date('2026-10-29T12:00:00.000Z'),
        categoria: 'Botânica e Conservação',
        publicada: true,
        destaque: true,
      },
      {
        titulo: 'Expedição científica revela uma biodiversidade pouco conhecida no topo da Amazônia',
        resumo:
          'Uma expedição realizada na Serra do Aracá, no Amazonas, reuniu pesquisadores de diferentes especialidades para estudar animais, plantas e fungos de uma região de difícil acesso.',
        conteudo_completo:
          'Uma equipe internacional formada por 16 pesquisadores realizou uma expedição científica na Serra do Aracá, no norte do Amazonas, com o objetivo de estudar a biodiversidade dos ecossistemas de altitude.\n\nDurante aproximadamente 19 dias de atividades, os cientistas investigaram diferentes grupos de organismos, incluindo répteis, anfíbios, aves, mamíferos, insetos, plantas e fungos.\n\nEntre os resultados apresentados estão registros de cinco espécies de cobras, aproximadamente 18 espécies de anfíbios e milhares de insetos. Algumas das espécies observadas podem representar novidades científicas, mas precisam passar por estudos adicionais para confirmação.\n\nA expedição também coletou amostras de plantas, fungos, água, solo e material biológico para análises genéticas e ambientais.\n\nUm dos métodos utilizados foi a análise de DNA ambiental, conhecida como eDNA. Essa técnica permite identificar a presença de organismos a partir de vestígios genéticos encontrados em amostras do ambiente, como água e solo.\n\nO estudo demonstra como a combinação de diferentes áreas da Biologia é importante para compreender os ecossistemas. Também reforça que regiões pouco exploradas podem guardar informações essenciais para a conservação da biodiversidade amazônica.',
        img: 'https://images.unsplash.com/photo-1518182170546-07661fd941c0?w=800',
        data: new Date('2026-11-12T12:00:00.000Z'),
        categoria: 'Biodiversidade e Pesquisa',
        publicada: true,
        destaque: true,
      },
      {
        titulo: 'Tambaqui é classificado como vulnerável e pesquisadores alertam para redução populacional',
        resumo:
          'O tambaqui, um dos peixes mais conhecidos da Amazônia, passou a ser classificado como vulnerável. A classificação indica preocupação com a redução de suas populações naturais.',
        conteudo_completo:
          'O tambaqui (Colossoma macropomum) é um peixe de água doce muito importante para os ecossistemas amazônicos e para a alimentação de diversas populações da região.\n\nEm setembro de 2026, o Instituto Nacional de Pesquisas da Amazônia divulgou informações sobre sua classificação como espécie vulnerável, com base em avaliações do Instituto Chico Mendes de Conservação da Biodiversidade.\n\nSegundo pesquisadores, essa classificação não significa que o peixe esteja imediatamente próximo da extinção, mas indica que sua população apresenta sinais preocupantes de redução e sofre pressões ambientais.\n\nEntre os fatores que podem afetar espécies exploradas pela pesca estão a captura excessiva, alterações nos ambientes aquáticos e mudanças nas condições naturais dos rios.\n\nO acompanhamento das populações de peixes é essencial para compreender o funcionamento dos ecossistemas e desenvolver medidas de conservação.\n\nEsse caso também mostra como a Biologia contribui diretamente para a sociedade, oferecendo informações científicas que ajudam a orientar a pesca sustentável e a proteção dos recursos naturais.',
        img: 'https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?w=800',
        data: new Date('2026-09-24T12:00:00.000Z'),
        categoria: 'Ictiologia e Conservação',
        publicada: true,
        destaque: false,
      },
    ],
  });


  // 5. Carreiras
  await prisma.carreiras.createMany({
    data: [
      {
        nome: 'Biólogo especializado em Conservação da Biodiversidade',
        descricao:
          'O biólogo especializado em conservação da biodiversidade trabalha para compreender, proteger e recuperar os ecossistemas naturais. Seu trabalho envolve estudar animais, plantas, fungos e outros organismos, identificando os fatores que ameaçam sua sobrevivência.\n\nEsse profissional pode participar de projetos de recuperação de áreas degradadas, monitoramento de espécies ameaçadas, criação de estratégias de preservação e avaliação dos impactos causados pelas atividades humanas.\n\nNo dia a dia, realiza pesquisas em ambientes naturais, identifica espécies, acompanha populações ameaçadas, coleta dados ambientais, participa de projetos de recuperação, produz relatórios e desenvolve estratégias para reduzir impactos ambientais.\n\nPode trabalhar em institutos de pesquisa, unidades de conservação, organizações ambientais, consultorias ambientais, universidades e órgãos públicos ambientais.',
        cursos_relacionados: [
          'Ciências Biológicas',
          'Ecologia',
          'Gestão Ambiental',
          'Ciências Ambientais',
        ],
        profissoes: [
          'Biólogo conservacionista',
          'Ecólogo',
          'Analista de biodiversidade',
          'Consultor ambiental',
          'Pesquisador em conservação',
        ],
        habilidades: [
          'Conhecimento de ecologia e zoologia',
          'Identificação de espécies',
          'Capacidade de observação',
          'Interpretação de dados científicos',
          'Trabalho em Equipe',
          'Conhecimento sobre legislação ambiental',
        ],
        img: 'https://images.openai.com/static-rsc-4/afCG8ALx-neh1jJtVOjxGuKYznpIQnuIXAt1RfdaujMfmw2FwoVQY2vcW6iHCO0XD6B3BpIOZdvnfVSk1eoblYefFB59fO69c68bLvsP6CFKHxHAQe2pXUQI6IGJJcKop5EYC8JVonfoJTO3JRyr5Xr5_JZQ96gdSW3qdwiuCXs?purpose=inline',
        salario_medio:
          'Não existe um valor único confiável. Depende do cargo, região, experiência e instituição contratante.',
        area: 'Meio Ambiente e Biodiversidade',
      },
      {
        nome: 'Geneticista',
        descricao:
          'O geneticista é o profissional que estuda os genes, o DNA, os cromossomos e os mecanismos responsáveis pela transmissão das características hereditárias dos organismos.\n\nNa pesquisa científica, pode investigar alterações genéticas relacionadas a doenças, estudar a evolução de espécies e desenvolver técnicas para identificar características presentes no material genético.\n\nNo dia a dia, estuda e analisa sequências de DNA, investiga genes e mutações, participa de pesquisas sobre doenças hereditárias, realiza experimentos laboratoriais, utiliza equipamentos de análise molecular, interpreta resultados e desenvolve estudos sobre hereditariedade e evolução.\n\nPode trabalhar em laboratórios de pesquisa, universidades, institutos de biotecnologia, centros de pesquisa genética, empresas farmacêuticas e instituições de pesquisa em saúde.',
        cursos_relacionados: [
          'Ciências Biológicas',
          'Biotecnologia',
          'Biomedicina',
          'Genética',
          'Ciências da Saúde',
        ],
        profissoes: [
          'Pesquisador em genética',
          'Geneticista',
          'Pesquisador em biologia molecular',
          'Especialista em genômica',
          'Pesquisador em biotecnologia',
        ],
        habilidades: [
          'Conhecimento aprofundado em genética',
          'Biologia molecular',
          'Bioquímica',
          'Interpretação de dados',
          'Raciocínio lógico',
          'Precisão em atividades laboratoriais',
        ],
        img: 'https://images.openai.com/static-rsc-4/pWV_wHtVx_MCKQN2SqY2bcIQEcZoMJZXYZ4Bzj4T6dyoZK679jvqtG9t8eM-bIN9n5dVua44r6-dwDCawkk_mr0ajiF5vJcYvwIWXW3LVGh7Fdz8E-bBCT6ijShfoDu-h_s7V5N9OlD6GpRkI7JVD7xY9tQO4LER7yCYEBtiFfI?purpose=inline',
        salario_medio:
          'Varia conforme a função, formação, especialização e experiência profissional.',
        area: 'Saúde e Biotecnologia',
      },
      {
        nome: 'Microbiologista',
        descricao:
          'O microbiologista estuda organismos microscópicos, como bactérias, fungos, protozoários e outros microrganismos encontrados na água, no solo, no ar e no corpo humano.\n\nEsse profissional procura compreender como esses organismos vivem, se reproduzem, interagem com outros seres e influenciam o ambiente.\n\nNo dia a dia, cultiva e identifica microrganismos, analisa amostras biológicas e ambientais, estuda bactérias e fungos, investiga microrganismos causadores de doenças, desenvolve pesquisas sobre resistência microbiana, realiza experimentos laboratoriais e participa de processos de controle de qualidade.\n\nPode trabalhar em laboratórios de pesquisa, hospitais e instituições de saúde, conforme habilitação, indústrias alimentícias, empresas farmacêuticas, universidades e instituições de pesquisa ambiental.',
        cursos_relacionados: [
          'Ciências Biológicas',
          'Biomedicina',
          'Biotecnologia',
          'Microbiologia',
          'Farmácia',
        ],
        profissoes: [
          'Pesquisador em microbiologia',
          'Microbiologista ambiental',
          'Analista microbiológico',
          'Pesquisador em bacteriologia',
          'Pesquisador em micologia',
        ],
        habilidades: [
          'Conhecimento de microbiologia',
          'Técnicas de cultivo e identificação',
          'Biossegurança',
          'Atenção aos detalhes',
          'Organização laboratorial',
          'Interpretação de resultados científicos',
        ],
        img: 'https://images.openai.com/static-rsc-4/s158Wug_W-rQJgmUyyMCrAFkMnhkmioMbHVielzJJSR9kGoTrkd4uZY5eIqzMG5xkq1-PZunfoXAFG2eRS22W0fLnKPhuuPZMJXZjVPiqP6RYIno2gl-cRB1jujU6_sXi7TcEBclL4bETaPkO8yJKw_djQhCAd8uaFI3lOgs45M?purpose=inline',
        salario_medio:
          'Depende da função, da instituição e da experiência profissional.',
        area: 'Saúde e Pesquisa Científica',
      },
      {
        nome: 'Biólogo Marinho',
        descricao:
          'O biólogo marinho estuda os organismos que vivem nos ambientes aquáticos, principalmente nos mares e oceanos. Sua atuação envolve compreender os ecossistemas marinhos, as relações entre as espécies e os impactos provocados pelas atividades humanas.\n\nEsse profissional pode estudar corais, peixes, tartarugas, mamíferos marinhos, algas e diversos organismos microscópicos, com especial atenção à conservação dos oceanos e problemas como poluição plástica, pesca excessiva, mudanças climáticas e destruição de habitats.\n\nNo dia a dia, pesquisa organismos marinhos, monitora recifes de corais, estuda populações de peixes e tartarugas, analisa a qualidade da água, participa de projetos de conservação, realiza pesquisas de campo e avalia impactos ambientais.\n\nPode trabalhar em aquários e instituições científicas, universidades, organizações de conservação marinha, institutos de pesquisa, consultorias ambientais e órgãos de proteção ambiental.',
        cursos_relacionados: [
          'Ciências Biológicas',
          'Biologia Marinha',
          'Oceanografia',
          'Ecologia',
          'Ciências do Mar',
        ],
        profissoes: [
          'Pesquisador marinho',
          'Ecólogo marinho',
          'Analista de conservação marinha',
          'Pesquisador em oceanografia biológica',
          'Consultor ambiental',
        ],
        habilidades: [
          'Conhecimento de zoologia e ecologia',
          'Identificação de espécies marinhas',
          'Capacidade de observação',
          'Conhecimento de estatística',
          'Trabalho de campo',
          'Conhecimento de ambientes aquáticos',
        ],
        img: 'https://images.openai.com/static-rsc-4/mMknVcHkYtUgWf9QqswTAWcgm9-w-_ljpnZU7yEzHJeN7Kl9pEcthRTw8406ZJ-qFBvnok5ez9C-svQQWBCrXGeLYQFZAubpsY-rvTfWkWQDWJ4PfJX-fX9NF-uPOxo_MekshnE5qrBT0COYNrjo44ip2Wyxr95oCK5E5e8-4O4?purpose=inline',
        salario_medio:
          'Varia conforme a especialização, o cargo e o local de trabalho.',
        area: 'Meio Ambiente e Biodiversidade',
      },
      {
        nome: 'Micologista',
        descricao:
          'O micologista é o profissional especializado no estudo dos fungos, organismos fundamentais para o equilíbrio dos ecossistemas. Os fungos atuam na decomposição da matéria orgânica, participam da reciclagem de nutrientes e estabelecem relações ecológicas com plantas e outros organismos.\n\nTambém possuem grande importância econômica e científica, sendo utilizados na produção de alimentos, medicamentos, enzimas e diversos produtos biotecnológicos.\n\nNo dia a dia, identifica e classifica espécies de fungos, coleta amostras em ambientes naturais, analisa estruturas microscópicas, investiga fungos associados a doenças, pesquisa aplicações industriais e farmacêuticas e participa de projetos de conservação da diversidade fúngica.\n\nPode trabalhar em universidades, herbários e coleções científicas, laboratórios, indústrias alimentícias, institutos de pesquisa e empresas de biotecnologia.',
        cursos_relacionados: [
          'Ciências Biológicas',
          'Biotecnologia',
          'Microbiologia',
          'Biologia Molecular',
          'Ciências Ambientais',
        ],
        profissoes: [
          'Pesquisador em micologia',
          'Micologista',
          'Pesquisador em microbiologia',
          'Especialista em biotecnologia de fungos',
          'Pesquisador em fitopatologia',
        ],
        habilidades: [
          'Conhecimento de microbiologia',
          'Identificação de fungos',
          'Técnicas de microscopia',
          'Trabalho laboratorial',
          'Pesquisa científica',
          'Conhecimento de ecologia',
        ],
        img: 'https://images.openai.com/static-rsc-4/xR--edmZ-d2XfUqeBg5n7OZ9slfTVYc5KsGTyd4zHQn9r4NSCrfvS2gy0w2JdHRYle6cdFDPTTXpLNgO8HnAnUcMza8OHJazVsC7dAgwpUqdgm7fCs60NYGeS3LeXnqE8I6H5Sj6vIkhU5wsDqNxFRqEckJBtBlRfAEa2riXtXo?purpose=inline',
        salario_medio:
          'Não existe uma média única; depende da atividade profissional e da instituição.',
        area: 'Biotecnologia e Produção Industrial; Meio Ambiente e Biodiversidade',
      },
      {
        nome: 'Professor e Pesquisador em Biologia',
        descricao:
          'O professor e pesquisador em Biologia trabalha com a produção e a transmissão do conhecimento científico. Pode atuar no ensino de conteúdos relacionados à vida, aos organismos, à evolução, à genética, à ecologia e ao funcionamento dos ecossistemas.\n\nNa área acadêmica, desenvolve pesquisas, orienta estudantes, publica artigos científicos e participa de projetos de investigação em diferentes especialidades biológicas.\n\nNo dia a dia, prepara aulas e atividades práticas, ensina conceitos de Biologia, desenvolve experimentos educacionais, orienta trabalhos científicos, realiza pesquisas acadêmicas, publica artigos e participa de eventos e projetos educacionais.\n\nPode trabalhar em escolas, universidades, institutos de pesquisa, museus de Ciências, centros de educação ambiental e instituições científicas.',
        cursos_relacionados: [
          'Ciências Biológicas - Licenciatura',
          'Ciências Biológicas - Bacharelado',
          'Educação',
          'Pós-graduação em áreas específicas da Biologia',
        ],
        profissoes: [
          'Professor de Biologia',
          'Pesquisador científico',
          'Professor universitário',
          'Divulgador científico',
          'Orientador de projetos científicos',
        ],
        habilidades: [
          'Comunicação',
          'Didática',
          'Conhecimento científico',
          'Escrita acadêmica',
          'Pensamento crítico',
          'Organização e planejamento',
        ],
        img: 'https://images.openai.com/static-rsc-4/VUgZNgYK5NvAbnHPzOOoA4tWlFGHFJ7SgxcfsNe1c5JyJ63fpGK2Lox7zkuqUSjQnhoDRQAAOzcvRuPAXkOzD8w5sy6JymntlfjP9MavnVm5S_qshYvGe2Ac7Mt1W2y62_2HyCRHnmYsc98kvcnbv8cyyreCscb_1QHULxk1-26F7BHxfKdfr-ccg0eSbjUK?purpose=inline',
        salario_medio:
          'Depende da rede de ensino, nível de formação, carga horária e instituição contratante.',
        area: 'Educação',
      },
    ],
  });

  // 6. Dicas
  await prisma.dica.createMany({
    data: [
      {
        titulo: 'Como aprender Biologia de verdade: técnicas para entender e memorizar os conteúdos',
        descricao:
          'Aprenda a estudar Biologia utilizando métodos que ajudam a compreender os processos naturais, relacionar conceitos e melhorar o desempenho nas provas.',
        conteudo:
          'A Biologia é uma ciência que estuda a vida em diferentes níveis, desde as estruturas microscópicas das células até os grandes ecossistemas do planeta. Por possuir muitos conceitos, nomes científicos e processos, pode parecer uma matéria difícil para alguns estudantes.\n\nEntretanto, estudar Biologia não significa apenas decorar informações. O mais importante é compreender como os fenômenos acontecem e como eles se relacionam.\n\n1. Utilize mapas mentais\n\nOs mapas mentais ajudam a organizar informações e relacionar diferentes assuntos. Por exemplo, ao estudar genética, você pode colocar o termo DNA no centro e criar ramificações para genes, cromossomos, hereditariedade e mutações.\n\n2. Faça desenhos e esquemas\n\nDesenhar estruturas biológicas ajuda a visualizar conteúdos que seriam difíceis de compreender apenas lendo. Experimente desenhar uma célula e identificar suas organelas, como núcleo, mitocôndrias, ribossomos e complexo golgiense.\n\n3. Relacione os conteúdos com situações reais\n\nAo estudar ecologia, procure identificar exemplos na natureza. Observe como os animais se alimentam, como as plantas interagem com o ambiente e como a poluição pode alterar um ecossistema.\n\n4. Resolva exercícios\n\nOs exercícios ajudam a identificar quais assuntos você realmente compreendeu e quais precisam de mais atenção.\n\n5. Explique o conteúdo com suas próprias palavras\n\nImagine que você está ensinando o assunto para outra pessoa. Se conseguir explicar sem depender do material, provavelmente compreendeu os principais conceitos.\n\nDica extra: Separe um tempo para revisar os conteúdos estudados durante a semana. Revisões frequentes ajudam a manter as informações na memória.',
        categoria: 'Estudos',
        img: 'https://images.openai.com/static-rsc-4/Z1BeLxH7gSPpSR34BKv3LHyPdpzcInLMyvyuLoDjJ4F7-jzm8dalQBP2OJqdEYIs1gABhI3N4yOQCdIoyRpamxcDGnNyRjmv2KALX6eph0XVsA5YssPY-40lxa76fkJJ6RvDxm-0iRcfFLcAH3c7zoqwr6iTkzSfAte7fOi2sUo?purpose=inline',
        urlFonte: 'https://aprovatotal.com.br/resumo-biologia-celular-enem/?utm_source=chatgpt.com',
        destaque: false,
      },
      {
        titulo: 'Guia básico: como utilizar um microscópio óptico no laboratório de Biologia',
        descricao:
          'Conheça as principais partes do microscópio, entenda como funciona o aumento das imagens e aprenda os cuidados básicos durante sua utilização.',
        conteudo:
          'O microscópio óptico é um dos equipamentos mais importantes para o estudo da Biologia. Ele permite observar estruturas que não podem ser visualizadas a olho nu, como células, tecidos e determinados microrganismos. Seu funcionamento utiliza lentes que ampliam a imagem de uma amostra iluminada.\n\nConhecendo as principais partes:\n- Ocular: lente pela qual observamos a amostra.\n- Objetivas: lentes responsáveis por diferentes níveis de ampliação.\n- Revólver: estrutura que permite alternar as objetivas.\n- Platina: superfície onde colocamos a lâmina.\n- Condensador: concentra a luz sobre a amostra.\n- Diafragma: controla a quantidade de luz.\n- Parafuso macrométrico: realiza ajustes maiores de foco.\n- Parafuso micrométrico: permite ajustes finos da imagem.\n\nComo utilizar:\n1. Coloque o microscópio sobre uma superfície estável.\n2. Verifique se a objetiva de menor aumento está selecionada.\n3. Posicione a lâmina na platina.\n4. Ajuste a iluminação.\n5. Observe pela ocular e faça o ajuste inicial de foco.\n6. Utilize o ajuste fino para melhorar a nitidez.\n7. Se necessário, aumente a ampliação gradualmente.\n\nComo calcular o aumento total?\nO aumento total é obtido multiplicando o aumento da ocular pelo aumento da objetiva. Por exemplo: ocular de 10x multiplicada por objetiva de 40x resulta em aumento total de 400x.\n\nCuidados importantes:\n- Transporte o microscópio segurando pela base e pelo braço.\n- Não toque nas lentes com os dedos.\n- Utilize papel próprio para limpeza de lentes.\n- Não force os mecanismos de ajuste.\n- Ao terminar, deixe a menor objetiva selecionada e guarde o equipamento conforme as orientações do laboratório.\n\nPor que isso é importante?\nO microscópio possibilitou grandes avanços na Biologia, permitindo compreender a organização celular, identificar microrganismos e investigar estruturas fundamentais para a vida.',
        categoria: 'Laboratório',
        img: 'https://images.openai.com/static-rsc-4/vl9a9XXYH9CN-x7LO2YNVDlsMdhuoyhaJGH1GNYeZgMWeHyevkgXVb67O3yd2IOvkLjUFFBFsU_J8P-Qt1lFbG71D76mDdL2N_n1Vv9qC_FakZtgeDhD6iC-nbQyjpxjVChh3YImrT5HiiVP8XsTNs0RKxJh0ghiMtQ8tRi7av01d5a3OTiJ2-LNc71a8WSb?purpose=inline',
        destaque: false,
      },
      {
        titulo: 'Guia de identificação de espécies: como reconhecer animais e plantas',
        descricao:
          'Aprenda a observar características dos organismos e utilizar informações científicas para identificar espécies encontradas em ambientes naturais.',
        conteudo:
          'A identificação de espécies é uma atividade importante para pesquisadores, estudantes e profissionais que trabalham com biodiversidade. Ela permite conhecer quais organismos vivem em determinada região, compreender suas características e estudar as relações entre diferentes seres vivos.\n\n1. Observe as características físicas\n\nEm plantas, observe o formato e a disposição das folhas, características do caule, presença de flores e frutos, textura e aparência da superfície e formato das raízes, quando visíveis.\n\nNos animais, observe tamanho e formato do corpo, coloração e padrões, tipo de revestimento corporal, quantidade e formato dos membros e comportamentos e hábitos.\n\n2. Registre o ambiente\n\nO local onde o organismo foi encontrado pode fornecer informações importantes. Uma planta encontrada em uma região úmida pode apresentar adaptações diferentes de outra que vive em ambientes secos.\n\n3. Utilize ferramentas de identificação\n\nExistem plataformas que ajudam a reconhecer organismos por meio de fotografias e informações científicas:\n- iNaturalist: registro e identificação colaborativa de espécies.\n- Flora e Funga do Brasil: consulta de informações sobre plantas, algas e fungos.\n- SpeciesLink: consulta a dados de coleções biológicas.\n\n4. Não confie apenas na aparência\n\nDuas espécies diferentes podem apresentar características muito parecidas. Por isso, a identificação científica pode exigir observação de estruturas específicas, análise genética e avaliação de especialistas.\n\nImportante: Não retire plantas, animais ou outros organismos de ambientes naturais sem autorização. O ideal é fotografar, registrar e respeitar o ambiente.',
        categoria: 'Zoologia e Botânica',
        img: 'https://images.openai.com/static-rsc-4/uSOv2B69USpiC2Al0f61NhOZ9whCr4mLG-ks82Y6CWfpzdwYOLEaFIMjREO3zhibCa9G73H2AzW_4PYgkO5jAQYFOIsLOe_jAxTNesQdD0ab7ZX2hGdXX8Sr0KGMt6a9xw8IwH4zGLOhoE7wHvvtRbuL9RwWjY63nu31Q2cKVAg?purpose=inline',
        urlFonte: 'https://stri.si.edu/story/tipping-point?utm_source=chatgpt.com',
        destaque: true,
      },
      {
        titulo: 'Biossegurança em laboratórios: regras que todo estudante de Biologia deve conhecer',
        descricao:
          'Entenda os cuidados necessários para evitar acidentes, contaminações e exposição a riscos biológicos durante atividades laboratoriais.',
        conteudo:
          'A biossegurança reúne procedimentos e medidas de proteção utilizados para reduzir riscos durante atividades que envolvem materiais biológicos, químicos e equipamentos laboratoriais. Em laboratórios de Biologia, esses cuidados são fundamentais porque algumas atividades envolvem microrganismos, amostras biológicas e substâncias que podem representar riscos à saúde.\n\n1. Utilize equipamentos de proteção individual (EPIs)\n\nOs equipamentos devem ser escolhidos de acordo com os riscos da atividade. Exemplos: jaleco, luvas apropriadas, óculos de proteção, máscaras quando indicadas e calçados fechados.\n\n2. Mantenha a higiene das mãos\n\nLave as mãos antes e depois das atividades laboratoriais, especialmente após manipular materiais biológicos.\n\n3. Nunca consuma alimentos no laboratório\n\nComer ou beber no ambiente laboratorial pode aumentar o risco de contaminação.\n\n4. Identifique corretamente os materiais\n\nAmostras e recipientes devem estar identificados para evitar trocas, erros e acidentes.\n\n5. Faça o descarte adequado\n\nResíduos biológicos, químicos e materiais perfurocortantes precisam ser descartados em recipientes específicos, conforme as normas de segurança.\n\n6. Conheça os equipamentos de emergência\n\nÉ importante saber onde ficam os chuveiros de emergência, lava-olhos, extintores e saídas de emergência.\n\nPor que isso é importante?\nA biossegurança protege estudantes, pesquisadores, profissionais e o ambiente. Também garante que os procedimentos científicos sejam realizados com responsabilidade e segurança.',
        categoria: 'Segurança Laboratorial',
        img: 'https://images.openai.com/static-rsc-4/_GLHH_Ip_0OwcU9EVr5VhOmo_bSTaVRwD6ghyWQHFwJ4t-ddmnIb3Slm-0KZlJPsajSv1-a8eZFF4LknyY7Ztdqu1Uu-oq1VgfBVGp4ITJc_TCGbzIcS_IMYF_IpknZRr0crCcbDSB81BMpRdaH8ish09WmGxMSqo8JRzadUoMR03_Tbb_-KEfUTy1rCVakZ?purpose=inline',
        destaque: true,
      },
      {
        titulo: 'Extração de DNA: entenda como os cientistas conseguem visualizar o material genético',
        descricao:
          'Descubra como funciona a extração de DNA, quais são suas etapas principais e por que essa técnica é tão importante para a Biologia.',
        conteudo:
          'O DNA, ou ácido desoxirribonucleico, é a molécula responsável por armazenar as informações genéticas dos organismos. Ele está presente nas células e contém instruções importantes para o desenvolvimento, funcionamento e reprodução dos seres vivos.\n\nA extração de DNA é uma técnica laboratorial utilizada para separar esse material de outros componentes celulares, permitindo sua análise em diferentes pesquisas.\n\nComo funciona o processo?\n\n1. Ruptura das células\n\nPrimeiro, é necessário romper as membranas celulares para liberar o conteúdo presente no interior das células.\n\n2. Separação dos componentes\n\nSão utilizados reagentes e procedimentos específicos para separar o DNA de proteínas, lipídios e outras estruturas celulares.\n\n3. Precipitação do DNA\n\nEm determinadas técnicas, utiliza-se álcool adequado e condições específicas para fazer o DNA se separar da solução, tornando-se visível como um material esbranquiçado.\n\n4. Coleta e análise\n\nO material obtido pode ser purificado e utilizado em procedimentos científicos, como análise genética, PCR e sequenciamento.\n\nOnde essa técnica é utilizada?\n- Estudos sobre doenças genéticas.\n- Identificação de espécies.\n- Pesquisas sobre evolução.\n- Análise de parentesco biológico.\n- Estudos de biodiversidade.\n- Desenvolvimento de pesquisas biotecnológicas.\n\nCuriosidade: A extração de DNA pode ser demonstrada em atividades educativas utilizando morangos ou outras frutas, pois suas células possuem material genético que pode ser isolado. Entretanto, a visualização do DNA em uma experiência simples não significa que ele já esteja purificado ou pronto para análises genéticas avançadas.',
        categoria: 'Genética e Biologia Molecular',
        img: 'https://images.openai.com/static-rsc-4/y9EEiRWPALgRfJFxPGwfTSd4Fj7F3l8LCwL_URDBWl09AyxzfIs29YPbMhs5BslVutIRIQZ7IU_s7tc-hNeXsSyf_qiUM5_alf4tnqKonkv0epNU-viGP2Fr69mUMr7LtCHzYDEyAK_tXJ8b_JgLb_Nu3FQJFddjT0PGg9uPVi0?purpose=inline',
        urlFonte: 'https://travelask.ru/blog/posts/30989-video-iz-frkutov-izvlekli-dnk-i-poprobovali-na-vkus?utm_source=chatgpt.com',
        destaque: true,
      },
      {
        titulo: 'Do interesse à descoberta: como desenvolver uma pesquisa científica em Biologia',
        descricao:
          'Aprenda as etapas fundamentais para transformar uma curiosidade sobre a natureza em uma investigação científica organizada.',
        conteudo:
          'A pesquisa científica é uma das principais ferramentas utilizadas pela Biologia para produzir novos conhecimentos. Por meio dela, os pesquisadores investigam fenômenos naturais, testam hipóteses e procuram explicações baseadas em evidências.\n\nQualquer estudante pode começar a desenvolver o pensamento científico observando situações do cotidiano e elaborando perguntas.\n\n1. Escolha um tema\n\nComece por algo que desperte sua curiosidade. Exemplos:\n- Como a luminosidade interfere no crescimento das plantas?\n- Qual é a importância dos fungos na decomposição?\n- Como a temperatura influencia a germinação?\n- Quais organismos podem ser encontrados em uma amostra de água?\n\n2. Formule uma pergunta\n\nA pergunta deve ser clara e permitir uma investigação. Exemplo: diferentes condições de luminosidade influenciam o crescimento de uma planta?\n\n3. Pesquise informações confiáveis\n\nConsulte livros, artigos científicos, universidades e instituições de pesquisa.\n\n4. Crie uma hipótese\n\nA hipótese é uma explicação provisória que será investigada. Exemplo: plantas que recebem determinada quantidade de luz podem apresentar diferenças no crescimento.\n\n5. Planeje a metodologia\n\nDefina como os dados serão coletados, quais materiais serão utilizados e quais variáveis precisam ser controladas.\n\n6. Registre os resultados\n\nOrganize os dados em tabelas, gráficos, fotografias e anotações.\n\n7. Analise e apresente as conclusões\n\nCompare os resultados com a hipótese inicial. Uma hipótese pode ser apoiada ou não pelos dados obtidos. Isso faz parte do processo científico.\n\nDica extra: Nunca altere resultados para fazer uma hipótese parecer correta. A honestidade científica é fundamental para a confiabilidade de qualquer pesquisa.',
        categoria: 'Pesquisa e Método Científico',
        img: 'https://images.openai.com/static-rsc-4/X9B2lVpIHUh_ckYNutPd7bZoN7NStVbso7xMBX-4KQAiWp6zbrgIbDdGcuTM6J4HuhvEdCx2LYaiKpAGHWbmUHGdzC490DaLMdaEIb2zibtYbZaLk9M9_0iOTwlWu63duKSY57dgXLRoVQhot_9qLz3vI4YGYR_Zv1nB16TkhV0?purpose=inline',
        urlFonte: 'https://www.uwgb.edu/tiny-earth/?utm_source=chatgpt.com',
        destaque: true,
      },
    ],
  });

 // 7. Estágios
  await prisma.estagio.createMany({
    data: [
      {
        titulo: 'Estágio em Biologia, Ecologia ou Pedagogia',
        empresa: 'Ministério do Meio Ambiente e Mudança do Clima (MMA)',
        descricao: 'Atuação no Departamento de Educação Ambiental e Cidadania, auxiliando na elaboração de materiais didáticos, organização de oficinas, palestras e campanhas ambientais. O estagiário também poderá apoiar projetos de educação e cidadania socioambiental. Oportunidade em Brasília – DF, no setor público.',
        requisitos: 'Estar cursando graduação em Biologia, Ecologia ou Pedagogia a partir do 3º semestre. São desejáveis conhecimentos de educação ambiental, sustentabilidade e ferramentas digitais.',
        cursos: ['Ciências Biológicas', 'Ecologia', 'Pedagogia'],
        modalidade: 'Presencial',
        bolsa_auxilio: 'R$ 1.125,69',
        carga_horaria: '30 horas semanais',
        ativo: true,
      },
      {
        titulo: 'Estágio em Biotecnologia, Farmácia, Biologia e Química',
        empresa: 'Bionovis',
        descricao: 'Atuação nas áreas de Pesquisa e Desenvolvimento (P&D) e Validação, auxiliando atividades técnicas e administrativas, acompanhamento de projetos e processos de qualificação e validação de equipamentos, processos e limpeza. Oportunidade em Valinhos – SP, na indústria farmacêutica.',
        requisitos: 'Ensino superior em andamento em Biotecnologia, Biomedicina, Engenharia Química, Engenharia de Bioprocessos, Farmácia, Biologia, Química ou áreas relacionadas. Conhecimentos de Excel e inglês intermediário.',
        cursos: ['Biotecnologia', 'Biomedicina', 'Biologia', 'Farmácia', 'Química', 'Engenharia Química', 'Engenharia de Bioprocessos'],
        modalidade: 'Presencial',
        bolsa_auxilio: 'Valor não divulgado na publicação consultada; a oportunidade informa que a bolsa está confirmada.',
        carga_horaria: '30 horas semanais',
        ativo: false,
      },
      {
        titulo: 'Estágio em Laboratório de Biologia Molecular',
        empresa: 'GnTech',
        descricao: 'Atuação em laboratório de farmacogenética, auxiliando no recebimento, coleta e processamento de amostras biológicas. O estagiário também participa de procedimentos de extração de DNA, PCR e qPCR, identificação de amostras e registro de resultados laboratoriais. Oportunidade em Florianópolis – SC, em laboratório de genética.',
        requisitos: 'Estar cursando graduação em Biomedicina, Ciências Biológicas, Farmácia ou áreas relacionadas. Conhecimento intermediário do Pacote Office. Conhecimentos de biologia molecular e biossegurança são diferenciais. Inscrições até 31/01/2027, conforme a publicação consultada.',
        cursos: ['Ciências Biológicas', 'Biomedicina', 'Farmácia'],
        modalidade: 'Presencial',
        bolsa_auxilio: 'Não divulgada',
        carga_horaria: '6 horas diárias',
        ativo: true,
      },
      {
        titulo: 'Estágio em Educação Ambiental',
        empresa: 'Ministério do Meio Ambiente e Mudança do Clima (MMA)',
        descricao: 'Participação em projetos e programas de educação ambiental, organização de documentos, produção de textos institucionais e criação, edição e publicação de materiais digitais. Também poderá auxiliar na atualização de sites, portais e sistemas institucionais. Oportunidade em Brasília – DF, no setor público. Vaga nº 3485.',
        requisitos: 'Estar cursando graduação em Geografia, Biologia ou Artes Cênicas a partir do 3º semestre. São desejáveis conhecimentos de educação ambiental, sustentabilidade, ferramentas digitais e produção de conteúdo.',
        cursos: ['Ciências Biológicas', 'Geografia', 'Artes Cênicas'],
        modalidade: 'Presencial',
        bolsa_auxilio: 'R$ 1.125,69',
        carga_horaria: '30 horas semanais',
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
      titulo: 'Biologia: Fundamentos da Vida',
      descricao: 'Teste seus conhecimentos sobre os principais conceitos da Biologia, incluindo citologia, genética, ecologia, evolução, fisiologia e biodiversidade. O simulado apresenta questões de interpretação e conhecimentos científicos fundamentais.',
      disciplina: 'Biologia',
      tempo: 20,
      quantidade_questoes: 10,
      publicado: true,
      questoes: {
        create: [
          {
            enunciado: 'As células são consideradas unidades fundamentais dos seres vivos. Entre suas estruturas, a mitocôndria desempenha um papel essencial no metabolismo celular. Qual é a principal função dessa organela?',
            alternativas: [
              'Armazenar as informações genéticas da célula.',
              'Realizar a síntese de proteínas.',
              'Produzir ATP por meio da respiração celular.',
              'Controlar a entrada e saída de substâncias da célula.',
              'Realizar a fotossíntese.',
            ],
            respostaCorreta: 2,
            explicacao: 'As mitocôndrias são responsáveis por etapas importantes da respiração celular aeróbica, processo que permite produzir ATP, molécula utilizada como fonte de energia pelas células.',
            ordem: 1,
          },
          {
            enunciado: 'O DNA é uma molécula fundamental para a transmissão das características hereditárias dos organismos. Qual alternativa descreve corretamente sua função?',
            alternativas: [
              'Armazenar e transmitir informações genéticas.',
              'Produzir energia diretamente para as células.',
              'Transportar oxigênio pelo organismo.',
              'Realizar a digestão de nutrientes.',
              'Controlar exclusivamente a temperatura corporal.',
            ],
            respostaCorreta: 0,
            explicacao: 'O DNA contém as informações genéticas que orientam o funcionamento, o desenvolvimento e a reprodução dos organismos. Essas informações são transmitidas entre gerações.',
            ordem: 2,
          },
          {
            enunciado: 'Durante a fotossíntese, as plantas utilizam energia luminosa para produzir compostos orgânicos. Quais são os principais reagentes utilizados nesse processo?',
            alternativas: [
              'Oxigênio e glicose.',
              'Nitrogênio e oxigênio.',
              'Glicose e água.',
              'Gás carbônico e água.',
              'Proteínas e sais minerais.',
            ],
            respostaCorreta: 3,
            explicacao: 'Na fotossíntese, as plantas utilizam água e dióxido de carbono, com energia luminosa, para produzir matéria orgânica. O oxigênio é liberado durante o processo.',
            ordem: 3,
          },
          {
            enunciado: 'Em uma cadeia alimentar, os organismos ocupam diferentes níveis tróficos, dependendo de como obtêm energia. Qual grupo é responsável por transformar matéria inorgânica em matéria orgânica, constituindo a base de muitas cadeias alimentares?',
            alternativas: [
              'Consumidores secundários.',
              'Produtores.',
              'Decompositores exclusivamente.',
              'Consumidores terciários.',
              'Predadores de topo.',
            ],
            respostaCorreta: 1,
            explicacao: 'Os produtores, como plantas e algas, são organismos autotróficos capazes de produzir matéria orgânica a partir de substâncias inorgânicas, geralmente utilizando energia solar por meio da fotossíntese.',
            ordem: 4,
          },
          {
            enunciado: 'A divisão celular é essencial para o crescimento, desenvolvimento e manutenção dos organismos. Qual é a principal característica da mitose?',
            alternativas: [
              'Produzir quatro células haploides geneticamente diferentes.',
              'Reduzir pela metade o número de cromossomos.',
              'Produzir gametas exclusivamente.',
              'Promover a troca de material genético entre cromossomos homólogos.',
              'Originar duas células-filhas com o mesmo número de cromossomos da célula-mãe.',
            ],
            respostaCorreta: 4,
            explicacao: 'Na mitose, uma célula origina duas células-filhas que, normalmente, apresentam o mesmo número de cromossomos da célula original e informações genéticas equivalentes.',
            ordem: 5,
          },
          {
            enunciado: 'A seleção natural é um dos principais mecanismos relacionados à evolução das espécies. Como esse processo ocorre?',
            alternativas: [
              'Todos os indivíduos de uma espécie desenvolvem as mesmas características durante a vida.',
              'Os organismos escolhem conscientemente quais características desejam transmitir.',
              'Indivíduos com características hereditárias vantajosas em determinado ambiente tendem a deixar mais descendentes.',
              'As mutações acontecem exclusivamente quando os organismos precisam se adaptar.',
              'Todos os indivíduos apresentam as mesmas chances de sobrevivência e reprodução, independentemente de suas características.',
            ],
            respostaCorreta: 2,
            explicacao: 'A seleção natural favorece, ao longo das gerações, características hereditárias que aumentam o sucesso reprodutivo dos indivíduos em determinado ambiente. Esse processo pode alterar a frequência dessas características nas populações.',
            ordem: 6,
          },
          {
            enunciado: 'O desmatamento pode provocar alterações significativas no equilíbrio dos ecossistemas. Uma consequência direta dessa prática é:',
            alternativas: [
              'Aumento obrigatório da biodiversidade.',
              'Extinção imediata de todas as espécies do ambiente.',
              'Eliminação completa das relações alimentares.',
              'Perda de habitats e redução da biodiversidade.',
              'Aumento permanente da fertilidade de todos os solos.',
            ],
            respostaCorreta: 3,
            explicacao: 'O desmatamento destrói e fragmenta habitats, reduzindo os recursos disponíveis para diferentes espécies. Isso pode provocar diminuição das populações, desequilíbrios ecológicos e perda de biodiversidade.',
            ordem: 7,
          },
          {
            enunciado: 'O sistema respiratório humano é responsável pelas trocas gasosas entre o organismo e o ambiente. Em qual estrutura pulmonar ocorre principalmente a troca de oxigênio e gás carbônico entre o ar e o sangue?',
            alternativas: [
              'Traqueia.',
              'Alvéolos pulmonares.',
              'Laringe.',
              'Brônquios principais.',
              'Faringe.',
            ],
            respostaCorreta: 1,
            explicacao: 'Os alvéolos pulmonares são pequenas estruturas envolvidas por capilares sanguíneos. Neles ocorre a hematose, processo de troca de gases em que o oxigênio passa para o sangue e o gás carbônico passa para o interior dos alvéolos.',
            ordem: 8,
          },
          {
            enunciado: 'As bactérias são organismos encontrados em diversos ambientes e apresentam grande importância ecológica e econômica. Qual característica é típica das células bacterianas?',
            alternativas: [
              'Possuem núcleo delimitado por membrana.',
              'Apresentam mitocôndrias em seu citoplasma.',
              'São obrigatoriamente organismos multicelulares.',
              'Não possuem material genético.',
              'São organismos procariontes, sem núcleo delimitado por membrana.',
            ],
            respostaCorreta: 4,
            explicacao: 'As bactérias são organismos procariontes. Seu material genético fica localizado em uma região do citoplasma chamada nucleoide, não sendo envolvido por uma membrana nuclear.',
            ordem: 9,
          },
          {
            enunciado: 'A biodiversidade representa a variedade de formas de vida existentes no planeta, incluindo a diversidade de espécies, genes e ecossistemas. Qual ação contribui diretamente para sua conservação?',
            alternativas: [
              'Preservar habitats naturais e combater o desmatamento.',
              'Introduzir espécies exóticas sem estudos prévios.',
              'Aumentar a fragmentação de áreas naturais.',
              'Intensificar a caça de animais silvestres.',
              'Substituir florestas naturais por monoculturas.',
            ],
            respostaCorreta: 0,
            explicacao: 'A conservação dos habitats naturais ajuda a manter as condições necessárias para a sobrevivência e reprodução das espécies, contribuindo para a manutenção da diversidade biológica.',
            ordem: 10,
          },
        ],
      },
    },
  });

  // 10. Resposta de Simulado
  await prisma.respostaSimulado.create({
    data: {
      nome_aluno: 'Estudante',
      simuladoId: simulado.id,
      acertos: 0,
      total_questoes: 10,
      percentual: 0,
      tempo_gasto: 0,
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
