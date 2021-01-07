'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ranking extends Model {
    user() {
        return this.belongsTo('App/Models/User')
    }
    questao() {
        return this.belongsTo('App/Models/Question')
    }
}

module.exports = Ranking
