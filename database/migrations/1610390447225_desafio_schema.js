'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DesafioSchema extends Schema {
  up () {
    this.create('desafios', (table) => {
      table.increments()
      table.string('etapa_desafio').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('desafios')
  }
}

module.exports = DesafioSchema
