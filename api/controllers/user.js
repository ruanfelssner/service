

const { User, UserLogin } = require('../models/User')
const { loginUser, getUserByGoogleAuthentication, getGoogleUserByGoogleAuthentication } = require('../commons/utils/users')
const { ErrorsGoogleLogin } = require('../commons/enums/ErrorsGoogle')


module.exports = (app) => {
  const controller = {
  }

  controller.register = async (req, res) => {

    const { googleToken, name, email, password } = req.body

    if (googleToken) {

      const user = await getUserByGoogleAuthentication(googleToken)

      if (user) {
        return res.status(400).json({
          message: 'User already exists',
        })
      }

      const googleUser = await getGoogleUserByGoogleAuthentication(googleToken)


      const newUser = new User({
        name: googleUser.name,
        email: googleUser.email,
        googleId: googleUser.sub
      })
      
      try {
        await newUser.save()
        const resp = await loginUser(newUser._id, req)
        return res.status(201).json(resp)
      } catch (error) {
        return res.status(500).json({message: error.message})
      }

    } else {

      if(!name || !email || !password) {
        return res.status(400).json({
          message: 'Missing fields',
        })
      }

      const user = await User.findOne({ email })

      if (user) {
        return res.status(400).json({
          message: 'User already exists',
        })
      }

      const newUser = new User({
        name,
        email,
        password: password ? password : null
      }); 

      try {

        await newUser.save()        
        const resp = await loginUser(newUser._id, req)
        res.status(201).json(resp)

      } catch (error) {

        res.status(500).json({
          message: error.message,
        })

      }
    }
  }

  controller.login = async (req, res) => {
    if(!req.body.email && !req.body.cpf && !req.body.googleToken) {
      return res.status(400).json({
        message: 'Missing fields',
      })
    }
    if(req.body.email){
      const user = await User.findOne({email: req.body.email})
      if(!user) {
        return res.status(400).json({
          message: 'User not found',
        })
      }
      const resp = await loginUser(user._id, req)
      return res.status(200).json(resp)
    }
    if(req.body.cpf){
      const user = await User.findOne({cpf: req.body.cpf})
      if(!user) {
        return res.status(400).json({
          message: 'User not found',
        })
      }
      const resp = await loginUser(user._id, req)
      return res.status(200).json(resp)
    }
    if(req.body.googleToken){
      try{
        const user = await getUserByGoogleAuthentication(req.body.googleToken)
        if(!user) {
          return res.status(400).json({
            message: 'User not found',
          })
        }
        const resp = await loginUser(user._id, req)
        return res.status(200).json(resp)
      }
      catch(err){
        return res.status(400).json({
          message: ErrorsGoogleLogin(err),
        })
      }
    }
  }

  return controller
}
