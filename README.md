# Node-JS-Socket-A4-E6

## Prérequis

- node 18.0
- npm ^8.5.0

## Démarrer le projet

A la racine du projet :

- npm i
- npm start

##DB

We use a postgreSQL database by heroku service.

To launch the project and enable database connection you should use this command line :
- Mac :
```
DATABASE_URL=$(heroku config:get DATABASE_URL -a node-js-iim-a4-dw2-stark-dev) node app.js
```
- Windows :
```
$env:DATABASE_URL=$(heroku config:get DATABASE_URL -a node-js-iim-a4-dw2-stark-dev)
npm start
```


We use an ORM to interact with our DB : Prisma. If we need to do some changes in our DB, migrations, updates, new tables, etc.. We need to use this command:
- Mac :
```
DATABASE_URL=$(heroku config:get DATABASE_URL -a node-js-iim-a4-dw2-stark-dev) npx prisma db push --preview-feature
```
- Windows :
```
$env:DATABASE_URL=$(heroku config:get DATABASE_URL -a node-js-iim-a4-dw2-stark-dev)
npx prisma db push --preview-feature
```