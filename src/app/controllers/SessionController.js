const crypto = require('crypto')
const mailer = require('../../lib/mailer')
const User = require('../models/User')
const { hash } = require('bcryptjs')

module.exports = {
  loginForm(req, res) {
    return res.render("session/login")
  },
  login(req, res) {
    req.session.userId = req.user.id

    return res.redirect("/users")
  },
  logout(req, res) {
    req.session.destroy()
      return res.redirect("/")
  },
  forgotForm(req, res) {
    return res.render("session/forgot-password")
  },
  async forgot(req, res) {
    const user = req.user

    try {

    const token = crypto.randomBytes(20).toString("hex")

    let now = new Date()
    now = now.setHours(now.getHours() + 1)

    await User.update(user.id, {
      reset_token: token,
      reset_token_expires: now
    })

    await mailer.sendMail({
      to: user.email,
      from: 'no-reply@email.com',
      subject: 'Recuperação de senha',
      html: `<h2>Perdeu a chave?</h2>
      <p>Não se preocupe clique no link abaixo para recuperar a senha</p>
      <p>
        <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">
           Recuperar Senha
        </a>
      </p>
      `,
    })

    return res.render("session/forgot-password", {
      success: "Verifique seu email para resetar sua senha"
    })

    }catch(err) {
      console.error(err)
      return res.render("session/forgot-password", {
        error: "Erro inesperado tente novamente"
      })
    }

    
  },
  resetForm(req, res) {
    return res.render("session/password-reset", { token: req.query.token})
  },
  async reset(req, res) {
    const { user } = req.user

    const { password } = req.body
    try{
      
      const newPassword = await hash(password, 8)
      await User.update(user.id, {
        password: newPassword,
        reset_token: "",
        reset_token_expires: ""
      })

      return res.render("session/login", {
        user: req.body,
        success: "Senha atualizada, faça seu login"
      })

    }catch(err) {
      console.error(err)
      return res.render("session/password-reset", {
        error: "Erro inesperado, tente novamente!"
      })

    }
  }
}