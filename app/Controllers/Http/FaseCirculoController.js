'use strict'
const Questao = use('App/Models/Question');
const Database = use("Database")

class FaseCirculoController {
    async index({ request, response, view }) {
  
        const faseCirculo = await Database.from("questions").where(function () {
          this
            .where('fase',"circulo")
            
        })


        return faseCirculo;
       
    }
    async desafio({ request, response, view }){
      const questao = await Database.from("questions").where(function () {
        this
          .where('nivel',"desafio")
          .andWhere('fase','circulo')
         
      })
      return questao;
    }
  
}
module.exports = FaseCirculoController