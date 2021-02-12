'use strict'
const Questao = use('App/Models/Question');
const Database = use("Database")

class FaseQuadradoController {
    async index({ request, response, view }) {
  
        const faseQuadrado = await Database.from("questions").where(function () {
          this
          .where('fase',"quadrado")
           
          
        })


        return faseQuadrado;
       
    }
    async desafio({ request, response, view }){
      const questao = await Database.from("questions").where(function () {
        this
        .where('nivel',"desafio")
        .andWhere('fase','quadrado')
         
      })
      return questao;
    }
  
}

module.exports = FaseQuadradoController