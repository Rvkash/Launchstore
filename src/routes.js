const express = require('express')
const routes = express.Router()
const ProductController = require('./app/controllers/ProductController')

// http: verbs
// get: receber RESOURCE -> algo real
// post: Criar ou salva RESOURCE COM DADOS ENVIADOS
// put: atualizar um RESOURCE
// delete: apagar UM RESOURCE

routes.get('/', function (req, res) {
  return res.render('layout.njk')
})

routes.get('/products/create', ProductController.create)
routes.get('/products/:id/edit', ProductController.edit)

routes.put('/products', ProductController.put)
routes.post('/products', ProductController.post)

// Alias
routes.get('/ads/create', function (req, res) {
  return res.redirect('/products/create')
})

module.exports = routes
