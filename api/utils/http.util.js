import https from 'https'

import config from '../config/index.js'

const OKSTATUS = 200

const options = {
  hostname: config.service.base,
  headers: {
    Authorization: `Bearer ${config.service.token}`
  }
}

/**
 * Do a get request with path provided.
 *
 * @param {String} path
 *
 * @return {Promise} a promise of request
 */
export const get = (path) => {
  return new Promise((resolve, reject) => {
    const req = https.get({ ...options, path }, (res) => {
      if (res.statusCode !== OKSTATUS) {
        reject(new Error(`Error in external service: ${res.statusMessage}`))
      }
      res.setEncoding('utf8')
      let responseBody = ''
      res.on('data', (chunk) => {
        responseBody += chunk
      })
      res.on('end', () => {
        resolve(responseBody)
      })
    })
    req.on('error', (error) => {
      reject(error.message)
    })
    req.end()
  })
}
