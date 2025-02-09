const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM commander', (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  db.query('SELECT * FROM commander WHERE id_commande = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.length === 0) return res.status(404).send('Commande non trouvée');
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  const { id_client_commande } = req.body;
  db.query('INSERT INTO commander (id_client_commande) VALUES (?)', [id_client_commande], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    res.status(201).json({ id: results.insertId, id_client_commande });
  });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM commander WHERE id_commande = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.affectedRows === 0) return res.status(404).send('Commande non trouvée');
    res.send('Commande supprimée');
  });
});

module.exports = router;
