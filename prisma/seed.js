  import pg from 'pg';
import 'dotenv/config';
import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const { PrismaClient } = pkg;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
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
    funcao: 'Desenvolvedora',
    bio: 'Atua no desenvolvimento da plataforma, colaborando na implementação de funcionalidades e na construção das soluções do BioVerse.',
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
    funcao: 'Desenvolvedora',
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
        fonte: 'https://www.agenciaminas.mg.gov.br/noticia/nova-especie-de-inseto-aquatico-e-descoberta-no-parque-estadual-da-serra-do-brigadeiro?utm_source=chatgpt.com',
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
        fonte: 'https://www.gov.br/mma/pt-br/noticias/mma-atualiza-lista-nacional-de-plantas-ameacadas-de-extincao/?utm_source=chatgpt.com',
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
        fonte: 'https://revistapesquisa.fapesp.br/expedicao-cientifica-revela-a-biodiversidade-no-topo-da-amazonia/?utm_source=chatgpt.com',
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
        fonte:'https://www.gov.br/inpa/pt-br/assuntos/noticias/2026/tambaqui-e-classificado-como-vulneravel-e-pesquisadora-do-inpa-alerta-para-queda-na-populacao?utm_source=chatgpt.com',
        publicada: true,
        destaque: false,
      },
      {
        titulo: 'Após 12 anos de mistério, cientistas identificam nova espécie de planta na Mata Atlântica',
        resumo:
          'Uma planta encontrada em Minas Gerais foi identificada como uma espécie inédita, pertencente a um gênero que nunca havia sido registrado no Brasil.',
        conteudo_completo:
          'A espécie Oplonia doceana foi encontrada na Serra do Padre Ângelo, na região do médio rio Doce, em Minas Gerais. A planta foi coletada pela primeira vez em 2013, mas sua identificação levou 12 anos de estudos, comparações e análises botânicas.\n\nA descoberta revelou que ela possui parentesco mais próximo com uma espécie encontrada na Argentina e na Bolívia, ampliando o conhecimento sobre a distribuição das plantas na América do Sul. O caso demonstra como pesquisas de longo prazo são importantes para descobrir e compreender a biodiversidade brasileira.',
        img: 'https://images.openai.com/static-rsc-4/uaSglFlW9KA73bOZR911_46ynGb4puPwQi3W4l5z7ETXFdgsABHOH7Hbji4swoiqDvSeqimVMH109hryOmlWa4cCgD2fZAZKPUMoavG8cSn4Ri3s4lg73iX21sHiCMlQjkQT3JOANur2Hi_zJisjYIDrk-19OVW0fgtphClegxY?purpose=inline',
        data: new Date('2026-07-07T12:00:00.000Z'),
        categoria: 'Botânica / Biodiversidade',
        fonte: 'https://www.gov.br/inma/pt-br/assuntos/noticias/apos-12-anos-de-misterio-cientistas-identificam-nova-especie-de-planta-na-mata-atlantica?utm_source=chatgpt.com',
        publicada: true,
        destaque: true,
      },
      {
        titulo: 'DNA na água revela peixe ameaçado e amplia mapa da biodiversidade em riachos do Espírito Santo',
        resumo:
          'Pesquisadores identificaram a presença de um peixe ameaçado por meio de vestígios de DNA encontrados na água, sem precisar capturar o animal.',
        conteudo_completo:
          'Cientistas utilizaram a técnica de DNA ambiental, conhecida como eDNA, para detectar a presença do peixe Trichogenes claviger, popularmente chamado de bagrinho-de-kaetés, em riachos da bacia do rio Itapemirim, no Espírito Santo.\n\nA técnica consiste em coletar amostras de água e analisar os materiais genéticos deixados pelos organismos que vivem no ambiente. O estudo também identificou outras espécies de vertebrados, mostrando que esse método pode ser uma importante ferramenta para monitorar a biodiversidade e ajudar na conservação de animais ameaçados, reduzindo a necessidade de capturas.',
        img: 'https://images.openai.com/static-rsc-4/SNlebyDgCixctf6TVRtEV2h1Y41xbiTsdLOcZDtcD-N-hmy8CMLFZTvZ_skBYgRax_oTkkho-TN-KWrlziZTIQgDjyDj67VdMWrUFP3Q8m_ZPAO5b4DXZBuTa3xipJGqFUzeXCCMxOBmZSRSTaTEFPnuhXISIbt--YZaXZLY2c8?purpose=inline',
        data: new Date('2026-06-24T12:00:00.000Z'),
        categoria: 'Genética / Conservação',
        fonte: 'https://www.gov.br/inma/pt-br/assuntos/noticias/dna-na-agua-revela-peixe-ameacado-e-amplia-mapa-da-biodiversidade-em-riachos-do-espirito-santo?utm_source=chatgpt.com',
        publicada: true,
        destaque: true,
      },
      {
        titulo: 'Pesquisa descreve duas novas espécies de parasitos de peixes na Mata Atlântica carioca',
        resumo:
          'Pesquisadores encontraram dois parasitos desconhecidos pela ciência nas brânquias de peixes conhecidos como lambaris.',
        conteudo_completo:
          'Pesquisadores do Instituto Oswaldo Cruz identificaram duas novas espécies de parasitos em peixes da espécie Astyanax taeniatus, conhecidos popularmente como lambaris.\n\nOs animais foram coletados em ambientes aquáticos da Mata Atlântica, na região de Jacarepaguá, no Rio de Janeiro. Os parasitos foram encontrados nas brânquias, estruturas responsáveis pela respiração dos peixes. A descoberta contribui para ampliar o conhecimento sobre a biodiversidade de organismos parasitas, suas relações com os hospedeiros e o equilíbrio ecológico dos ambientes de água doce.',
        img: 'https://images.openai.com/static-rsc-4/iXpIV7jFYffyVvwD6tH2qHZHG1tUUa1EbiKxRyRZY6UpQzPEmv4mPvsatp3EswZbENtgreXXa5HkNFq-3Rba0thYClED-umha4Zk5YfSSSbzVU5AJLLRZNXE5yRpHsQ8xYAbw4jnqo6z3-ojWHnu5DrOLTHwNUP5YINcL6V0iPg?purpose=inline',
        data: new Date('2026-08-25T12:00:00.000Z'),
        categoria: 'Zoologia / Parasitologia',
        fonte: 'https://www.ioc.fiocruz.br/noticias/pesquisa-descreve-duas-novas-especies-de-parasitos-de-peixes-na-mata-atlantica-carioca?utm_source=chatgpt.com',
        publicada: true,
        destaque: false,
      },
      {
        titulo: 'Recifes brasileiros escondem duas novas espécies de peixes',
        resumo:
          'Estudos genéticos e anatômicos revelaram que peixes considerados de uma única espécie pertencem, na verdade, a grupos diferentes.',
        conteudo_completo:
          'Cientistas descobriram que peixes recifais anteriormente classificados como uma única espécie apresentam diferenças genéticas e físicas que indicam a existência de espécies distintas.\n\nEsses pequenos peixes vivem escondidos em frestas de rochas, buracos na areia e entre algas, o que dificulta sua observação. A pesquisa utilizou análises de DNA e características anatômicas para compreender melhor essa diversidade. O trabalho mostra que os ambientes marinhos brasileiros ainda guardam espécies desconhecidas e reforça a importância de proteger os recifes, ecossistemas ricos em vida.',
        img: 'https://images.openai.com/static-rsc-4/hsdvYTP33QIYi74NAlr_7ZP5fGL37FoV064OL15BFew0XUYq2lTukBOIJhDgGXxfK3dCglQSjbp4RcOlZU8OMX1YBgtYKVrIK6eXvcTEyxvGraFWSHyEZzAzktoR1igXmu9eEniOfFXq9r9NCGWzIiVenXQrZRewLZmUL98PsSU?purpose=inline',
        data: new Date('2026-08-11T12:00:00.000Z'),
        categoria: 'Biologia Marinha / Zoologia',
        fonte: 'https://www.gov.br/icmbio/pt-br/assuntos/centros-de-pesquisa/tartarugas-marinhas-e-biodiversidade-marinha-do-leste/comunicacao/ultimas-noticias/recifes-brasileiros-escondem-duas-novas-especies?utm_source=chatgpt.com',
        publicada: true,
        destaque: true,
      },
      {
        titulo: 'Escondida entre as rochas, nova espécie de antúrio é descoberta na Serra do Padre Ângelo',
        resumo:
          'Uma nova espécie de antúrio foi identificada em uma região montanhosa de Minas Gerais e possui distribuição extremamente limitada.',
        conteudo_completo:
          'A espécie Anthurium occultum foi descoberta na Serra do Padre Ângelo, localizada no leste de Minas Gerais. A planta é conhecida apenas nessa região, o que significa que sua distribuição natural é muito restrita.\n\nDevido à vulnerabilidade de seu habitat e à sua ocorrência limitada, a espécie foi classificada como Criticamente em Perigo de extinção. A descoberta destaca a importância de pesquisas botânicas e da preservação de áreas naturais, pois espécies com distribuição pequena podem ser especialmente vulneráveis a alterações ambientais.',
        img: 'https://images.openai.com/static-rsc-4/qnz4YyHglCFR6hpWiu_2hs1xYQpGTAki9H_TXgtgqOTK9fp14AAzZCHXQzQw7r1l6mUrion-ZqjdrXKcxqTMazB2qFt_PFlPDnnEWi2Ugv3Fc4ue79wV3XDh9sQKeXUz9rLoyPrtNbSsZ-R8J27VnIdJ42Fe2xGkiCXskzVZIc13AMEQ66CN6ttWn0c9iduG?purpose=fullsize',
        data: new Date('2026-09-29T12:00:00.000Z'),
        categoria: 'Botânica / Conservação',
        fonte: 'https://www.gov.br/inma/pt-br/assuntos/noticias/escondida-entre-as-rochas-nova-especie-de-anturio-e-descoberta-na-serra-do-padre-angelo-em-minas-gerais?utm_source=chatgpt.com',
        publicada: true,
        destaque: true,
      },
      {
        titulo: 'Instituto Butantan realiza primeiro sequenciamento do genoma da jararaca-ilhoa',
        resumo:
          'Pesquisadores sequenciaram o genoma da jararaca-ilhoa, uma serpente brasileira encontrada exclusivamente na Ilha da Queimada Grande.',
        conteudo_completo:
          'Cientistas do Instituto Butantan realizaram o primeiro sequenciamento completo do genoma em nível cromossômico da jararaca-ilhoa (Bothrops insularis).\n\nA espécie é endêmica da Ilha da Queimada Grande, localizada no litoral paulista, e possui características evolutivas importantes relacionadas ao seu isolamento geográfico. O estudo permitiu obter informações sobre a organização genética, a evolução da serpente, a composição de seu veneno e sua história populacional. Os dados podem auxiliar futuras pesquisas sobre genética, evolução, biodiversidade e conservação dessa espécie, que possui distribuição extremamente restrita.',
        img: 'https://images.openai.com/static-rsc-4/02bp6g9-fy0aoLS5kykgFqxz0a1_e3YhPHU1kI6XAOi_a7m2sopI3O31aeVLzEALFI5i9o3Pr4iRZRA-KuJ8zp0lL0cOoL-FMUrYZg-eyxbh6-iAGU2jlJO8ZvJki7CyQiHaENGPLZZsj9qS7kf-1N8u0TgjJNvoxYAbImtUJNQ?purpose=inline',
        data: new Date('2026-06-10T12:00:00.000Z'),
        categoria: 'Genética / Zoologia / Evolução',
        fonte: 'https://www.butantan.gov.br/noticias/pesquisadores-do-instituto-butantan-realizam-primeiro-sequenciamento-do-genoma-de-uma-serpente-insular-endemica-do-brasil?utm_source=chatgpt.com',
        publicada: true,
        destaque: true,
      },
      {
        titulo: 'Planta carnívora rara e ameaçada é registrada pela primeira vez no Nordeste',
        resumo:
          'Uma planta carnívora rara foi registrada no Piauí, trazendo novas informações sobre sua distribuição e seu risco de extinção.',
        conteudo_completo:
          'A planta carnívora Utricularia warmingii foi registrada pela primeira vez no Nordeste brasileiro, em uma área alagada no município de Campo Maior, no Piauí.\n\nA descoberta aconteceu durante um inventário de plantas aquáticas realizado em 2023. A espécie estava sem registros em determinadas regiões há mais de 80 anos, o que tornou o achado importante para os estudos de biodiversidade. Após a descoberta, os pesquisadores reavaliaram sua situação de conservação e sugeriram a classificação da espécie como Em Perigo no Brasil. A pesquisa destaca como inventários botânicos são essenciais para identificar espécies raras e desenvolver estratégias de proteção.',
        img: 'https://images.openai.com/static-rsc-4/rcEeNCxFYt3Zgyjw8ph3PKaIJ1FxddgC8ksOr1zDIigRm7OYFfOD9zb148Sh1Trzd4H4iU_ih1vqFUKljE8Acs-407-6ivGheTfP_XOzCF8PWc5Eaj-A5QclaVTuGDuxdsMMB_EFaohMyzko1eXDHiXCfJWBzoEHthOE9cMoL08?purpose=inline',
        data: new Date('2026-03-11T12:00:00.000Z'),
        categoria: 'Botânica / Biodiversidade',
        fonte: 'https://www.gov.br/inma/pt-br/assuntos/noticias/planta-carnivora-rara-e-ameacada-e-registrada-pela-primeira-vez-no-nordeste?utm_source=chatgpt.com',
        publicada: true,
        destaque: false,
      },
      {
        titulo: 'Três novas espécies de plantas são descobertas na Mata Atlântica',
        resumo:
          'Pesquisadores identificaram três espécies de plantas do gênero Pleroma em áreas rochosas do Espírito Santo e de Minas Gerais.',
        conteudo_completo:
          'Cientistas descobriram três novas espécies de plantas pertencentes ao gênero Pleroma, da família Melastomataceae, na Mata Atlântica. As espécies foram nomeadas Pleroma latisepalum, Pleroma leucotrichum e Pleroma squamipilosum.\n\nElas foram encontradas em formações rochosas conhecidas como inselbergues, ambientes que possuem condições extremas, como pouca água, solo raso e forte exposição ao sol. Duas das espécies já apresentam preocupações relacionadas à conservação: uma foi classificada como Em Perigo e outra como Vulnerável. A descoberta reforça a importância da preservação desses ambientes, que possuem espécies altamente adaptadas e muitas vezes restritas a pequenas áreas.',
        img: 'https://images.openai.com/static-rsc-4/JIpY2Y_Y2kB-mkcEj5V-0cfqLQ9IHNlO1WqjZR-ZgYtBQ-6x_yzjfKG29F5m9SxlFaxep6sd0akAA0FT2AtITA6ZHX7FzbIQM4Ax92j6SBHl-h4jB2zOEp4qsMU8GsT6jzUW2Be1uvmYgRiibGwzbLCyLypNE4Wt1bWcTizJT6E?purpose=inline',
        data: new Date('2026-11-04T12:00:00.000Z'),
        categoria: 'Botânica / Biodiversidade / Conservação',
        fonte: 'https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/noticias/2026/11/tres-novas-especies-de-plantas-sao-descobertas-na-mata-atlantica?utm_source=chatgpt.com',
        publicada: true,
        destaque: true,
      },
      {
        titulo: 'Nova espécie de perereca-de-vidro é descoberta no coração do Cerrado',
        resumo:
          'Uma nova espécie de anfíbio foi identificada em Goiás e chamou atenção por sua pele translúcida e distribuição limitada.',
        conteudo_completo:
          'Uma nova espécie de perereca-de-vidro, denominada Vitreorana micaelae, foi descoberta em áreas de mata próximas a riachos em Luziânia, Goiás.\n\nEsses anfíbios são conhecidos pela pele fina e translúcida, que permite observar partes de seus órgãos internos. A espécie foi encontrada em apenas dois locais, o que levanta preocupações sobre sua conservação. Entre as principais ameaças estão a perda de habitat, mineração, construção de barragens e alterações ambientais que afetam os riachos. O estudo utilizou análises genéticas, características físicas e observação dos cantos para confirmar que se tratava de uma espécie diferente das já conhecidas.',
        img: 'https://images.openai.com/static-rsc-4/N4c_TVkqdV9ltfXSIpfHZGRXnma0kknViaCP0eY2HqS5KS9iDVf5JZWkRSYseWtyADaToBAm5x60cjW-msxLgwx1jFglh8eIRmqza1Vtto8LanzcbIu0s0IMMxIUOjSzQXSPIPtRzHg7lgcHTbRLlNJBwyn1QSo0B_dYuB4LBJY?purpose=inline',
        data: new Date('2026-10-22T12:00:00.000Z'),
        categoria: 'Zoologia / Anfíbios / Conservação',
        fonte: 'https://crbio08.gov.br/noticias/institucionais/nova-especie-de-perereca-de-vidro-e-descoberta-no-coracao-do-cerrado/?utm_source=chatgpt.com',
        publicada: true,
        destaque: true,
      },
      {
        titulo: 'DNA ambiental transforma o monitoramento da biodiversidade em riachos brasileiros',
        resumo:
          'O uso de DNA presente na água ajuda cientistas a identificar animais que vivem nos ecossistemas aquáticos, mesmo sem encontrá-los diretamente.',
        conteudo_completo:
          'O DNA ambiental é uma técnica que permite identificar organismos a partir de vestígios genéticos deixados no ambiente, como células, muco, escamas ou outros materiais biológicos presentes na água.\n\nPesquisadores podem coletar amostras de rios e riachos, analisar o material em laboratório e identificar espécies que habitam determinada região. Essa tecnologia facilita o monitoramento da biodiversidade, principalmente de animais raros, ameaçados ou difíceis de observar. Além disso, pode diminuir a necessidade de captura de animais, tornando algumas pesquisas menos invasivas e contribuindo para ações de conservação.',
        img: 'https://images.openai.com/static-rsc-4/RLrYvDZ3N_ig37AQliXXyIHLWURQ1I-gi_SHp8f7BGf6j9Um6MzeE8nq99xqo1N_9i8e2NVxwRClBGc5E0CJ8tSGP5iYQ6jiFH-UxTqoKuIX1lNfsCge-_O1Meu3mBddAVJ6I7_END9u28DKzaHU4bmxtCxjbc5f2Yh6ojrHNJ1TJIq2he3Om3etD3VWHm8z?purpose=inline',
        data: new Date('2026-06-24T12:00:00.000Z'),
        categoria: 'Genética / Ecologia / Tecnologia',
        fonte: 'https://www.gov.br/inma/pt-br/assuntos/noticias/dna-na-agua-revela-peixe-ameacado-e-amplia-mapa-da-biodiversidade-em-riachos-do-espirito-santo?utm_source=chatgpt.com',
        publicada: true,
        destaque: false,
      },
      {
        titulo: 'Nova espécie de antúrio é descoberta crescendo sobre rochas no Espírito Santo',
        resumo:
          'Pesquisadores descobriram uma nova espécie de antúrio que cresce sobre rochas e foi identificada no estado do Espírito Santo.',
        conteudo_completo:
          'Pesquisadores do Instituto Nacional da Mata Atlântica (INMA), da Universidade Federal do Espírito Santo (UFES), do Jardim Botânico do Rio de Janeiro e da Universidade de São Paulo (USP) descobriram uma nova espécie de antúrio, chamada Anthurium petraeum, conhecida como antúrio-das-pedras.\n\nA planta foi coletada durante uma expedição científica realizada em março de 2022, no município de Linhares, no Espírito Santo. A identificação foi confirmada por meio de análises botânicas e consultas a coleções científicas. A espécie apresenta uma característica interessante: cresce sobre rochas, diferentemente de muitos antúrios encontrados em ambientes florestais.\n\nAté o momento, ela é considerada endêmica do Espírito Santo, com registros em Linhares e Marilândia. A descoberta reforça a importância das pesquisas botânicas e da conservação dos habitats naturais, principalmente porque espécies com distribuição restrita podem ser ameaçadas pelo desmatamento, pela retirada ilegal de plantas e pela degradação ambiental.',
        img: 'https://images.openai.com/static-rsc-4/CVicFoCImTN6OyoVVmvFmxcGLqlSj-bIQdeqNcQtPKrALCvwDAzeqXiGsoI-UIjIqtKO3hBsWbKdWC4f37lFBEhqZCboKwCVluZj9hs6oDWyfaphm_4mlJ_L15SSyu353X6MTe2wkhmokBf8HcPGoePgl3eV6zfxiyVWRk5sQto?purpose=inline',
        data: new Date('2026-02-19T12:00:00.000Z'),
        categoria: 'Botânica / Biodiversidade / Conservação',
        fonte: 'https://www.gov.br/inma/pt-br/nova-especie-de-anturio-e-descoberta-no-espirito-santo?utm_source=chatgpt.com',
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
        titulo: 'Conceitos Básicos da ECOLOGIA | Prof. Paulo Jubilut',
        descricao: 'Nesta aula de introdução à ecologia, o professor Paulo Jubilut explica diversos conceitos que são essenciais para o estudo dessa área da biologia. Aprenda o que é ecologia, nicho ecológico, habitat, população, comunidade, ecossistema, fatores bióticos e abióticos, biosfera e biomas.',
        url: 'https://youtu.be/XvdePktAui8',
        plataforma: 'YouTube',
        thumbnail: 'https://s4.static.brasilescola.uol.com.br/be/2023/10/escrito-ecologia-sobre-a-imagem-da-terra-quase-completamente-coberta-por-topos-de-arvore-de-uma-floresta.jpg',
        disciplina: 'Ecologia',
        duracao: '25:49',
        ordem: 1,
        publicado: true,
      },
      {
        titulo: 'Ecologia: conceitos básicos e fluxo de energia em 7 minutos',
        descricao: 'Ecologia tem muito nome pra guardar, mas a ideia que sustenta tudo é uma só: a matéria volta pros produtores e a energia não volta. Cada nível trófico perde energia pro ambiente na forma de calor, e é por isso que nenhuma cadeia alimentar é infinita. É esse raciocínio que a prova cobra.',
        url: 'https://youtu.be/TsclSi3nNsI',
        plataforma: 'YouTube',
        thumbnail: 'https://static.todamateria.com.br/upload/ni/ve/niveisdeorganizacao-cke.jpg',
        disciplina: 'Ecologia',
        duracao: '7:13',
        ordem: 2,
        publicado: true,
      },
      {
        titulo: 'Sistemas do Corpo Humano para crianças - O sistema ósseo, muscular, nervoso, respiratório, ...',
        descricao: 'Vídeo educativo que viaja para o interior do corpo humano, explicando os sistemas. Explica o sistema ósseo, o sistema muscular, o sistema nervoso, o sistema respiratório, o sistema digestório, o sistema excretor e o sistema circulatório. Este vídeo faz parte de uma coleção educativa sobre o corpo humano, ideal para crianças do ensino fundamental I.',
        url: 'https://youtu.be/-3adho_PG3I',
        plataforma: 'YouTube',
        thumbnail: 'https://static.todamateria.com.br/img/dossier/sistema-digestorio-small.png?auto_optimize=low',
        disciplina: 'Sistemas do Corpo Humano',
        duracao: '10:16',
        ordem: 3,
        publicado: true,
      },
      {
        titulo: 'SISTEMAS DO CORPO HUMANO - Resumo de Fisiologia | Biologia com Samuel Cunha',
        descricao: 'Video aula: SISTEMAS DO CORPO HUMANO | Biologia com Samuel Cunha ESTUDE NA MINHA PLATAFORMA: https://professorsamuelcunha.com.br/ ♦ TODAS as aulas, apostilas, exercícios comentados e muito mais!',
        url: 'https://youtu.be/gz9BSAnNjKE',
        plataforma: 'YouTube',
        thumbnail: 'https://static.biologianet.com/2020/02/orgaos-do-corpo-humano.jpg',
        disciplina: 'Sistemas do Corpo Humano',
        duracao: '12:37',
        ordem: 4,
        publicado: true,
      },
      {
        titulo: 'Educação sexual para os jovens do ensino médio',
        descricao: 'Alunos do ensino médio da Escola Estadual professor Ruy Alencar conversam sobre educação sexual e a importância de ter um diálogo aberto com os pais.',
        url: 'https://youtu.be/4D-gxZXh6lA',
        plataforma: 'YouTube',
        thumbnail: 'https://thumbor.novaescola.org.br/WJpfZO27ZRS1-mQiGcenAPKCPbg=/assets.novaescola.org.br/dsVxp433GQZKtmDMYKErDJXcxv9zvzDJudS2R3CYpp7B3K4D77h5FgtQNh2y/ne324-emfoco-pg1.png',
        disciplina: 'Educação sexual',
        duracao: '9:16',
        ordem: 5,
        publicado: true,
      },
      {
        titulo: 'Métodos Contraceptivos',
        descricao: 'Material didático do  projeto de extensão Fisiodivulgando #métodosContraceptivos #Fisiologia #EducaçãoSexual',
        url: 'https://youtu.be/1bHWkQAZ5Io',
        plataforma: 'YouTube',
        thumbnail: 'https://studiopipoca.com/cdn/shop/articles/por-que-a-educacao-sexual-e-importante-288039.png?v=1663193950&width=1500',
        disciplina: 'Educação sexual',
        duracao: '6:02',
        ordem: 6,
        publicado: true,
      },
      {
        titulo: 'GENÉTICA: Leis de Mendel, Genótipo e Fenótipo, DNA, Genes e Cromossomos | Quer Que Desenhe?',
        descricao: 'Genética é um dos assuntos que mais caem em Biologia no ENEM, e quase sempre pela mesma porta: as Leis de Mendel. Antes delas, é preciso ter claro o que são gene, DNA, genótipo, fenótipo e cromossomos homólogos. Com essa base, as duas leis deixam de ser decoreba e viram raciocínio.',
        url: 'https://youtu.be/-Vv3USW7iRU',
        plataforma: 'YouTube',
        thumbnail: 'https://static.todamateria.com.br/upload/cr/om/cromossomo.jpg',
        disciplina: 'Genética',
        duracao: '4:37',
        ordem: 7,
        publicado: true,
      },
      {
        titulo: 'Introdução à GENÉTICA: O Que Seu DNA Revela?',
        descricao: '📚 Você já conhece o Lume? Diferente de um chat genérico, o Lume conhece a matéria do jeito que ela cai no ENEM e no ensino médio brasileiro. Ele sabe o que você já estudou, onde mais erra, e monta seu caminho a partir disso. Você pratica → erra uma questão → o Lume mostra onde foi o erro, ali mesmo, sem sumir com o contexto → a questão entra na revisão → e ele já te diz o que estudar em seguida. Nada de decidir sozinho o que fazer hoje.',
        url: 'https://youtu.be/ipSpg8IjfaM',
        plataforma: 'YouTube',
        thumbnail: 'https://bkpsitecpsnew.blob.core.windows.net/uploadsitecps/sites/260/2025/10/ALELOS.gif',
        disciplina: 'Genética',
        duracao: '7:15',
        ordem: 8,
        publicado: true,
      },
      {
        titulo: 'Aula: Carboidratos,lipídios e proteínas',
        descricao: 'Aula sobre carboidratos, lipídios e proteínas para alunos do Ensino fundamental.',
        url: 'https://youtu.be/lA5lnVy2iyU',
        plataforma: 'YouTube',
        thumbnail: 'https://static.biologianet.com/conteudo/images/observe-os-quatro-niveis-piramide-alimentar-a-base-representa-alimentos-ricos-em-carboidratos-56e8310e39d91.jpg',
        disciplina: 'Alimentação',
        duracao: '12:18',
        ordem: 9,
        publicado: true,
      },
      {
        titulo: 'O Corpo Humano - Nutrição do Corpo Humano | Ciências',
        descricao: 'OLÁ, SUPERALUNOSSSS!🚀🚀🚀 Nossa viagem de hoje pelo universo da Ciência será com a Superprofa Larissa, sobre o corpo humano e seus sistemas, como ocorre a nutrição do nosso corpo? Confira.',
        url: 'https://youtu.be/xJjVE8W4OjE',
        plataforma: 'YouTube',
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkbKRdqMERaxbRvCTgHMPPoGJ7SKZabondunwMF7wenllvBlOy4xebUvI&s=10',
        disciplina: 'Alimentação',
        duracao: '4:32',
        ordem: 10,
        publicado: true,
      },
      {
        titulo: 'CITOLOGIA: Introdução ao Mundo Microscópico das CÉLULAS',
        descricao: '📚 Você já conhece o Lume? Diferente de um chat genérico, o Lume conhece a matéria do jeito que ela cai no ENEM e no ensino médio brasileiro. Ele sabe o que você já estudou, onde mais erra, e monta seu caminho a partir disso. Você pratica → erra uma questão → o Lume mostra onde foi o erro, ali mesmo, sem sumir com o contexto → a questão entra na revisão → e ele já te diz o que estudar em seguida. Nada de decidir sozinho o que fazer hoje.',
        url: 'https://youtu.be/I_KaAQV8hZw',
        plataforma: 'YouTube',
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0OTYt9G1YwbOoIY2Y-rTmNQDV4PmcMvp7LVnxYyzE_blK9D6VUk-E0s4&s=10',
        disciplina: 'Citologia',
        duracao: '7:05',
        ordem: 11,
        publicado: true,
      },
      {
        titulo: 'Membrana Plasmática | Célula | Prof. Paulo Jubilut',
        descricao: '★ Estude no BIOLOGIA TOTAL: http://www.biologiatotal.com.br',
        url: 'https://youtu.be/yaiEgmOboq0?list=PLXXIkklJqmKlg9XsaLbc-BrXpkw-T5ZAs',
        plataforma: 'YouTube',
        thumbnail: 'https://static.todamateria.com.br/upload/me/mb/membranaplasmaticadacelulaeucariota-cke.jpg',
        disciplina: 'Citologia',
        duracao: '32:03',
        ordem: 12,
        publicado: true,
      },
      {
        titulo: 'REINO VEGETAL - INTRODUÇÃO À BOTÂNICA | Briófitas - Pteridófitas - Gimnospermas e Angiospermas',
        descricao: 'REINO VEGETAL - INTRODUÇÃO À BOTÂNICA',
        url: 'https://youtu.be/EAVhBfwLUhk',
        plataforma: 'YouTube',
        thumbnail: 'https://s1.static.brasilescola.uol.com.br/be/2021/05/partes-da-planta.jpg',
        disciplina: 'Botânica',
        duracao: '23:41',
        ordem: 13,
        publicado: true,
      },
      {
        titulo: 'TUDO de BOTÂNICA para o ENEM 2026 (melhor didática do Brasil)',
        descricao: '🧠 Aqui você encontra: ➡️ Resolução de questões do Enem de matemática, naturezas, humanas e linguagens, superdidáticas; ➡️ Revisão do que cai todo ano, rápido, para converter em acertos; ➡️ Estratégias de estudo e cronogramas para a reta final do Enem;➡️ Simulados e revisões intensivas; e ➡️ Preparação mental para vestibulandos de Medicina. Inscreva-se no canal para chegar na prova à frente! 🎯',
        url: 'https://youtu.be/0QoqAjdfsPM',
        plataforma: 'YouTube',
        thumbnail: 'https://static-prodigio.b-cdn.net/Biologia/Introdu%C3%A7%C3%A3o%20%C3%A0%20bot%C3%A2nica/Botanica-8.png',
        disciplina: 'Botânica',
        duracao: '4:31::49',
        ordem: 14,
        publicado: true,
      },
      {
        titulo: 'IMPORTÂNCIA DA RECICLAGEM',
        descricao: 'O vídeo explica qual a importância da Reciclagem. Também são apresentados exemplos reais e interessantes desse processo na prática. Ao contrário do que muitos podem pensar, os benefícios da reciclagem não são apenas para o meio ambiente. Nossa sociedade e até mesmo a economia também se beneficiam quando praticamos a reciclagem do nosso lixo. Não é à toa que países que são exemplos de desenvolvimento para o mundo levam tão a sério essa temática e têm uma população extremamente engajada em praticá-la.',
        url: 'https://youtu.be/ITur0JNJZos',
        plataforma: 'YouTube',
        thumbnail: 'https://media.licdn.com/dms/image/v2/D4D22AQEVYU8Jj-m0pA/feedshare-shrink_800/B4DZ4tIvi0IUAc-/0/1778873727415?e=2147483647&v=beta&t=Hi4VAI9zwHq73JMroVL26fWkvX5OASN3p-K6UyeHx-g',
        disciplina: 'Reciclagem',
        duracao: '5:44',
        ordem: 15,
        publicado: true,
      },
      {
        titulo: 'O QUE NUNCA TE CONTARAM SOBRE O LIXO - Nostalgia Animado',
        descricao: 'PARA ONDE VAI TODO O LIXO DO MUNDO? Vai tudo para os oceanos? Para os países mais pobres? Afinal, o que acontece com todo o lixo que é produzido diariamente no mundo?',
        url: 'https://youtu.be/sfa-jnXtA84',
        plataforma: 'YouTube',
        thumbnail: 'https://www.sobiologia.com.br/figuras/Solo/compostagem.jpg',
        disciplina: 'Reciclagem',
        duracao: '14:05',
        ordem: 16,
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
