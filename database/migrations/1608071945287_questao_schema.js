'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestaoSchema extends Schema {
  up () {
    this.create('questoes', (table) => {
      table.increments()
      table.string('pergunta').notNullable()
      table.string('resposta').notNullable() 
      table.string('dica').notNullable() 
      table.string('tipo').notNullable() 
      table.string('dificuldade_nivel').notNullable() 
    
      table.timestamps()
     
    })
  }

  down () {
    this.drop('questoes') 
  }
}

module.exports = QuestaoSchema
