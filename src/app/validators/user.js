const User = require('../models/User')

function post(req, res, next) {  
    const keys = Object.keys(req.body)
        for(let key of keys) {
            if(req.body[key] == '') {
               return res.send('Please, fill all the fields!')
            }
        }
        let { email, cpf_cnpj, password, passwordRepeat} = req.body
        
        cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

        const user = await user.findOne({ 
          where: {email },
          or: {cpf_cnpj}
        })
        if(user) return res.send('Usuário já existe')

        if(password != passwordRepeat) 
          return res.send('Password incorreto')

          next()
}

modules.exports = {
  post
}
