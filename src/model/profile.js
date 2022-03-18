const mongoose = require('mongoose');
const {
    Schema
} = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/default.json');

const salt = config.jwt.SALT;


class profile {
    initSchema() {
        const profileSchema = new Schema(
          {
            firstName: {
              type: 'string',
              required: true,
            },
            lastName: {
              type: 'string',
              required: true,
            },
            email: {
              type: 'string',
              required: true,
              trim: true,
            },
            userName: {
              type: 'string',
              required: true,
            },
            password: {
              type: 'string',
              required: true,
              minlength: 8,
            },
            status: {
              type: 'string',
              enum: ['active', 'deactivate'],
              default: 'active',
            },
            customerType: {
              type: 'string',
              enum: ['teacher', 'student'],
              required: true,
              default: 'teacher'
            }
          },
          {
            timestamps: true,
          }
        );
        // to signup a profile
        profileSchema.pre('save', function (next) {
            var profile = this;
            if (profile.isModified('password')) {
                bcrypt.genSalt(salt, function (err, salt) {
                    if (err) return next(err);

                    bcrypt.hash(profile.password, salt, function (err, hash) {
                        if (err) return next(err);
                        profile.password = hash;
                        next();
                    })

                })
            } else {
                next();
            }
        });
        mongoose.model('profile', profileSchema);
    }

    getInstance() {
        this.initSchema();
        return mongoose.model('profile');
    }

}

module.exports = new profile().getInstance();