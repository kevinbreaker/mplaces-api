'use strict';

const User = use('App/Models/User');

class AuthController {
  async register({ request }) {
    const data = request.only(['name', 'email', 'password']);
    return await User.create(data);
  }

  async authenticate({ request, auth }) {
    const { email, password } = request.all();

    return await auth.attempt(email.trim(), password.trim());
  }
}

module.exports = AuthController;
