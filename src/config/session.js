const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const db = require ('./db') 

module.exports = session ({
  store: new pgSession ({
    pool: db
  }),
  secret: "9967a",
  resave: false,
  saveUnitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 1000
  }
})
