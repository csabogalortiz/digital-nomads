const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const placeSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ['Focusing', 'Networoking', "Focus&Chill"]
    },


    decripion: {
      type: String,
      required: false
    },

    location: {
      type: {
        type: String
      },
      coordinates: [Number]
    },
    placeImg: {
      type: String,
      default: 'https://www.bedfordcentre.com/plugins/noveldesign-store-directory/images/default-shop.jpg'
    },
    owner: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
  },
  {
    timestamps: true
  }
);

placeSchema.index({ location: '2dsphere' })
const Place = mongoose.model('Place', placeSchema)


module.exports = Place;


