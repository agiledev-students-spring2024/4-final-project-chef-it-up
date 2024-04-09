const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
})

  // create a model from this schema
const User = mongoose.model("User", UserSchema)

// export the model
module.exports = User