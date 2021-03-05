const User = require('../models/User')
const { formatCep, formatCpfCnpj } = require('../../lib/utils')

module.exports = {
  registerForm(req, res) {
    return res.render("users/register")
},
  async show (req, res) {  
    try{
    const { user } = req

    user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
    user.cep = formatCep(user.cep)

    return res.render("users/index", { user })
    
  } catch (err) {
    console.error(err)
  }
},
  async post(req, res) {
    const userId = await User.create(req.body)

    req.session.userId = userId

    return res.redirect("/users")      
},
  async update(req, res) {
    try{
      const { user } = req
      let { name, email, cpf_cnpj, cep, address } = req.body

      cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
      cep = cep.replace(/\D/g, "")

      await User.update(user.id, {
        name,
        email,
        cpf_cnpj,
        cep,
        address
      })

      return res.render("users/index", {
        user: req.body,
        success: "Conta Atualizada com sucesso!"
      })

    }catch (err) {
      console.error(err)
      return res.render("users/index", {
        user: req.body,
        error: "Algum erro aconteceu!"
        
      })
    }
},
  async delete(req, res) {
  try {
    await User.delete(req.body.id)
    req.session.destroy()
    return res.render("session/login", {
      success: "Conta deletada com sucesso"
    })

  }catch(err) {
    console.error(err)
    return res.render("users/index", {
      user: req.body,
      error: "Erro ao tentar deletar sua conta"
    })
  }
 }
}