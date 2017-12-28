const Finder = require('fs-finder')

var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var cors = require('cors')
var bodyParser = require('body-parser')
var expressStaticGzip = require('express-static-gzip')
var helmet = require('helmet')

const routepage = require('./templates/routepage')

var utils = require('./utils')

var app = new (require('express'))()
var port = process.env.PORT || 3001

var compiler = webpack(config)

if(port === 3001) {
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
    app.use(webpackHotMiddleware(compiler))
}

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(helmet())
app.disable('x-powered-by')

app.use('/dist', expressStaticGzip('dist'))

app.post('/utils/checkdirect', (req, res) => {
    utils.checkDirectRequest(req.body, (err, result) => {
        res.json({err: err, result: result})
    })
})

app.post('/utils/checkstatic', (req, res) => {
    utils.checkStatic(req.body, (err, result) => {
        res.json({err: err, result: result})
    })
})

app.post('/utils/checkalias', (req, res) => {
    utils.checkAlias(req.body, (err, result) => {
        res.json({err: err, result: result})
    })
})

app.post('/utils/extractdeparture', (req, res) => {
    utils.extractDeparture(req.body.alias, (err, result) => {
        if(err) {
            res.status(422).json({status: 'error', message: err})
        } else {
            res.json({status: 'success', arrivals: result})
        }
    })
})

app.post('/utils/pushstatic', (req, res) => {
    if(req.body.payload.length > 0) {
        let content = routepage(req.body)

        utils.checkAlias(req.body.payload[0], (err, result) => {
            if(err) {
                res.status(422).json({status: 'error', message: err})
            } else {
                let staticName = (result.exist && !req.body.override) ? result.available : result.alias
                staticName += '_'+req.body.departure+'_'+req.body.arrival

                utils.pushStatic(staticName, content, req.body)
                res.json({status: 'written'})
            }
        })
    } else {
        res.status(422).json({status: 'error', message: 'empty routes payload'})
    }
})

app.get('/dashboard', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.get('/cabinet/*', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.get('*', function(req, res) {
    let urlSrc = req.url.split('/')
    let target = '/static/pages/routes/' + urlSrc[1] +'_' + urlSrc[2]+'_*'
    Finder.from(__dirname).findFiles(target, (files) => {
        if(files.length === 0) {
            res.sendFile(__dirname + '/index.html')
        } else {
            res.sendFile(files[0])
        }
    })
})

app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})
