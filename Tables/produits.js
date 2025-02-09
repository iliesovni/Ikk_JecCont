const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM produits', (err, results) => {
      if (err) return res.status(500).send('Erreur interne du serveur');
      res.json(results);
    });
});

router.get('/:id', (req, res) => {
    db.query('SELECT * FROM produits WHERE id_produit = ?', [req.params.id], (err, results) => {
      if (err) return res.status(500).send('Erreur interne du serveur');
      if (results.length === 0) return res.status(404).send('Produit non trouvé');
      res.json(results[0]);
    });
});

router.post('/', (req, res) => {
    const { prix_unitaire, qt_stock, id_categorie_produit } = req.body;
    db.query('INSERT INTO produits (prix_unitaire, qt_stock, id_categorie_produit) VALUES (?, ?, ?)', [prix_unitaire, qt_stock, id_categorie_produit], (err, results) => {
      if (err) return res.status(500).send('Erreur interne du serveur');
      res.status(201).json({ id: results.insertId, prix_unitaire, qt_stock, id_categorie_produit });
    });
});

router.put('/:id', (req, res) => {
    const { prix_unitaire, qt_stock, id_categorie_produit } = req.body;
    db.query('UPDATE produits SET prix_unitaire = ?, qt_stock = ?, id_categorie_produit = ? WHERE id_produit = ?', [prix_unitaire, qt_stock, id_categorie_produit, req.params.id], (err, results) => {
      if (err) return res.status(500).send('Erreur interne du serveur');
      if (results.affectedRows === 0) return res.status(404).send('Produit non trouvé');
      res.send('Produit mis à jour');
    });
});

router.delete('/:id', (req, res) => {
    db.query('DELETE FROM produits WHERE id_produit = ?', [req.params.id], (err, results) => {
      if (err) return res.status(500).send('Erreur interne du serveur');
      if (results.affectedRows === 0) return res.status(404).send('Produit non trouvé');
      res.send('Produit supprimé');
    });
});

module.exports = router;
