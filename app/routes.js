const { request } = require('express');

module.exports = (app) => {
    app.get('/', (req, res) => {
		let Home = require('../src/controllers/Home.js');
      (new Home()).print(req, res);
    });

    app.get('/inscription', (req, res) => {
     let Register = require('../src/controllers/Register.js');
     (new Register()).print(req, res);
    })

    app.post('/inscription', (req, res) => {
     let Register = require('../src/controllers/Register.js');
     (new Register()).processForm(req, res);
    })

    app.get('/connexion', (req, res) => {
      let Authenticated = require('../src/controllers/Authenticated.js');
      (new Authenticated()).printForm(req, res);
    });

    app.post('/connexion', (req, res) => {
      let Authenticated = require('../src/controllers/Authenticated.js');
      (new Authenticated()).processForm(req, res);
    });

    app.get('/deconnexion', (req, res) => {
      let Authenticated = require('../src/controllers/Authenticated.js');
      (new Authenticated()).disconnect(req, res);
    });

    app.use('/admin', (request, response, next) => {
      if(typeof request.session === 'undefined' || typeof request.session.user === 'undefined') {
        request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
        request.session.riderect = request.url;
        response.redirect('/connexion');  
      } else {
        next();
      }
    });

    app.get('/admin', (req, res) => {
    let Dashboard = require('../src/controllers/Dashboard.js');
    (new Dashboard()).print(req, res);
    });

    app.get('/admin/realty', (req, res) => {
    let Realty = require('../src/controllers/Realty.js');
    (new Realty()).print(req, res);
    });
 
    app.get('/admin/realty/add', (req, res) => {
        let Realty = require('../src/controllers/Realty.js');
        (new Realty()).printForm(req, res);
    });

    app.post('/admin/realty/add', 
      require('express-fileupload')({createParentPath: true}),
      require('../src/services/LcParserService.js'), 
      (req, res) => {
          let Realty = require('../src/controllers/Realty.js');
          (new Realty()).processForm(req, res);
    });

    app.get('/admin/realty/delete/:id', (req, res) => {
        let Realty = require('../src/controllers/Realty.js');
        (new Realty()).delete(req, res);
    });

    app.get('/admin/realty/edit/:id', (req, res) => {
        let Realty = require('../src/controllers/Realty.js');
        (new Realty()).printForm(req, res);
    });

    app.post('/admin/realty/edit/:id',
        require('express-fileupload')({createParentPath: true}),
        require('../src/services/LcParserService.js'),
        (req, res) => {
        let Realty = require('../src/controllers/Realty.js');
        (new Realty()).processForm(req, res);
    });
}