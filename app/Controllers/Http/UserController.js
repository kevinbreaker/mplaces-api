'use strict'

const User = use('App/Models/User')

class UserController {
  async index({ request, auth, view }) {
    const user = await User.query()
      .where({ id: auth.user.id, email: auth.user.email })
      .fetch()

    return user
  }
  async update({ auth, request, response }) {
    const data = await request.only(['name', 'password', 'picture'])
    console.log('Data == ', data)
    const { id, email } = auth.user
    console.log('USERR ', id, email)

    const user = await User.findByOrFail({
      id,
      email
    })

    user.merge({ ...data })
    await user.save()

    return user
  }
}

module.exports = UserController
