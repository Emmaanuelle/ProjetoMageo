'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Desafio extends Model {

    emblema(){
        return this.hasMany('App/Models/Emblema')
    }
}

module.exports = Desafio
