'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmblemaSchema extends Schema {
  up () {
    this.create('emblemas', (table) => {
      table.increments()
      table.string('nome_emblema').notNullable()
      table.string('fase_emblema').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('emblemas')
  }
}

module.exports = EmblemaSchema
