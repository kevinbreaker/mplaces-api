'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AvaliationsSchema extends Schema {
  up () {
    this.create('avaliations', (table) => {
      table.increments()
      table
        .string('user_email')
        .unsigned()
        .notNullable()
        .references('email')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('comment', 400),
      table.string('placeId', 255).notNullable()
      table.integer('rating', 5).defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('avaliations')
  }
}

module.exports = AvaliationsSchema
