const User = require('../models/User')

async function post(req, res, next) {  
    const keys = Object.keys(req.body)
        for(let key of keys) {
            if(req.body[key] == '') {
               return res.send('Please, fill all the fields!')
            }
        }
        //check if users exists [email,cpf_cnpj]
        let { email, cpf_cnpj, password, passwordRepeat } = req.body;

        cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

        const user = await User.findOne({
          where: { email },
          or: { cpf_cnpj },
        })
        if(user) return res.render('user/register', {
          error: 'Usuário já cadastrado'
        })
         //check if password match
        if(password != passwordRepeat) 
          return res.send('Password incorreto')

        next()
}

module.exports = {
  post
}
