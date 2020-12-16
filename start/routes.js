'use strict'

const { route } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.git

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.get('/user', 'UserController.index') // rota de listagem dos usuarios com o /user, class usercontroller, index listagem dos dados
Route.post('/user', 'UserController.store') // cadastro, envio dos dados
Route.put('/user/:id','UserController.update') // editar os dados

Route.get('/questao', 'QuestaoController.index')
Route.post('/questao', 'QuestaoController.store')

Route.get('/ranking', 'RankingController.index')
Route.post('/ranking', 'RankingController.store')
