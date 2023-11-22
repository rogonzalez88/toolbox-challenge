# Toolbox - Challenge

# Pre-requisitos
    - [NVM](https://github.com/nvm-sh/nvm/blob/master/README.md)
    - [Docker](https://docs.docker.com/engine/install/)

# API
La api fue realizada con las librerias minimas, la idea es poder demostrar los skills en el lenguaje sin usar librerias.

## Librerias utilizadas:
    - [Express](https://expressjs.com/)
    - [Mocha](https://mochajs.org/)
    - [Chai](https://www.chaijs.com/)
    - [Chai-http](https://www.chaijs.com/plugins/chai-http/)
    
## Descripción
La api es una api bastante simple, que list, filtra datos de una api externa, Los metodos disponible son:
    - /files/list
    - /files/data (este acepta como querystring el parametro fileName para filtrar)
        
        
## Ejecución
Se debera de contar con Node14, como pre-requisitos solicitamos NVM para un correcto funcionamiento y desde el folder denominado api, se debera ejecutar lo siguientes comandos:

### Instalar y usar version de Node 14
```bash
nvm install 14 && nvm use 14
```
### Instalar dependencias
```bash
npm install
```
### Pruebas
```bash
npm test
```
### Despligue
```bash
npm start
```
La api esta expuesta por default en el puerto 8080, por lo que se podra acceder usando: http://localhost:8080

## Uso

### Obtener toda la data de files:
```bash
curl --location 'http://localhost:8080/files/data'
```

### Obtener toda la data de files filtrada por fileName
```bash
curl --location 'http://localhost:8080/files/data?fileName=test2.csv'
```

### Obtener todos los files disponibles
```bash
curl --location 'http://localhost:8080/files/list'
```

# FRONT
El front fue realizado con una pagina bastante simple, para mostrar lo obtenido de la api

## Librerias utilizadas:
    - [React](https://reactjs.org/)
    - [React Bootstrap](https://react-bootstrap.github.io/)
    - [Webpack](https://webpack.js.org/)
    - [React-Redux](https://react-redux.js.org/)
    - [Jest](https://jestjs.io/)
    - [@reduxjs/toolkit](https://redux-toolkit.js.org/)
    - [axios](https://axios-http.com/docs/intro)

## Ejecución
Se debera de contar con Node16, como pre-requisitos solicitamos NVM para un correcto funcionamiento y desde el folder denominado front, se debera ejecutar lo siguientes comandos:

### Instalar y usar version de Node 14
```bash
nvm install 16 && nvm use 16
```
### Instalar dependencias
```bash
npm install
```
### Pruebas
```bash
npm test
```
### Despligue
```bash
npm start
```
La app esta expuesta por default en el puerto 3000, por lo que se podra acceder usando: http://localhost:3000

# Docker

Tambien se realizo la configuracion simple de un docker y se puede ejecutar con un docker-compose up desde del folder root del proyecto

```bash
docker-compose up
```
