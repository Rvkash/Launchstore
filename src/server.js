const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')
const session = require('./config/session')

const server = express()
/* middleware pra funcionar o req.body */
server.use(session)
server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

server.set('view engine', 'njk') // setar qual é o motor de views da app, qual é a extensão dos arquivos para abrir

nunjucks.configure('src/app/views', {
  express: server,
  autoescape: false,
  noCache: true
})

server.listen(5001, function () {
  console.log('Server Online, Edições OK')
})
