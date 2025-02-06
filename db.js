const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'LigmaSigma123_',
  database: 'Commerce'
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ' + err.stack);
    return;
  }
  console.log('Connecté à la base de données avec l\'ID ' + connection.threadId);
});

module.exports = connection;