'use strict'

const Admin = use('App/Models/Administrador');
// Validador de Senha
var passwordValidator = require('password-validator');
var schema = new passwordValidator();
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with admins
 */
class AdministradorController {
  /**
   * Show a list of all admins.
   * GET admins
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new admin.
   * GET admins/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new admin.
   * POST admins
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {

      const data = request.only([            // requisitando apenas os dados abaixo
        'nome_administrador',
        'sobrenome_administrador',
        "email",
        "senha",

      ])
      // Procurando no banco de dados
      const userExists = await Admin.findBy('email', data.email)

      // se o usuário não existe, não salva
      if (userExists) {
        return response
          .status(400)
          .send({ message: { error: 'Email Cadastrado' } })
      }
      //Verifica se o nome contem números
      if (/\d/.test(data.nome_administrador)) {
        return response
          .status(400)
          .send({ message: { error: 'Nome não pode conter números' } })
      }



      schema
        .is().min(8)                                    // a senha deve ter no minimo 8 caracteres
        .is().max(100)                                  // a senha deve ter no minimo 100 caracteres 
        .has().uppercase([1])                           // pelo menos 1 letar maiuscula
        .has().lowercase()                              // pelo menos 1 letra minuscula
        .has().digits(2)                                // pelo menos 2 digitos
        .has().symbols([1])	                            // pelo mesnos um caracter especial
        .has().not().spaces()                           // Snão pode conter espaço
        .is().not().oneOf(['Passw0rd', 'Password123', '12345', 'senha']); // senhas proibidas de serem colocadas
      if (!schema.validate(data.senha)) { // validando a senha
        return response
          .status(400)
          .send({ message: { error: 'Senha Fraca, deve ter no mínimo 8 caracteres tem que ter no mínimo 1 letra Maiuscula, Dois Digitos, Sem espaço, 1 caracter especial' } })
      }

      const user = await Admin.create(data)     //criando os dados que estão atribuidos na variavel data
      return user                              // retornando os dados criados
    } catch (erro) {
      return response
        .status(erro.status)
        .send(erro)
    }
  }

  /**
   * Display a single admin.
   * GET admins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing admin.
   * GET admins/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update admin details.
   * PUT or PATCH admins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a admin with id.
   * DELETE admins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
  async login({ request, auth, response }) {
        
    const { email, senha } = request.all();
     // Procurando no banco de dados
     const userExists = await Admin.findBy('email', email)

     // se o usuário não existe, não salva
     if (!userExists) {
         return response
             .status(400)
             .send({ message: { error: 'Email Não Cadastrado' } })
     }
     const adminAuth = auth.authenticator("admin");
      const token = await adminAuth.attempt(email, senha);
    return token;

}
}

module.exports = AdministradorController
