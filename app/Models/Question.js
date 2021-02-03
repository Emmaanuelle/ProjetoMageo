'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Question extends Model {
    //ranking(){
      //  return this.hasOne('App/Models/Ranking')// relacionanmento de questão com ranking
    //}
    user(){
        return this.hasOne('App/Models/User')// relacionameto de questão com o usuario

    }
   admin(){
     return this.hasOne('App/Models/Administrador')} 
}

module.exports = Question