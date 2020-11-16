const User = require('../models/User')
const { compare } = require('bcryptjs')

function checkAllFields(body) {
  const keys = Object.keys(body)

  for (key of keys) {
    if (body[key] == "") {
      return {
        user: body,
        error: 'Preencha todos campos'
      }
    }
  }
}
async function show(req, res, next) {
  const { userId: id } = req.session

  const user = await User.findOne({ where: {id} })

  if (!user) return res.render("users/register", {
    error: 'Usuário não encontrado'
  })

  req.user = user 
  
  next()
}
 async function post(req, res, next)  {
  const fillAllFields = checkAllFields(req.body) 
  if(fillAllFields) {
    return res.render("users/register", fillAllFields)
  }

  let { email, cpf_cnpj, password, passwordRepeat } = req.body 

  cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

  const user = await User.findOne({
    where: { email },
    or: { cpf_cnpj }
  })
  if (user) return res.render('users/register', {
    user: req.body,
    error: 'Usuário já cadastrado'
  })
  if (password != passwordRepeat) return res.render('users/register', {
    user: req.body,
    error: 'A senha e repetição estão incorretas'
  })
    next()
}
async function update(req, res, next) {
  const fillAllFields = checkAllFields(req.body) 
  if(fillAllFields) {
    return res.render("users/register", fillAllFields)
  }

  const { id, password} = req.body
  if(!password) return res.render("users/index", {
    user: req.body,
    error:"Coloque sua senha"
  })
  const user = await User.findOne({ where: {id}})
  const passed = await compare(password, user.password)
  if(!passed) return res.render("users/index", {
    user: req.body,
    error: "Senha incorreta"
  })
  req.user = user

  next()
}

module.exports = {
  post,
  show,
  update
}