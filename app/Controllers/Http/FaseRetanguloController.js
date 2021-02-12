'use strict'
const Questao = use('App/Models/Question');
const Database = use("Database")

class FaseRetanguloController {
    async index({ request, response, view }) {
  
        const faseRetangulo = await Database.from("questions").where(function () {
          this
          .where('fase',"retangulo")
           
          
        });


        return faseRetangulo;
       
    }
    async desafio({ request, response, view }){
      const questao = await Database.from("questions").where(function () {
        this
      
          .where('nivel',"desafio")
          .andWhere('fase','retangulo')
         
         
      });
      return questao;
    }
  
}
module.exports = FaseRetanguloController