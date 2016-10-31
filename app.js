
require('dotenv').config();
const express        = require('express')
const logger         = require('morgan')
const path           = require('path')
const bodyParser     = require('body-parser')
const methodOverride = require('method-override')
const service = require('./services/igdb')
const userHistory  = require('./model/user')
const twitch = require('./services/twitch')

const app = express()
const PORT = process.argv[2] || process.env.PORT || 3000

app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.set('view engine', 'ejs')
app.set('views', 'views')

app.listen(PORT, () => { console.log('Port is listening on: ', PORT) })

const home = require('./routes/index');

app.use('/', home);

