var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    password: String,
    /*
     * 0 normal
     * 1 verified
     * 2 vip
     * >10 admin
     * >50 super admin
     */
    role: {
        type: Number,
        default: 0
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

UserSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
});

UserSchema.methods = {
    comparePassword: function (_password, cb) {
        if (_password === this.password) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
};

UserSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },

    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb);
    }
};



module.exports = UserSchema;