'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with avaliations
 */

const Avaliation = use('App/Models/Avaliation')

class AvaliationController {
  /**
   * Show a list of all avaliations.
   * GET avaliations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const avaliations = await Avaliation.all()
    return avaliations
  }

  /**
   * Render a form to be used for creating a new avaliation.
   * GET avaliations/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new avaliation.
   * POST avaliations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response }) {
    const data = request.only(['comment', 'rating', 'placeId', 'placeName'])
    const avaliation = await Avaliation.create({ user_id: auth.user.email, ...data })

    return avaliation
  }

  /**
   * Display a single avaliation.
   * GET avaliations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const avaliation = await Avaliation,findOrFail(params.id)
    return avaliation
  }

  /**
   * Render a form to update an existing avaliation.
   * GET avaliations/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update avaliation details.
   * PUT or PATCH avaliations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a avaliation with id.
   * DELETE avaliations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = AvaliationController
