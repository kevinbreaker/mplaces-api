'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with favorites
 */

const Favorite = use('App/Models/Favorite')
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
    const favorites = await Favorite.query()
      .where({ user_id: auth.user.id })
      .fetch()

    return favorites
  }

  /**
   * Create/save a new favorite.
   * POST favorites
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, response }) {
    const data = request.only(['placeId', 'placeName', 'placeIcon'])
    const favorite = await Favorite.findOrCreate(
      { placeId: data.placeId },
      { user_id: auth.user.id, ...data }
    )
    return favorite
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
   * Update favorite details.
   * PUT or PATCH favorites/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, auth, request, response }) {
    const data = await request.only(['placeName', 'placeIcon'])
    const id = auth.user.id
    const place = params.id

    const favorite = await Favorite.findByOrFail({
      user_id: id,
      placeId: place
    })

    favorite.merge({ ...data })
    await favorite.save()

    return favorite
  }

  /**
   * Delete a favorite with id.
   * DELETE favorites/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, request, response }) {
    const favorite = await Favorite.findByOrFail({
      user_id: auth.user.id,
      placeId: params.id
    })

    if (favorite.user_id !== auth.user.id) {
      return response.status(401)
    }
    await favorite.delete()

    return 'Deletado com sucesso'
  }
}

module.exports = FavoriteController
