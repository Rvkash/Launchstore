const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')
const ProductController = require('../app/controllers/ProductController')
const SearchController = require('../app/controllers/SearchController')

//Search
routes.get('/search', SearchController.index)

//Products
routes.get('/:id/edit', ProductController.edit)
routes.get('/create', ProductController.create)
routes.get('/:id', ProductController.show)
routes.get('/:id/edit', ProductController.edit)

routes.post('/', multer.array("photos", 6), ProductController.post) //postar
routes.put('/', multer.array("photos", 6), ProductController.put)   //att
routes.delete('/', ProductController.delete)  

module.exports = routes
