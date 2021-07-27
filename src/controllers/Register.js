module.exports = class Register {
    print(req, res) {
        res.render('register/form', {form : {}});  
    }

    processForm(request, response) {

    let entity = {
        email : request.body.email || '',
        password : request.body.password || '', // devra être hashé
        civility : request.body.civility || '',
        firstname: request.body.firstname || '',
        lastname: request.body.lastname || '',
        phone: request.body.phone || ''
    };
    
    let RepoUser = require('../repository/UserRepository.js');
    let repo = new RepoUser();
    repo.emailExists(entity.email).then((result) => {
        if(result === true) {
            // si l'email existe deja dans la bdd
            //request.flash('error', message);
            response.render('register/form', { 
                error : `Cette adresse email existe déjà`, 
                form : entity 
            }); 
        } else {
            let bcrypt = require('bcryptjs');
            entity.password = bcrypt.hashSync(
                entity.password, 
                bcrypt.genSaltSync(10)
            );
            // sinon on tente de le créer
            repo.add(entity).then((user) => {
                //request.flash('success','Vous etes bien inscris');
                request.flash('notify', 'Votre compte a bien été créé.');
                response.redirect('/');
            }, (err) => {
                response.render('register/form', { 
                    error : `L'enregistrement en base de données a échoué`, 
                    form : entity
                }) 
            })      
        }
    })
}
}
