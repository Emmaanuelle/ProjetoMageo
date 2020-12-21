'use strict'


const Questao = use('App/Models/Questao');
const Database = use('Database');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with questaos
 */
class QuestaoController {
  /**
   * Show a list of all questaos.
   * GET questaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const questao = await Questao.all()
    return questao
}

  

  /**
   * Render a form to be used for creating a new questao.
   * GET questaos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new questao.
   * POST questaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only([
      "pergunta",
      "resposta",
      "dica",
      "tipo",
      "dificuldade_nivel",


  ])
  const questao = await Questao.create(data)
  return questao
  


  }

  /**
   * Display a single questao.
   * GET questaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing questao.
   * GET questaos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update questao details.
   * PUT or PATCH questaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {

    const questao = await Questao.findOrFail(params.id) // editar os dados
    const data = request.only([                   // pegar os dados para editar
      "pergunta",
      "resposta",
      "dica",
      "tipo",
      "dificuldade_nivel",

    ])

    questao.merge(data)   //compara os dados que foram editados
    await questao.save()  // salvando os dados editados
    return questao        // retornando os dados editados




  }

  /**
   * Delete a questao with id.
   * DELETE questaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = QuestaoController
