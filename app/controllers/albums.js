const AlbumModel = require('../models/album.js')

const Albums = class Albums {
  /**
   * @constructor
   * @param {Object} app
   * @param {Object} connect
   */
  constructor (app, connect, authenticateToken) {
    this.app = app
    this.AlbumModel = connect.model('Album', AlbumModel)
    this.authenticateToken = authenticateToken

    this.run()
  }

  /**
   * Delete by id
   */
    deleteById () {
      this.app.delete('/album/:id', this.authenticateToken, (req, res) => {
        try {
          this.AlbumModel.findByIdAndDelete(req.params.id).then((album) => {
            res.status(200).json(album || {})
          }).catch(() => {
            res.status(500).json({
              code: 500,
              message: 'Internal Server error'
            })
          })
        } catch (err) {
          console.error(`[ERROR] albums/:id -> ${err}`)
  
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
    this.app.get('/album/:id', this.authenticateToken,  (req, res) => {
      try {
        if (req.album.role === 'coach') {
          this.AlbumModel.findById(req.params.id).then((album) => {
            res.status(200).json(album || {})
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
        console.error(`[ERROR] albums/:id -> ${err}`)

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
    this.app.post('/album/', (req, res) => {
      try {
        const albumModel = new this.AlbumModel(req.body)

        albuùModel.save().then((album) => {
          res.status(200).json(album || {})
        }).catch(() => {
          res.status(200).json({})
        })
      } catch (err) {
        console.error(`[ERROR] albums/create -> ${err}`)

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

module.exports = Albums
