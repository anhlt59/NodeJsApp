let Database = require('../database/database');

// User manager
module.exports = class userManager extends Database {
    constructor(config, logger) {
        super(config, logger);
        this.user = this.getModel('users')
    }

    // register (obj, callback(err, result))
    register(obj, callback) {
        let userRegister = this.user(obj)
        userRegister.save()
            .then(doc => {
                callback(null, obj);
            })
            .catch(err => {
                callback(err);
            });
    }

    // login (obj, callback(err, result))
    login(obj, callback) {
        this.user.findOne(obj, (err, doc) => {
            if (err) {
                return callback(err);
            }
            if (!doc) {
                return callback('username or password not match');
            }
            return callback(null, doc);
        });
    }

    // delete (obj, callback(err, result))
    delete(obj, callback) {
        this.user.deleteOne({
            username: obj.username
        }, err => {
            if (err) {
                return callback(err);
            }
            return callback(null, true);
        });
    }

    // update (filterObj, updateObj, callback(err, result))
    update(filterObj, updateObj, callback) {
        this.user.updateOne(filterObj, {
                $set: updateObj
            })
            .then(doc => {
                return callback(null, doc);
            })
            .catch(err => {
                callback(err);
            });
    }
}