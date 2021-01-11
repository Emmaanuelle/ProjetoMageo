'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Emblema extends Model {

    desafio(){
        return this.belongsToMany('App/Models/Desafio')
    }
}

module.exports = Emblema
