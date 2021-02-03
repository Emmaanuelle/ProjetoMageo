'use strict'
const Questao = use('App/Models/Question');

class QuestionController {
    async index({ request, response, view }) {
        const questao = await Questao.all()
        return questao
    }
    async store({ request, response }) {
        const data = request.only([
            "pergunta",
            "video",
            "alternativa",
            "resposta",
            "dica",
            "fase",
            "nivel",
            "administradors_id"

           
        ])
        const questao = await Questao.create(data)
        return questao
    }
    async update({ params, request, response }) {

        const questao = await Questao.findOrFail(params.id) // editar os dados
        const data = request.only([                   // pegar os dados para editar
          "pergunta",
          "video",
          "alternativa",
          "resposta",
          "dica",
          "fase",
          "nivel",
          "administradors_id"

        
         
    
        ])
    
        questao.merge(data)   //compara os dados que foram editados
        await questao.save()  // salvando os dados editados
        return questao        // retornando os dados editados
      }
      async destroy ({ params, auth, response }) {
        const questao = await Questao.findOrFail(params.id)
      
        if (questao.adm_id !== auth.admin.id) {
          return response.status(401).send({ error: 'Not authorized' })
        }
      
        await questao.delete()
      }
}

module.exports = QuestionController
