import express from 'express'

import config from './config/index.js'
import { HttpError, STATUTES } from './errors/index.js'

import { FilesRouter } from './routes/index.js'

/* Creating App */
const app = express()

/* Cors */
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

/* Set files routes handler */
app.use('/files', FilesRouter)

/* 404 error Handler */
app.use((_req, _res, next) => next(new HttpError('Not found', STATUTES.NOTFOUND)))

/* Custom error handler */
app.use((err, _res, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      code: err.statusCode,
      message: err.message || 'Error',
      stack: config.app.env === 'development' ? err.stack : {}
    })
  } else {
    res.status(STATUTES.SERVERERROR).json({
      code: STATUTES.SERVERERROR,
      message: err.message || 'Error',
      stack: config.app.env === 'development' ? err.stack : {}
    })
  }
})

/* Listening */
app.listen(config.app.port, () => console.log(`Running using http://localhost:${config.app.port}`))

export default app
