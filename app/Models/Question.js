'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Question extends Model {
    ranking(){
        return this.hasOne('App/Models/Ranking')
    }
    user(){
        return this.hasOne('App/Models/User')
    }
}

module.exports = Question
