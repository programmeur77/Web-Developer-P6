const mongoose = require('mongoose');

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_AUTH_DATA}@cluster0.yzivs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('Connexion à MongoDB réussie!'))
  .catch(() => console.log('Connexion à MongoDB a échouée!'));
