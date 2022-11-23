const { Schema, model } = require('mongoose')

const userSchema = new Schema({

  // name: {
  //   type: String,
  //   required: false
  // },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profileImg: {
    type: String,
    default: 'https://i.pinimg.com/736x/3d/cd/4a/3dcd4af5bc9e06d36305984730ab7888.jpg'
  },

  bio: {
    type: String,
    default: 'Hi! Im a Digital Nomad'
  },

  links: [{
    type: String,
  }],

  role: {
    type: String,
    enum: ['NOMAD', "ADMIN", "AA"],
    default: 'NOMAD'
  },

  createdPlaces: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Place',
    }
  ],
  favPlaces: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Place',
    }
  ]
},

  {
    timestamps: true
  }
);

module.exports = model('User', userSchema)

