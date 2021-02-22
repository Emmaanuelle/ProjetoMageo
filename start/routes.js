'use strict'

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
/* Rotas para criar, editar e atualiza do usuario estudante */
Route.get('/user', 'UserController.index').middleware('auth:admin')                           // rota de listagem dos usuarios com o /user, class usercontroller, index listagem dos dados
Route.post('/user', 'UserController.store')                              // cadastro, envio dos dados
Route.put('/user/:id','UserController.update').middleware('auth:jwt')    // editar os dados

/* rota do login usuario estudante */
Route.post('/login','UserController.login')
/* rota ver perfil do usuario estudante */
Route.get('/perfil', 'UserController.perfil').middleware('auth:jwt')
/* Rotas para criar, editar e atualiza do usuario professor */
Route.get('/admin', 'AdministradorController.index').middleware('auth:admin')                           // rota de listagem dos usuarios com o /user, class usercontroller, index listagem dos dados
Route.get('/admin/:id', 'AdministradorController.show').middleware('auth:admin')                           // rota de listagem dos usuarios com o /user, class usercontroller, index listagem dos dados
Route.post('/admin','AdministradorController.store')  // cadastro, envio dos dados
Route.put('/admin/:id','AdministradorController.update').middleware('auth:admin') 
/* rota do login usuario professor */
Route.post('/loginAdmin','AdministradorController.login')
/* rota para ver o perfil do usuario professor */
Route.get('/perfilAdmin', 'AdministradorController.perfilAdmin').middleware('auth:admin')
 /* rota para cria, edita, atualizar e deletar as questões */
Route.get('/questao', 'QuestionController.index').middleware('auth:jwt,auth:admin')
Route.post('/questao', 'QuestionController.store').middleware('auth:admin')
Route.put('/questao/:id', 'QuestionController.update').middleware('auth:admin')
Route.delete('/questao/:id', 'QuestionController.destroy').middleware('auth:admin')

/* rota para questão desafio */
Route.get("/desafio", 'QuestionController.desafio').middleware('auth:jwt,auth:admin')

/*  Rota desafio quadrado */
Route.get("/desafioQuadrado", 'FaseQuadradoController.desafio').middleware('auth:jwt,auth:admin')
/* Rota desafio Retangulo */
Route.get("/desafioRetangulo", 'FaseRetanguloController.desafio').middleware('auth:jwt,auth:admin')
/* Rota desafio Triangulo */
Route.get("/desafioTriangulo", 'FaseTrianguloController.desafio').middleware('auth:jwt,auth:admin')
/* Rota Desafio Circulo */
Route.get("/desafioCirculo", 'FaseCirculoController.desafio').middleware('auth:jwt,auth:admin')

/* rota das fase Quadrado */
Route.get("/faseQuadrado","FaseQuadradoController.index").middleware('auth:jwt,auth:admin')
/* Route.post('/faseQuadrado', 'FaseQuadradoController.store').middleware('auth:admin')
Route.put('/faseQuadrado/:id', 'FaseQuadradoController.update').middleware('auth:admin')
Route.delete('/faseQuadrado/:id', 'FaseQuadradoController.destroy').middleware('auth:admin') */

/* rota das fase Retangulo */
Route.get("/faseRetangulo","FaseRetanguloController.index").middleware('auth:jwt,auth:admin')
/* Route.post('/faseRetangulo', 'FaseRetanguloController.store').middleware('auth:admin')
Route.put('/faseRetangulo/:id', 'FaseRetanguloController.update').middleware('auth:admin')
Route.delete('/faseRetangulo/:id', 'FaseRetanguloController.destroy').middleware('auth:admin') */

/* rota das fase Triangulo */
Route.get("/faseTriangulo","FaseTrianguloController.index").middleware('auth:jwt,auth:admin')
/* Route.post('/faseTriangulo', 'FaseTrianguloController.store').middleware('auth:admin')
Route.put('/faseTriangulo/:id', 'FaseTrianguloController.update').middleware('auth:admin')
Route.delete('/faseTriangulo/:id', 'FaseTrianguloController.destroy').middleware('auth:admin')
 */
/* rota das fase Circulo */
Route.get("/faseCirculo","FaseCirculoController.index").middleware('auth:jwt,auth:admin')
/* Route.post('/faseCirculo', 'FaseCirculoController.store').middleware('auth:admin')
Route.put('/faseCirculo/:id', 'FaseCirculoController.update').middleware('auth:admin')
Route.delete('/faseCirculo/:id', 'FaseCirculoController.destroy').middleware('auth:admin')
 */



/* rota para criar, editar, atualizar o ranking */
Route.get('/ranking', 'RankingController.index').middleware('auth:jwt,auth:admin')
Route.post('/ranking', 'RankingController.store').middleware('auth:jwt')
Route.put('/ranking/:id','RankingController.update').middleware('auth:admin')
/*  */

/* Rota para esqueci a senha */
Route.post('/passwords', 'EsqueciSenhaController.store')
Route.put('/redefinirSenha/:token', 'EsqueciSenhaController.update')


/* Rota Para esqueci a senha admin */
Route.post('/passwordsAdmin', 'EsqueciSenhaAdminController.store')
Route.put('/redefinirSenhaAdmin/:token', 'EsqueciSenhaAdminController.update')
