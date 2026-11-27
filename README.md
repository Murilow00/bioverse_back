

# BioVerse API

API REST desenvolvida para apoiar o portal educacional **BioVerse**, voltado ao ensino de Biologia e Ciências. O back-end centraliza os dados exibidos na plataforma, como notícias científicas, carreiras, dicas de estudo, estágios, simulados, vídeos, equipe e usuários.

## Objetivo do back-end

- Disponibilizar dados estruturados para o front-end.
- Gerenciar conteúdos educacionais e informativos.
- Realizar operações de cadastro, consulta, atualização e exclusão.
- Persistir os dados em um banco PostgreSQL.
- Validar as informações recebidas pela API e retornar respostas padronizadas.

## Tecnologias

| Tecnologia | Finalidade |
| --- | --- |
| Node.js | Execução da aplicação JavaScript no servidor |
| Express | Criação da API e gerenciamento das rotas HTTP |
| Prisma ORM | Mapeamento e manipulação das tabelas do banco de dados |
| PostgreSQL | Armazenamento persistente dos dados |
| Supabase | Hospedagem da instância PostgreSQL |
| bcryptjs | Criptografia de senhas |
| dotenv | Carregamento das variáveis de ambiente |
| Multer e Sharp | Processamento de arquivos e imagens |
| Nodemon | Reinicialização automática durante o desenvolvimento |

## Pré-requisitos

- Node.js 18 ou superior
- npm
- Uma instância PostgreSQL
- Git

## Instalação

Clone o projeto e instale as dependências:

```bash
git clone <URL_DO_REPOSITORIO>
cd bioverse_back
npm install
```

## Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@HOST:5432/BANCO"
DIRECT_URL="postgresql://USUARIO:SENHA@HOST:5432/BANCO"
PORT=3001
```

- `DATABASE_URL`: conexão utilizada pela aplicação e pelo Prisma.
- `DIRECT_URL`: conexão direta usada pelo Prisma em operações específicas.
- `PORT`: porta HTTP opcional. A API utiliza `3001` por padrão.

Não compartilhe credenciais reais nem envie o arquivo `.env` para o repositório.

## PostgreSQL e Prisma

O projeto utiliza o Prisma com PostgreSQL. Para preparar o banco:

```bash
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
```

Durante o desenvolvimento, novas alterações no schema podem ser registradas com:

```bash
npx prisma migrate dev --name nome_da_migracao
```

Para visualizar os dados por meio da interface do Prisma Studio:

```bash
npx prisma studio
```

Os modelos estão definidos em `prisma/schema.prisma` e incluem notícias, carreiras, dicas, estágios, simulados, questões, respostas, vídeos, informações institucionais, equipe, administradores e usuários.

## Executando o projeto

Modo de desenvolvimento:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

A API ficará disponível em `http://localhost:3001`, ou na porta definida em `PORT`.

## Endpoints principais

| Recurso | Base da rota |
| --- | --- |
| Status da API | `GET /` |
| Administradores | `/api/administradores` |
| Sobre nós | `/api/SobreNos` |
| Carreiras | `/api/carreiras` |
| Dicas | `/api/dicas` |
| Estágios | `/api/estagios` |
| Membros da equipe | `/api/membros-equipe` |
| Notícias | `/api/noticias` |
| Simulados | `/api/simulados` |
| Questões dos simulados | `/api/questoes-simulados` |
| Respostas dos simulados | `/api/respostas-simulados` |
| Vídeos | `/api/videos` |
| Usuários | `/api/usuarios` |

Os recursos CRUD seguem o padrão abaixo:

| Método | Caminho | Operação |
| --- | --- | --- |
| `GET` | `/api/{recurso}` | Lista os registros |
| `GET` | `/api/{recurso}/:id` | Busca um registro pelo ID |
| `POST` | `/api/{recurso}` | Cria um novo registro |
| `PUT` | `/api/{recurso}/:id` | Atualiza um registro existente |
| `DELETE` | `/api/{recurso}/:id` | Remove um registro |

Algumas rotas também oferecem filtros ou buscas específicas, como `GET /api/usuarios/email/:email` e `GET /api/administradores/email/:email`.

## CRUD de notícias

A API de notícias permite gerenciar o conteúdo publicado no portal:

- `POST /api/noticias`: cria uma notícia.
- `GET /api/noticias`: lista todas as notícias e aceita os filtros `publicada` e `destaque`.
- `GET /api/noticias/:id`: retorna uma notícia pelo ID.
- `PUT /api/noticias/:id`: atualiza os campos enviados.
- `DELETE /api/noticias/:id`: remove uma notícia pelo ID.

No momento da criação, o campo `titulo` é obrigatório. Os campos `resumo`, `conteudo_completo`, `img` e `categoria` devem ser textos. Já `publicada` e `destaque` devem ser valores booleanos.

## Usuários e administradores

O cadastro de usuários e administradores utiliza bcrypt para gerar o hash da senha antes de salvá-la no banco. Os dados retornados por algumas rotas são serializados para não expor a senha.

O projeto ainda não possui integração com Clerk, login por token ou middleware de autorização implementado no servidor. Portanto, as rotas administrativas também não estão protegidas atualmente. Antes de disponibilizar a API em produção, é necessário implementar autenticação, autorização por função e proteção das operações sensíveis.

## Validações e erros

A API valida informações como:

- Campos obrigatórios.
- Tipos de dados.
- IDs numéricos positivos.
- Parâmetros booleanos.
- Emails duplicados.
- Existência de registros antes de atualizá-los ou removê-los.

As respostas de erro utilizam códigos HTTP apropriados, incluindo `400` para dados inválidos, `404` para recursos inexistentes, `409` para conflitos e `500` para falhas internas.