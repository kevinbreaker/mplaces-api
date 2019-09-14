'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with ratings
 */

const Rating = use('App/Models/Rating')

class RatingController {
  /**
   * Show a list of all ratings.
   * GET ratings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const ratings = await Rating.query()
      .with('user', builder => builder.select(['id', 'name', 'email']))
      .fetch()
    return ratings
  }

  /**
   * Render a form to be used for creating a new rating.
   * GET ratings/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /**
   * Create/save a new rating.
   * POST ratings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, response }) {
    const data = request.only(['comment', 'rating', 'placeId'])

    const rating = await Rating.findOrCreate(
      { user_id: auth.user.id, placeId: data.placeId },
      { user_id: auth.user.id, ...data }
    )
    return rating
  }

  /**
   * Display a single rating.
   * GET ratings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    // const rating = await Rating.findByOrFail('placeId', params.id)
    const rating = await Rating.query()
      .with('user', builder => builder.select(['id', 'name', 'email']))
      .where({ placeId: params.id })
      .fetch()

    return rating
  }

  /**
   * Update rating details.
   * PUT or PATCH ratings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, auth, request, response }) {
    const data = await request.only(['comment', 'rating'])
    const id = auth.user.id
    const place = params.id

    const rating = await Rating.findBy({
      user_id: id,
      placeId: place
    })

    rating.merge({ ...data })
    await rating.save()

    return rating
  }

  /**
   * Delete a rating with id.
   * DELETE ratings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    const rating = await Rating.findByOrFail({
      user_id: auth.user.id,
      placeId: params.id
    })

    if (rating.user_id !== auth.user.id) {
      return response.status(401)
    }
    await rating.delete()

    return 'Deletado com sucesso'
  }
}

module.exports = RatingController
