const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Eric Owusu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Eric Owusu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is the help page!',
        name: 'Eric Owusu'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error: error})
        }
        forecast(latitude, longitude, (error, forecastData) => { 
            if (error) {
                return res.send({error: error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: '404 Error',
        errorMessage: 'Help article not found',
        name: 'Eric Owusu'
        
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        title: '404 Error',
        errorMessage: 'Page not found',
        name: 'Eric Owusu'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})