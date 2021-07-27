module.exports = class Realty {

	delete(request, response) {
        if(typeof request.session === 'undefined' || typeof request.session.user === 'undefined') {
            request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            response.redirect('/connexion');  
            return;
        }
 
        if(request.params.id != undefined && request.params.id != '') {
			let RealityRepository = require('../repository/RealtyRepository.js');
            let repo = new RealityRepository();
            repo.delete({_id : request.params.id}).then(() => {
                request.flash('notify', 'Le bien a été supprimé.');
                response.redirect('/admin/realty');
            }, () => {
                request.flash('error', 'La suppression du bien a échoué.');
                response.redirect('/admin/realty');
            });  
        } 
        else {
            request.flash('error', 'Une erreur est survenue.');
            response.redirect('/admin/realty');
        }
    }

    print(request, response) {
        if(typeof request.session.user !== 'undefined') {
			let RealityRepository = require('../repository/RealtyRepository.js');
            let repo = new RealityRepository();
            repo.find().then((realties) => {
                response.render('admin/realty/list', {realties});
            });
        } else {
            request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            response.redirect('/connexion');  
        }
    }

	 printForm(request, response) {
        if(typeof request.session === 'undefined' || typeof request.session.user === 'undefined') {
            request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            response.redirect('/connexion');  
            return;
        }
        // on est en modification
        if(typeof request.params.id !== 'undefined') {
            let repo = new RepoRealty();
            repo.findById(request.params.id).then((realty) => {
                response.render('admin/realty/form', {form : realty});
            }, () => {
                request.flash('error',`Le bien n'a pas été trouvé`)
                response.redirect('/admin/realty');
            });   
        } 
        // on est en ajout
        else {
            response.render('admin/realty/form', {form: { contact: {}, address : {}}});
        }
    }

    processForm(request, response) {
    let entity = {
	user : request.session.user,
    contact : {
		civility : request.body.contact['civility'] || '',
		lastname : request.body.contact['lastname'] || '',
        firstname : request.body.contact['firstname'] || '',
        email : request.body.contact['email'] || '',
		mobile : request.body.contact['mobile'] || '',
        phone : request.body.contact['phone'] || '',
        info_contact : request.body.contact['info_contact'] || ''
    },
    address : {
        address1 : request.body.realty['address1'] || '',
        address2 : request.body.realty['address2'] || '',
		zipcode : request.body.realty['zipcode'] || '',
        city : request.body.realty['city'] || '',
        info_address : request.body.realty['info_address'] || ''
    },
    type : request.body.realty['type'] || '',
	price : request.body.realty['price'] || '',
	amount_commission : request.body.realty['amount_commission'] || '',
	percentage_commission : request.body.realty['percentage_commission'] || '',
    area : request.body.realty['area'] || '',
    room : request.body.realty['room'] || '',
    type_product : request.body.realty['type_product'] || '',
    info_realty : request.body.realty['info_realty'] || '' 
    };
    
    let RealityRepository = require('../repository/RealtyRepository.js');
    let repo = new RealityRepository();
	repo.add(entity).then((realties) => {
		//request.flash('success','Vous etes bien inscris');
		request.flash('notify', 'Le bien immobilié a bien été créé.');
		response.redirect('/admin/realty');
	}, (err) => {
		console.log(err)
		response.render('register/form', { 
			error : `L'enregistrement en base de données a échoué`, 
			form : entity
			}) 
		})      
	}
}
