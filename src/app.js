const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather app",
        name: "Shuvadip"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Shuvadip"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpmsg: "Please contact the Service Desk for help",
        title: "Help",
        name: "Shuvadip"
    })
})

app.get('/weather', (req, res) => {
    addr = req.query.address

    if(!addr){
        return res.send({
            error: "Please provide an address!"
        })
    }
    geocode(addr, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({  error })
        }
        forecast(latitude, longitude, (error, forecastText) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastText,
                location: location,
                address: addr
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: "404",
        name: "Shuvadip",
        error: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Shuvadip",
        error: "Page not found"
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})