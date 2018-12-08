<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
<p align="center">
   <a href="http://nestjs.com/">Uma aplicação desenvolvida em Typescript usando Nestjs Framework</a>
</p>

[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=api-ceturb&metric=alert_status)](https://sonarcloud.io/dashboard?id=api-ceturb)[![Codesmells](https://sonarcloud.io/api/project_badges/measure?project=api-ceturb&metric=code_smells)](https://sonarcloud.io/dashboard?id=api-ceturb)[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=api-ceturb&metric=bugs)](https://sonarcloud.io/dashboard?id=api-ceturb)[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=api-ceturb&metric=coverage)](https://sonarcloud.io/dashboard?id=api-ceturb)[![Security](https://sonarcloud.io/api/project_badges/measure?project=api-ceturb&metric=security_rating)](https://sonarcloud.io/dashboard?id=api-ceturb)[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=api-ceturb&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=api-ceturb)[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)


# API-CETURB

## Para buildar o Docker
```bash
docker build -t api-ceturb:latest .
```


## Variáveis de ambiente configuráveis para o Docker
```bash
NODE_ENV                # definir como 'production' para o swagger operar usando HTTPS
CETURB_ROOT_ENDPOINT    # definir uma rota raiz personalizada para a aplicação ( exemplo: '/v2' ). ( default: '' )
REDIS_HOST              # Apontar o IP do servidor do Redis
REDIS_PORT              # Apontar a porta do servidor do Redis
MINIO_ADDRESS           # Apontar o IP do servidor do Minio
MINIO_SECRETKEY         # Senha do minio
MINIO_KEY               # Login do minio
TRANSCOLDB_HOST         # servidor do banco de dados
TRANSCOLDB_PORT         # porta do banco de dados
TRANSCOLDB_USER         # Usuario do banco de dados
TRANSCOLDB_PASSWORD     # senha do banco de dados
TRANSCOLDB_SCHEMA       # nome do banco de dados
TRANSCOLDB_ORM_SYNC     # sincronia do TypeORM com as tabelas do banco - false por padrão
```


## Rodando a API diretamente no Node
Essa API está configurada para fazer cache das requisições usando o serviço do <a href="https://redis.io/">redis</a>, portanto, é necessário subir o servidor do redis localmente ou apontar um endereço e porta de um servidor válido através das variaveis de ambiente.  
Para simplesmente subir um redis local (ambiente de teste), você pode rodar esse script:  
```bash
npm run redis
```
Isso irá baixar uma imagem docker do redis e executa-la localmente.  
  
Para apontar um servidor dedicado (ambiente de produção) basta definir as variaveis de ambiente como nesse exemplo:  
```bash
export REDIS_HOST="127.0.0.1"
export REDIS_PORT="6379"
```
Essa api também possui rotas para usar o <a href="https://www.minio.io/">Minio Client</a>, portando é necessário subir o servidor do Minio localmente, para simplesmente subir um minio local, você pode rodar esse script:

```bash
npm run minio
```
A chave do minio será definida por padrão para 'admin' e a chave secreta para 'admin123'

Para configurar o minio execute o comando

```bash
npm run config:minio
```

E para subir dois arquivos automaticamente para realizar testes execute

```bash
npm run upload:minio
```

# TranscolDB - Banco de dados auxiliar integrado

## Descrição

A nova api-ceturb foi integrada com o banco de dados auxiliar, desenvolvido para dar apoio às tarefas de geração de GTFS.  

### Observação importante
Note que a sincronia do ORM está desativada por padrão. Isso significa que o app não irá gerar as tabelas no banco automaticamente. Isto está configurado assim devido a restrições de segurança na infra da prodest.

Para ativar a sincronia e deixar que o app crie as tabelas automaticamente, use a variavel de ambiente TRANSCOLDB_ORM_SYNC
```bash
export TRANSCOLDB_ORM_SYNC=true
```

## Configuração do Banco de Dados SQL-SERVER
### Produção:
Utilize as variaveis de ambiente para informar à API a configuração do banco de dados de produção:
```bash
TRANSCOLDB_HOST
TRANSCOLDB_PORT
TRANSCOLDB_USER
TRANSCOLDB_PASSWORD
TRANSCOLDB_SCHEMA
```
### Desenvolvimento
Um banco de dados SQL-SERVER para testes está disponível direto no package, utilizando DOCKER. Para levantar este banco de dados para o ambiente de testes, basta executar este comando:

```bash
npm run sqlserver
```

Ative o ORM SYNC para que o app possa criar as tabelas automaticamente
```bash
export TRANSCOLDB_ORM_SYNC=true
```

Para desligar as imagens docker, execute este outro:
```bash
npm run stopdocker
```

## Rotas
/docs - Abre o swagger e exibe todas as rotas disponíveis.  

## Description

Neste projeto estamos "re-construíndo" a API da ceturb, utilizando os dados da API da geocontrol como fonte primária de dados e um banco de dados auxiliar como apoio.  
A documentação das rotas está documentada com Swagger e se econtra disponível na rota /docs

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resumindo...
Para startar em modo teste:

```bash
npm run sqlserver
npm run redis
npm run minio
npm start
```

Dependencias:
Node 8+
Docker18+