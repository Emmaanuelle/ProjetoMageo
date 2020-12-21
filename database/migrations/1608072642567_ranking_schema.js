'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RankingSchema extends Schema {
  up () {
    this.create('ranking', (table) => {
      table.increments()
      table.integer('pontos').notNullable()
      table.integer('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE') //chave estrageira
      table.integer('questoes_id').references('id').inTable('questoes').onUpdate('CASCADE').onDelete('CASCADE') // chave estrageira

      table.timestamps()
    })
  }

  down () {
    this.drop('ranking')
  }
}

module.exports = RankingSchema
