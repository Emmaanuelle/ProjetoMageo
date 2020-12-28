'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionSchema extends Schema {
  up () {
    this.create('questions', (table) => {
      table.increments()
      table.string('pergunta').notNullable()
      table.string('imagem').notNullable()
      table.string('video').notNullable()
      table.string('Alternativas').notNullable()
      table.string('resposta').notNullable() 
      table.string('dica').notNullable() 
      
    
      table.timestamps()
    })
  }

  down () {
    this.drop('questions')
  }
}

module.exports = QuestionSchema
