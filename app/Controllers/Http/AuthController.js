'use strict'

const User = use('App/Models/User')

class AuthController {
  async register({ request }) {
    const data = request.only(['name', 'email', 'password'])
    return await User.create(data)
  }

  async authenticate({ request, auth, response }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email.trim(), password.trim())
    if (token) {
      const user = await User.findBy({ email })
      const accessToken = await auth.generate(user)
      return response.json({
        user: { name: user.name, email: user.email, picture: user.picture },
        token: accessToken.token
      })
    }
  }
}

module.exports = AuthController
