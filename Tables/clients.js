const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM clients', (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  db.query('SELECT * FROM clients WHERE id_client = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.length === 0) return res.status(404).send('Client non trouvé');
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  const { adresse, coordonnees } = req.body;
  db.query('INSERT INTO clients (adresse, coordonnees) VALUES (?, ?)', [adresse, coordonnees], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    res.status(201).json({ id: results.insertId, adresse, coordonnees });
  });
});

router.put('/:id', (req, res) => {
  const { adresse, coordonnees } = req.body;
  db.query('UPDATE clients SET adresse = ?, coordonnees = ? WHERE id_client = ?', [adresse, coordonnees, req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.affectedRows === 0) return res.status(404).send('Client non trouvé');
    res.send('Client mis à jour');
  });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM clients WHERE id_client = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.affectedRows === 0) return res.status(404).send('Client non trouvé');
    res.send('Client supprimé');
  });
});

module.exports = router;
