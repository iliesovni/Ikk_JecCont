const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM ligne_commande', (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  db.query('SELECT * FROM ligne_commande WHERE id_ligne_commande = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.length === 0) return res.status(404).send('Ligne de commande non trouvée');
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  const { id_produit, id_commande, qt_commandes, prix_applique } = req.body;

  const sql = 'CALL AjouterLigneCommande(?, ?, ?, ?)';

  db.query(sql, [id_produit, id_commande, qt_commandes, prix_applique], (err, results) => {
    if (err) {
      if (err.sqlState === '45000') { 
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    
    res.status(201).json({
      message: 'Ligne de commande ajoutée avec succès',
      id_produit,
      id_commande,
      qt_commandes,
      prix_applique
    });
  });
});


router.put('/:id', (req, res) => {
  const { id_produit, id_commande, qt_commandes, prix_applique } = req.body;
  db.query('UPDATE ligne_commande SET id_produit = ?, id_commande = ?, qt_commandes = ?, prix_applique = ? WHERE id_ligne_commande = ?', 
    [id_produit, id_commande, qt_commandes, prix_applique, req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.affectedRows === 0) return res.status(404).send('Ligne de commande non trouvée');
    res.send('Ligne de commande mise à jour');
  });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM ligne_commande WHERE id_ligne_commande = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.affectedRows === 0) return res.status(404).send('Ligne de commande non trouvée');
    res.send('Ligne de commande supprimée');
  });
});

module.exports = router;
