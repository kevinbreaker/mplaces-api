'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RatingsSchema extends Schema {
  up() {
    this.create('ratings', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('comment', 400), table.string('placeId', 255).notNullable();
      table.integer('rating', 5).defaultTo(0);
      table.timestamps();
    });
  }

  down() {
    this.drop('ratings');
  }
}

module.exports = RatingsSchema;
