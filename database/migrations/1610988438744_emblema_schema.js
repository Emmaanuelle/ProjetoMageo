'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmblemaSchema extends Schema {
  up () {
    this.create('emblemas', (table) => {
      table.increments()
      table.string('nome_emblema').notNullable()
      table.string('fase_emblema').notNullable()
      table.string('etapa_desafio').notNullable()
      table.integer('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE') //chave estrageira
      table.timestamps()
    })
  }

  down () {
    this.drop('emblemas')
  }
}

module.exports = EmblemaSchema
