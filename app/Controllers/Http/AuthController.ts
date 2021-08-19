import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LogInValidator from 'App/Validators/LoginValidator'
import RegisterValidator from 'App/Validators/RegisterValidator'
import User from 'App/Models/User'
import S3 from '@ioc:Services/S3'

export default class AuthController {
  /**
   * Register user with given email and password.
   *
   * @param {HttpContextContract} ctx
   * @returns
   * @memberof AuthController
   */
  public async register({ request, response, auth }: HttpContextContract) {
    try {
      const validatedData = await request.validate(RegisterValidator)

      const profileData = request.only(['firstName', 'lastName', 'mobileNumber'])

      const avatarFile = request.file('avatarUrl')

      const avatarUrl = await S3.uploadToBucket(avatarFile!, 'users')

      const user = await User.create({
        email: validatedData.email,
        password: validatedData.password,
      })

      await user.related('profile').create({
        ...profileData,
        avatarUrl: avatarUrl?.url,
      })

      await user.save()
      await user.load('profile')

      await user.refresh()

      const token = await auth.use('api').login(user)
      let tokJson = token.toJSON()

      await token.user.load('profile')
      const tokenWithUser = {
        token: tokJson,
        user: token.user.toJSON(),
      }

      if (
        !tokenWithUser.user.profile.avatarUrl.startsWith('http://') ||
        !tokenWithUser.user.profile.avatarUrl.startsWith('https://')
      ) {
        tokenWithUser.user.profile.avatarUrl = 'http://' + tokenWithUser.user.profile.avatarUrl
      }

      return response.status(200).json({
        message: 'You successfully registered.',
        data: tokenWithUser,
      })
    } catch (error) {
      console.warn(error.messages)
      console.warn(error.stack)
      return response.status(500).json({
        message: 'Something went wrong.',
        error: error,
      })
    }
  }

  /**
   * Log in
   *
   * @param {HttpContextContract} ctx
   * @returns
   * @memberof AuthController
   */
  public async login({ request, response, auth }: HttpContextContract) {
    try {
      const { email, password } = await request.validate(LogInValidator)

      try {
        if (!auth.use('api').isAuthenticated) {
          const token = await auth.use('api').attempt(email, password)
          let tokJson = token.toJSON()

          await token.user.load('profile')
          const tokenWithUser = {
            token: tokJson,
            user: token.user.toJSON(),
          }

          return response.status(200).json({
            message: 'Logging in is successful',
            data: tokenWithUser,
          })
        } else {
          return response.status(400).json({
            message: 'You already logged in.',
          })
        }
      } catch (error) {
        console.warn(error.message)
        console.warn(error.stack)
        return response.status(500).json({
          message: 'Something went wrong.',
          error: error,
        })
      }
    } catch (error) {
      console.warn(error.message)
      console.warn(error.stack)
      return response.status(400).json({
        messages: error.messages.errors,
        error: error,
      })
    }
  }

  /**
   * Log out
   *
   * @param {HttpContextContract} ctx
   * @returns
   * @memberof AuthController
   */
  public async logout({ auth, response }: HttpContextContract) {
    try {
      if (auth.use('api').isAuthenticated) {
        await auth.use('api').logout()

        return response.status(200).json({
          message: 'Logging out is successful',
        })
      } else {
        return response.status(400).json({
          message: 'You already logged out.',
        })
      }
    } catch (err) {
      console.warn(err.message)
      console.warn(err.stack)
      return response.status(500).json({
        message: 'Something went wrong!',
        error: err,
      })
    }
  }
}
