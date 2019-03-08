const express = require('express')
const nunjucks = require('nunjucks')

// Start express
const app = express()

// Configure Nunjucks
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

// Set config global, express.urlencoded.extended false
app.use(express.urlencoded({ extended: false }))
// Set configure nunjuncks extension to njk
app.set('view engine', 'njk')

// Create index route
app.get('/', (req, resp) => {
  return resp.render('form')
})

const checkExistAge = (req, resp, next) => {
  const { age } = req.query

  if (!age) {
    return resp.render('form')
  }
  next()
}

app.post('/check', (req, resp) => {
  const { age } = req.body

  if (age >= 18) {
    return resp.redirect(`/major?age=${age}`)
  } else {
    return resp.redirect(`/minor?age=${age}`)
  }
})

app.get('/major', checkExistAge, (req, resp) => {
  const { age } = req.query

  return resp.render('major', { age })
})

app.get('/minor', checkExistAge, (req, resp) => {
  const { age } = req.query

  return resp.render('minor', { age })
})

app.listen(3000)
