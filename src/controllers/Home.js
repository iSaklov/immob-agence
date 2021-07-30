// dans le controller (Home.js)
const config = require("../../app/config.js");
const fs = require('fs');
module.exports = class Home {
    print(request, response) {
        let RepoRealty = require('../repository/RealtyRepository.js');
        (new RepoRealty).find().then((realties) => {
            for (const [key, realty] of Object.entries(realties)) {
                // récupérer 1 fichier (image) par realty
                //console.log(`${config.directory_product_image}${realty._id}`);
                realties[key].images = [];
                if (fs.existsSync(config.directory_product_image+realty._id)) {
                    fs.readdirSync(config.directory_product_image+realty._id).forEach(file => {
                        realties[key].images.push(file);
                    });
                }
            }
            console.log(realties);
            response.render('home', {realties});
        });
    }
};