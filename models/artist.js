const mongoose = require('mongoose')
const Song = require('./song')

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

artistSchema.pre('remove', function(next) {
  Song.find({ artist: this.id }, (err, songs) => {
    if (err) {
      next(err)
    } else if (songs.length > 0) {
      next(new Error('This artist has songs still'))
    } else {
      next()
    }
  })
})

module.exports = mongoose.model('Artist', artistSchema)