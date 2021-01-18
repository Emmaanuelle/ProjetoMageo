'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdministradorSchema extends Schema {
  up () {
    this.create('administradors', (table) => {
      table.increments()
      table.string('nome_administrador').notNullable()
      table.string('sobrenome_administrador').notNullable()
      table.string('email').notNullable()
      table.string('senha').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('administradors')
  }
}

module.exports = AdministradorSchema
