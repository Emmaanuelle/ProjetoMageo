'use strict'
const Questao = use('App/Models/Question');
const Database = use("Database")

class FaseCirculoController {
    async index({ request, response, view }) {
  
        const faseCirculo = await Database.from("questions").where(function () {
          this
            .where('fase',"circulo")
            .whereNot('nivel','desafio')
            
        })


        return faseCirculo;
       
      /*  const data = await Database
  .raw('Select * from questions where fase = "circulo" and (nivel = "facil" or nivel = "medio" or nivel = "dificil"');
   return data */
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