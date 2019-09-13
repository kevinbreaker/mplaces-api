'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with favorites
 */

const Favorite = use('App/Models/Favorite');
class FavoriteController {
  /**
   * Show a list of all favorites.
   * GET favorites
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, auth, view }) {
    console.log('Ind');
    const favorites = await Favorite.query().with('user', builder =>
      builder.select(['id', 'name', 'email'])
    );

    console.log('@ -> ', auth);
    console.log(favorites);
    if (favorites.user_id !== auth.user.id) {
      return response.status(401);
    }

    return favorites;
  }

  /**
   * Render a form to be used for creating a new favorite.
   * GET favorites/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new favorite.
   * POST favorites
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, response }) {
    const data = request.only(['placeId', 'placeName', 'placeIcon']);
    const exist = await Favorite.query()
      .where('placeId', data.placeId)
      .fetch();

    if (exist) {
      return 'Já existe';
    }
    const favorite = await Favorite.create({ user_id: auth.user.id, ...data });

    return favorite;
  }

  /**
   * Display a single favorite.
   * GET favorites/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing favorite.
   * GET favorites/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update favorite details.
   * PUT or PATCH favorites/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a favorite with id.
   * DELETE favorites/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = FavoriteController;
