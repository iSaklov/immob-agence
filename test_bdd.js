const mongoose = require('mongoose');
mongoose.connect(
    'mongodb+srv://iMongoBongo:LgWurhiqNXxrxSHg@iprojectcluster.o7wqj.mongodb.net/iMMob_paris_code', 
    {connectTimeoutMS : 3000, socketTimeoutMS: 20000, useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.once('open', () => {
   console.log(`connexion OK !`);
});
