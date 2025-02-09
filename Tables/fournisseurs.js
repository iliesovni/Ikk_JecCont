const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM fournisseurs', (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  db.query('SELECT * FROM fournisseurs WHERE id_fournisseur = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.length === 0) return res.status(404).send('Fournisseur non trouvé');
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  const { nom_fournisseur } = req.body;
  db.query('INSERT INTO fournisseurs (nom_fournisseur) VALUES (?)', [nom_fournisseur], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    res.status(201).json({ id: results.insertId, nom_fournisseur });
  });
});

router.put('/:id', (req, res) => {
  const { nom_fournisseur } = req.body;
  db.query('UPDATE fournisseurs SET nom_fournisseur = ? WHERE id_fournisseur = ?', [nom_fournisseur, req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.affectedRows === 0) return res.status(404).send('Fournisseur non trouvé');
    res.send('Fournisseur mis à jour');
  });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM fournisseurs WHERE id_fournisseur = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.affectedRows === 0) return res.status(404).send('Fournisseur non trouvé');
    res.send('Fournisseur supprimé');
  });
});

module.exports = router;
