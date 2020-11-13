const User = require('../models/User')
const { formatCep, formatCpfCnpj} = require('../../lib/utils')

module.exports = {
  registerForm(req, res) {
    return res.render("users/register")
  },
  async show (req,res) {
    const { user } = req.session

    user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
    user.cep = formatCpfCnpj(user.cep)

    return res.render("users/index", { user })
  },
  async post(req, res) {
    const userId = await User.create(req.body)

    req.session.userId = userId

    return res.redirect("/users")      
  },
  async update(req, res) {
    
  }
}