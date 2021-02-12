'use strict'
const Questao = use('App/Models/Question');
const Database = use("Database")

class FaseTrianguloController {
    async index({ request, response, view }) {
  
        const questao = await Database.from("questions").where(function () {
          this
          .where('fase',"triangulo")
            
        })
        return questao;
       
    }
    async desafio({ request, response, view }){
      const questao = await Database.from("questions").where(function () {
        this
        .where('fase','triangulo')
        .andWhere('nivel','desafio')
       
      })
      return questao;
    }
    
}
module.exports = FaseTrianguloController 