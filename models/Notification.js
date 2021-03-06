const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
  type : String,
  author : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    autopopulate : { maxDepth : 1 }
  },
})

NotificationSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Notification', NotificationSchema)
