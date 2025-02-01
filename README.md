## gRPC + NestJS
Este projeto demonstra a implementação de gRPC no NestJS, cobrindo tanto o cliente quanto o servidor.
Foram implementadas duas funções Unary e uma stream bidirecional, mas o gRPC também permite streams unilaterais.

## O que é gRPC
gRPC é um framework open-source para comunicação entre serviços, utilizando Protocol Buffers (ProtoBuf) para serialização de dados e baseado em HTTP/2.
Principais vantagens:
- Alto desempenho (HTTP 2 + serialização binária)
- Tipagem forte com ProtoBuf
- Comunicação eficiente entre serviçoes
- Suporte a streaming bidirecional

## Instalação
```bash
$ npm install
```

## Para rodar o App

Iniciar o cliente
```bash
$ npm run start:dev client-side
```

Iniciar o servidor
```bash
$ npm run start:dev server-side
```
