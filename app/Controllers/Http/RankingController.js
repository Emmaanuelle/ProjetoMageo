'use strict'

const Ranking = use('App/Models/Ranking');
const Database = use('Database');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with rankings
 */
class RankingController {
  /**
   * Show a list of all rankings.
   * GET rankings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  
    async index ({ request, response, view }) {
      //const ranking = await Ranking.all()
    /*   const ranking = await Database.select('*') */
  
    /*  */
     const ranking = await Database.raw("select users.nome,users.sobrenome,users.escola,users.ano_escolar,user_id,sum(rankings.pontos) as pontos from rankings inner join users on rankings.user_id=users.id  group By users.nome,users.sobrenome,users.escola,users.ano_escolar,user_id order By pontos desc;")
     /* select('*').from('users').sum("rankings.pontos").innerJoin('rankings',function(){
        this.on('users.id','rankings.user_id')
      }).groupBy("rankings.user_id").orderBy('rankings.pontos', 'desc') */
          return ranking 
         
      }
  
  

  /**
   * Render a form to be used for creating a new ranking.
   * GET rankings/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new ranking.
   * POST rankings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only([
      "pontos",
      "user_id",
      //"questoes_id",
    

  ])
  const ranking = await Ranking.create(data)
  return ranking
  
}
  

  /**
   * Display a single ranking.
   * GET rankings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing ranking.
   * GET rankings/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update ranking details.
   * PUT or PATCH rankings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ request, response, params  }) {
    const ranking = await Ranking.findOrFail(params.id) // editar os dados
        const data = request.only([                   // pegar os dados para editar
          "pontos",
          "user_id",
          //"questoes_id",

        ])

        ranking.merge(data)   //compara os dados que foram editados
        await ranking.save()  // salvando os dados editados
        return ranking        // retornando os dados editados

    
  }

  /**
   * Delete a ranking with id.
   * DELETE rankings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

  }

}
module.exports = RankingController
