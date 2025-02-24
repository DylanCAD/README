const PhotoModel = require('../models/photo.js')

const Photos = class Photos {
  /**
   * @constructor
   * @param {Object} app
   * @param {Object} connect
   */
  constructor (app, connect, authenticateToken) {
    this.app = app
    this.PhotoModel = connect.model('Photo', PhotoModel)
    this.authenticateToken = authenticateToken

    this.run()
  }

  /**
   * Delete by id
   */
    deleteById () {
      this.app.delete('/photo/:id', this.authenticateToken, (req, res) => {
        try {
          this.PhotoModel.findByIdAndDelete(req.params.id).then((photo) => {
            res.status(200).json(photo || {})
          }).catch(() => {
            res.status(500).json({
              code: 500,
              message: 'Internal Server error'
            })
          })
        } catch (err) {
          console.error(`[ERROR] photos/:id -> ${err}`)
  
          res.status(400).json({
            code: 400,
            message: 'Bad request'
          })
        }
      })
    }

  /**
   * Show by id
   */
  showById () {
    this.app.get('/photo/:id', this.authenticateToken,  (req, res) => {
      try {
        if (req.photo.role === 'coach') {
          this.PhotoModel.findById(req.params.id).then((photo) => {
            res.status(200).json(photo || {})
          }).catch(() => {
            res.status(500).json({
              code: 500,
              message: 'Internal Server error'
            })
          })
        } else {
          res.status(401).json({
            code: 401,
            message: 'Unauthorized you are not a coach'
          })
        }
      } catch (err) {
        console.error(`[ERROR] photos/:id -> ${err}`)

        res.status(400).json({
          code: 400,
          message: 'Bad request'
        })
      }
    })
  }

  /**
   * Create
   */
  create () {
    this.app.post('/photo/', (req, res) => {
      try {
        const photoModel = new this.PhotoModel(req.body)

        photoModel.save().then((photo) => {
          res.status(200).json(photo || {})
        }).catch(() => {
          res.status(200).json({})
        })
      } catch (err) {
        console.error(`[ERROR] photos/create -> ${err}`)

        res.status(400).json({
          code: 400,
          message: 'Bad request'
        })
      }
    })
  }

  /**
   * Run
   */
  run () {
    this.create()
    this.showById()
    this.deleteById()
  }
}

module.exports = Photos
