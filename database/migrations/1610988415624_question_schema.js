'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionSchema extends Schema {
  up () {
    this.create('questions', (table) => {
      table.increments()
      table.text('pergunta').notNullable()
      table.text('video')
      table.text('alternativa').notNullable()
      table.string('resposta').notNullable() 
      table.string('dica').notNullable()
      table.string('nivel') 
      table.string('fase').notNullable()
      table.integer('administradors_id').references('id').inTable('administradors').onUpdate('CASCADE').onDelete('CASCADE')
      
      table.timestamps()
    })
  }

  down () {
    this.drop('questions')
  }
}

module.exports = QuestionSchema
