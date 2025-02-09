const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/commandesClients', (req, res) => {
  db.query('SELECT commander.id_commande, clients.coordonnees AS email_client, commander.id_client_commande FROM commander INNER JOIN clients ON commander.id_client_commande = clients.id_client ORDER BY commander.id_client_commande;', (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    res.json(results);
  });
});

router.get('/commandesLignes', (req, res) => {
  db.query('SELECT commander.id_commande, ligne_commande.id_ligne_commande, ligne_commande.id_produit, ligne_commande.qt_commandes, ligne_commande.prix_applique FROM commander INNER JOIN ligne_commande ON commander.id_commande = ligne_commande.id_commande ORDER BY commander.id_commande;', (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    res.json(results);
  });
});

router.get('/commandesClientsById/:id_client', (req, res) => {
  const id_client = req.params.id_client;
  const sql = `
    SELECT commander.id_commande, clients.coordonnees AS email_client, commander.id_client_commande 
    FROM commander 
    INNER JOIN clients ON commander.id_client_commande = clients.id_client
    WHERE commander.id_client_commande = ?;
  `;
  db.query(sql, [id_client], (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).send('Erreur interne du serveur');
    }
    res.json(results);
  });
});

router.get('/commandesLignesById/:id_commande', (req, res) => {
  const id_commande = req.params.id_commande;
  const sql = `
    SELECT commander.id_commande, 
           ligne_commande.id_ligne_commande, 
           ligne_commande.id_produit, 
           ligne_commande.qt_commandes, 
           ligne_commande.prix_applique
    FROM commander
    INNER JOIN ligne_commande ON commander.id_commande = ligne_commande.id_commande
    WHERE commander.id_commande = ?;
  `;
  db.query(sql, [id_commande], (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).send('Erreur interne du serveur');
    }
    res.json(results);
  });
});

router.get('/produit/:id_produit', (req, res) => {
  const { id_produit } = req.params;

  const sql = `
    SELECT DISTINCT c.id_commande, c.id_client_commande, cl.coordonnees AS email_client
    FROM ligne_commande lc
    INNER JOIN commander c ON lc.id_commande = c.id_commande
    INNER JOIN clients cl ON c.id_client_commande = cl.id_client
    WHERE lc.id_produit = ?`;

  db.query(sql, [id_produit], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur interne du serveur' });

    if (results.length === 0) {
      return res.status(404).json({ message: 'Aucune commande trouvée pour ce produit' });
    }

    res.json(results);
  });
});

router.get('/client/:id_client', (req, res) => {
  const { id_client } = req.params;

  const sql = `
    SELECT c.id_commande, c.id_client_commande, cl.coordonnees AS email_client
    FROM commander c
    INNER JOIN clients cl ON c.id_client_commande = cl.id_client
    WHERE c.id_client_commande = ?`;

  db.query(sql, [id_client], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur interne du serveur' });

    if (results.length === 0) {
      return res.status(404).json({ message: 'Aucune commande trouvée pour ce client' });
    }

    res.json(results);
  });
});

router.get('/plus-commandes', (req, res) => {
  const sql = `
    SELECT 
        p.id_produit, 
        p.prix_unitaire, 
        p.qt_stock, 
        p.id_categorie_produit,
        COUNT(lc.id_produit) AS nombre_commandes
    FROM ligne_commande lc
    JOIN produits p ON lc.id_produit = p.id_produit
    GROUP BY p.id_produit
    ORDER BY nombre_commandes DESC;
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur interne du serveur' });
    res.json(results);
  });
});



module.exports = router;
