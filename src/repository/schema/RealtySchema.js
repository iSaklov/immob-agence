const	mongoose = require('mongoose'),
		UserSchema = require('./UserSchema.js'),
		slug = require('mongoose-slug-updater');
		mongoose.plugin(slug);

module.exports = mongoose.Schema({
	user : { type : UserSchema},
    contact : {
		civility : {type: String, match: /^[1-2]{1}$/},
        firstname : { type: String, match: /^[ a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i },
        lastname : { type: String, match: /^[ a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i },
        email : {  type: String },
        phone : { type: String, match: /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/ },
        mobile : { type: String, match: /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/ },
        info_contact : { type: String }
    },
    address : {
        address1 : { type: String },
        address2 : { type: String },
        city : { type: String, match: /^[ a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i },
        zipcode : { type: String },
        info_address : { type: String }
    },
    type : {type: String, match: /^[1-6]{1}$/},
	price : { type: Number, match: /^[0-9]{1,}$/},
	amout_commission : { type: Number, match: /^[0-9]{1,}$/},
	percentage_commission : { type: Number, match: /^[0-9]{1,}$/},
    area : { type: Number, match: /^[0-9]{1,}$/},
    room : {type: Number, match: /^[0-9]{1,2}$/},
	type_product : {type: String, match: /^[1-3]{1}$/},
    info_realty : { type: String },

	slug: { type: String, slug: ['address.zipcode','address.city'], unique: true },
	date : { type: Date, default: Date.now }

}, { versionKey: false });