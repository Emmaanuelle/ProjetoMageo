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
Route.get('/user', 'UserController.index').middleware('auth:jwt')                           // rota de listagem dos usuarios com o /user, class usercontroller, index listagem dos dados
Route.post('/user', 'UserController.store')                              // cadastro, envio dos dados
Route.put('/user','UserController.update').middleware('auth:jwt')    // editar os dados

Route.get('/questao', 'QuestionController.index').middleware('auth:jwt')
Route.post('/questao', 'QuestionController.store').middleware('auth:jwt')
Route.put('/questao/:id', 'QuestionController.update').middleware('auth:jwt')

Route.get('/ranking', 'RankingController.index').middleware('auth:jwt')
Route.post('/ranking', 'RankingController.store').middleware('auth:jwt')
Route.put('/ranking/:id','RankingController.update').middleware('auth:jwt')

Route.get('/perfil', 'UserController.perfil').middleware('auth:jwt')


Route.post('/login','UserController.login')
