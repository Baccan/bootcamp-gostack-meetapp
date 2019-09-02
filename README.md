# Aplicação Meetapp para o desafio final do Bootcamp Gostack

Os detalhes para a conclusão do desafio podem ser encontrados nos seguintes repositórios: 

- [Iniciando aplicação - NodeJs](https://github.com/Rocketseat/bootcamp-gostack-desafio-02/blob/master/README.md#desafio-02-iniciando-aplica%C3%A7%C3%A3o)
- [Continuando aplicação - NodeJs](https://github.com/Rocketseat/bootcamp-gostack-desafio-03/blob/master/README.md#desafio-03-continuando-aplica%C3%A7%C3%A3o)
- [Front-end do Meetapp - ReactJs](https://github.com/Rocketseat/bootcamp-gostack-desafio-09#desafio-09-front-end-do-meetapp)
- [Mobile do Meetapp - ReactNative](https://github.com/Rocketseat/bootcamp-gostack-desafio-10#desafio-10-mobile-do-meetapp)

“Sua única limitação é você mesmo”!

# :information_source: Como utilizar

## Clone o repositório

```bash
$ git clone https://github.com/Baccan/bootcamp-gostack-meetapp.git
```

## Instalação de pacotes

Nas pastas [frontend](https://github.com/Baccan/bootcamp-gostack-meetapp/tree/master/frontend), 
[meetappMobile](https://github.com/Baccan/bootcamp-gostack-meetapp/tree/master/meetappMobile) e
[server](https://github.com/Baccan/bootcamp-gostack-meetapp/tree/master/server) execute o seguinte comando para instalar as dependências:

```bash
$ yarn
```

## Variáveis ambiente

Antes de iniciar a aplicação, configure as variáveis ambiente do [server](https://github.com/Baccan/bootcamp-gostack-meetapp/blob/master/server/.env.example).

Em seguida, altere a [baseURL](https://github.com/Baccan/bootcamp-gostack-meetapp/blob/master/meetappMobile/src/services/api.js) do arquivo `api.js` com a url para acessar ao servidor previamente configurado.

## Iniciando aplicação

Na pasta `server` execute:

```bash
$ yarn sequelize db:migrate
$ yarn dev
$ yarn queue
```

Na pasta `frontend`

```bash
$ yarn start
```

Na pasta `meetappMobile`

```bash
# Em caso de Android
$ react-native run-android
$ react-native start --reset-cache

# Em caso de iOS
$ react-native run-ios

# Em seguida para Android e iOS
$ react-native start
```
