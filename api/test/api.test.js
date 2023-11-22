import chai from 'chai'
import chaiHttp from 'chai-http'

import app from '../index.js'

chai.use(chaiHttp)
chai.should()

describe('Files Routes', () => {
  describe('GET /files/data', () => {
    it('it should get all files and the details', (done) => {
      chai
        .request(app)
        .get('/files/data')
        .end((_err, res) => {
          res.should.have.status(200)
          res.should.have.header(
            'content-type',
            'application/json; charset=utf-8'
          )
          res.body.should.be.a('array')
          res.body.length.should.be.above(0)

          res.body.forEach((file) => {
            file.should.have.property('file')
            file.should.have.property('lines')

            file.file.should.be.a('string')
            file.lines.should.be.a('array')

            file.lines.forEach((line) => {
              line.should.be.an('object')
              line.should.has.any.keys('file', 'text', 'number', 'hex')
            })
          })

          done()
        })
    })

    it('It should get a list filtered by the filename', (done) => {
      chai
        .request(app)
        .get('/files/data?fileName=test2.csv')
        .end((_err, res) => {
          res.should.have.status(200)
          res.should.have.header(
            'content-type',
            'application/json; charset=utf-8'
          )
          res.body.should.be.a('array')
          res.body.length.should.be.above(0)

          res.body.forEach((file) => {
            file.should.have.property('file')
            file.should.have.property('lines')

            file.file.should.be.a('string')
            file.lines.should.be.a('array')

            file.lines.forEach((line) => {
              line.should.be.an('object')
              line.should.has.any.keys('file', 'text', 'number', 'hex')
            })
          })

          done()
        })
    })
  })
  describe('GET /files/list', () => {
    it('it should get a list of files from the external', (done) => {
      chai
        .request(app)
        .get('/files/list')
        .end((_err, res) => {
          res.should.have.status(200)
          res.should.have.header(
            'content-type',
            'application/json; charset=utf-8'
          )
          res.body.should.have.property('files')
          res.body.files.should.be.a('array')
          res.body.files.forEach((file) => {
            file.should.be.an('string')
          })

          done()
        })
    })
  })
})
