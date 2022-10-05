const mongoose = require('mongoose')
const { Sessions } = require('./Session')
const paseto = require('paseto')
const { V4: { sign, generateKey, verify } } = paseto
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
const crypto = require('crypto')

const privateKey = generateKey("public"); //This means the session key is generated at app start and sessions are invalidated between restarts

const userSchema = new mongoose.Schema({
  passHash: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 256
  },
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 16
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 32
  },
  favorites: [mongoose.ObjectId],
  wishlist: [mongoose.ObjectId],
  sessions: [mongoose.ObjectId]
}, {
  virtuals: {
    favoriteCount: {
      get() {
        return this.favorites.length
      }
    }
  }
})

userSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('passHash')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.passHash, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.passHash = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.passHash);
};

userSchema.methods.createSession = async function () {
  //Here we're using PASETO for JWT, which is a practically drop in more secure replacement for JWT without the standard weaknesses

  const token = await sign({
    sub: this.email, //Subject (Person the key issued to, here email as it is unique) 
    iat: true,
    expiresIn: "30m"
  }, await privateKey)

  await Sessions.create({
    user: this.id,
    token: token
  })
  return token;
};

userSchema.methods.verifySession = async function (token) {
  //Here we're using PASETO for JWT, which is a practically drop in more secure replacement for JWT without the standard weaknesses
  try {
    await verify(token, await privateKey, {
      sub: this.email, //Subject (Person the key issued to, here email as it is unique) 
    })
    return true;
  } catch (e) {
    console.log(e)
    return false;
  }
};

const User = mongoose.model('User', userSchema)

module.exports = {
  User
}
