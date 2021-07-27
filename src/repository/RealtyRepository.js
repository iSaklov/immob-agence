require('../../app/database.js');
const mongoose = require('mongoose');
const RealtySchema = require('./schema/RealtySchema');

const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

module.exports = class RealtyRepository {
    constructor() {
        this.db = mongoose.model('Realty', RealtySchema); 
    }
 
    add(realtyEntity) {
        return new Promise((resolve, reject) => {
            this.db.create(realtyEntity, function (err, user) {
                if (err) reject(err);
                resolve(user);
            })
        })
	}

	delete(filter = {}) {
        return new Promise((resolve, reject) => {
            this.db.deleteOne(filter, function (err) {
                console.log(err);
                if (err) reject(err);
                resolve();
            });
        })
	};

	find(search = {}) {
        return new Promise((resolve, reject) => {
            this.db.find(search, function (err, realty) {
                if (err) reject(err);
                resolve(realty);
            });
        });
    }

	findById(id) {
        return new Promise((resolve, reject) => {
            this.db.findById(id, function (err, realty) {
                if (err || realty === null) reject();
                resolve(realty);
            });
        });
    }
}