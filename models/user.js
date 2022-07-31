const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
      email: {
        type: String,
        required: true,
        unique: true
      }
});

// const UserSchema = new Schema({
//   // username: {
//   //   type: String,
//   //   required: true
//   // },
//   email: { type: String, unique: true, required: true
//   },
//   // resetPasswordToken: String,
//   // resetPasswordExpires: Date,
//   password: {
//     type: String,
//     required: true
//   }
// });

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);