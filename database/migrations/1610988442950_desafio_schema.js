'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DesafioSchema extends Schema {
  up () {
    this.create('desafios', (table) => {
      table.increments()
      table.string('etapa_desafio').notNullable()
     /*  table.integer('questions_id').references('id').inTable('questions').onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('emblemas_id').references('id').inTable('emblemas').onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('rankings_id').references('id').inTable('rankings').onUpdate('CASCADE').onDelete('CASCADE')
 */
      table.timestamps()
    })
  }

  down () {
    this.drop('desafios')
  }
}

module.exports = DesafioSchema
