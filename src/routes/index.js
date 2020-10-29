const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/HomeController')
const products = require('./products')
const users = require('./users')

// http: verbs
// get: get resource
// post: create or save resource with data 
// put: update a resource
// delete: delete a resource

routes.get('/', HomeController.index)

routes.use('/products', products)
routes.use('/users', users)

// Alias
routes.get('/ads/create', function (req, res) {
  return res.redirect('/products/create')
})

routes.get('/accounts', function (req, res) {
  return res.redirect('/users/register')
})

module.exports = routes
