const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  db.query('SELECT * FROM categories WHERE id_categorie = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.length === 0) return res.status(404).send('Catégorie non trouvée');
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  const { libelle_categorie } = req.body;
  db.query('INSERT INTO categories (libelle_categorie) VALUES (?)', [libelle_categorie], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    res.status(201).json({ id: results.insertId, libelle_categorie });
  });
});

router.put('/:id', (req, res) => {
  const { libelle_categorie } = req.body;
  db.query('UPDATE categories SET libelle_categorie = ? WHERE id_categorie = ?', [libelle_categorie, req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.affectedRows === 0) return res.status(404).send('Catégorie non trouvée');
    res.send('Catégorie mise à jour');
  });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM categories WHERE id_categorie = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.affectedRows === 0) return res.status(404).send('Catégorie non trouvée');
    res.send('Catégorie supprimée');
  });
});

module.exports = router;
