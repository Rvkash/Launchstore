const User = require('../models/User')

module.exports = {
  registerForm(req, res) {
    return res.render("users/register")
  },
  async post(req,res) {
    const keys = Object.keys(req.body)

        for(let key of keys) {
            if(req.body[key] == '') {
               return res.send('Please, fill all the fields!')
            }
        }
        let { email, cpf_cnpj, password, passwordRepeat} = req.body
        
        const user = await user.findOne({ 
          where: {email },
          or: {cpf_cnpj}
        })
        if(user) return res.send('Usuário já existe')

        if(password != passwordRepeat) 
          return res.send('Password incorreto')

        return res.send('Correto!')
     }
  }