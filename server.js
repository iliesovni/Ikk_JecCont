const express = require('express');
const db = require('./db');

const app = express();
const port = 3000;

app.use(express.json());


app.get('/api/produits', (req, res) => {
  db.query('SELECT * FROM produits', (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    res.json(results);
  });
});

app.get('/api/produits/:id', (req, res) => {
  db.query('SELECT * FROM produits WHERE id_produit = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.length === 0) return res.status(404).send('Produit non trouvé');
    res.json(results[0]);
  });
});

app.post('/api/produits', (req, res) => {
  const { prix_unitaire, qt_stock, id_categorie_produit } = req.body;
  db.query('INSERT INTO produits (prix_unitaire, qt_stock, id_categorie_produit) VALUES (?, ?, ?)', [prix_unitaire, qt_stock, id_categorie_produit], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    res.status(201).json({ id: results.insertId, prix_unitaire, qt_stock, id_categorie_produit });
  });
});

app.put('/api/produits/:id', (req, res) => {
  const { prix_unitaire, qt_stock, id_categorie_produit } = req.body;
  db.query('UPDATE produits SET prix_unitaire = ?, qt_stock = ?, id_categorie_produit = ? WHERE id_produit = ?', [prix_unitaire, qt_stock, id_categorie_produit, req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.affectedRows === 0) return res.status(404).send('Produit non trouvé');
    res.send('Produit mis à jour');
  });
});

app.delete('/api/produits/:id', (req, res) => {
  db.query('DELETE FROM produits WHERE id_produit = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.affectedRows === 0) return res.status(404).send('Produit non trouvé');
    res.send('Produit supprimé');
  });
});


app.get('/api/categories', (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    res.json(results);
  });
});

app.get('/api/categories/:id', (req, res) => {
  db.query('SELECT * FROM categories WHERE id_categorie = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.length === 0) return res.status(404).send('Catégorie non trouvée');
    res.json(results[0]);
  });
});

app.post('/api/categories', (req, res) => {
  const { libelle_categorie } = req.body;
  db.query('INSERT INTO categories (libelle_categorie) VALUES (?)', [libelle_categorie], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    res.status(201).json({ id: results.insertId, libelle_categorie });
  });
});

app.put('/api/categories/:id', (req, res) => {
  const { libelle_categorie } = req.body;
  db.query('UPDATE categories SET libelle_categorie = ? WHERE id_categorie = ?', [libelle_categorie, req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.affectedRows === 0) return res.status(404).send('Catégorie non trouvée');
    res.send('Catégorie mise à jour');
  });
});

app.delete('/api/categories/:id', (req, res) => {
  db.query('DELETE FROM categories WHERE id_categorie = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.affectedRows === 0) return res.status(404).send('Catégorie non trouvée');
    res.send('Catégorie supprimée');
  });
});


app.get('/api/fournisseurs', (req, res) => {
  db.query('SELECT * FROM fournisseurs', (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    res.json(results);
  });
});

app.get('/api/fournisseurs/:id', (req, res) => {
  db.query('SELECT * FROM fournisseurs WHERE id_fournisseur = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.length === 0) return res.status(404).send('Fournisseur non trouvé');
    res.json(results[0]);
  });
});

app.post('/api/fournisseurs', (req, res) => {
  const { nom_fournisseur } = req.body;
  db.query('INSERT INTO fournisseurs (nom_fournisseur) VALUES (?)', [nom_fournisseur], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    res.status(201).json({ id: results.insertId, nom_fournisseur });
  });
});

app.put('/api/fournisseurs/:id', (req, res) => {
  const { nom_fournisseur } = req.body;
  db.query('UPDATE fournisseurs SET nom_fournisseur = ? WHERE id_fournisseur = ?', [nom_fournisseur, req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.affectedRows === 0) return res.status(404).send('Fournisseur non trouvé');
    res.send('Fournisseur mis à jour');
  });
});

app.delete('/api/fournisseurs/:id', (req, res) => {
  db.query('DELETE FROM fournisseurs WHERE id_fournisseur = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.affectedRows === 0) return res.status(404).send('Fournisseur non trouvé');
    res.send('Fournisseur supprimé');
  });
});


app.get('/api/clients', (req, res) => {
  db.query('SELECT * FROM clients', (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    res.json(results);
  });
});

app.get('/api/clients/:id', (req, res) => {
  db.query('SELECT * FROM clients WHERE id_client = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.length === 0) return res.status(404).send('Client non trouvé');
    res.json(results[0]);
  });
});

app.post('/api/clients', (req, res) => {
  const { adresse, coordonnees } = req.body;
  db.query('INSERT INTO clients (adresse, coordonnees) VALUES (?, ?)', [adresse, coordonnees], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    res.status(201).json({ id: results.insertId, adresse, coordonnees });
  });
});

app.put('/api/clients/:id', (req, res) => {
  const { adresse, coordonnees } = req.body;
  db.query('UPDATE clients SET adresse = ?, coordonnees = ? WHERE id_client = ?', [adresse, coordonnees, req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.affectedRows === 0) return res.status(404).send('Client non trouvé');
    res.send('Client mis à jour');
  });
});

app.delete('/api/clients/:id', (req, res) => {
  db.query('DELETE FROM clients WHERE id_client = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.affectedRows === 0) return res.status(404).send('Client non trouvé');
    res.send('Client supprimé');
  });
});


app.get('/api/commandes', (req, res) => {
  db.query('SELECT * FROM commander', (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    res.json(results);
  });
});

app.get('/api/commandes/:id', (req, res) => {
  db.query('SELECT * FROM commander WHERE id_commande = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.length === 0) return res.status(404).send('Commande non trouvée');
    res.json(results[0]);
  });
});

app.post('/api/commandes', (req, res) => {
  const { id_client_commande } = req.body;
  db.query('INSERT INTO commander (id_client_commande) VALUES (?)', [id_client_commande], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    res.status(201).json({ id: results.insertId, id_client_commande });
  });
});

app.delete('/api/commandes/:id', (req, res) => {
  db.query('DELETE FROM commander WHERE id_commande = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Erreur interne du serveur');
    if (results.affectedRows === 0) return res.status(404).send('Commande non trouvée');
    res.send('Commande supprimée');
  });
});


app.get('/api/ligne_commande', (req, res) => {
    db.query('SELECT * FROM ligne_commande', (err, results) => {
      if (err) return res.status(500).send('Erreur interne du serveur');
      res.json(results);
    });
  });
  
  app.get('/api/ligne_commande/:id', (req, res) => {
    db.query('SELECT * FROM ligne_commande WHERE id_ligne_commande = ?', [req.params.id], (err, results) => {
      if (err) return res.status(500).send('Erreur interne du serveur');
      if (results.length === 0) return res.status(404).send('Ligne de commande non trouvée');
      res.json(results[0]);
    });
  });
  
  app.post('/api/ligne_commande', (req, res) => {
    const { id_produit, id_commande, qt_commandes, prix_applique } = req.body;
    db.query('INSERT INTO ligne_commande (id_produit, id_commande, qt_commandes, prix_applique) VALUES (?, ?, ?, ?)', 
      [id_produit, id_commande, qt_commandes, prix_applique], (err, results) => {
      if (err) return res.status(500).send('Erreur interne du serveur');
      res.status(201).json({ id: results.insertId, id_produit, id_commande, qt_commandes, prix_applique });
    });
  });
  
  app.put('/api/ligne_commande/:id', (req, res) => {
    const { id_produit, id_commande, qt_commandes, prix_applique } = req.body;
    db.query('UPDATE ligne_commande SET id_produit = ?, id_commande = ?, qt_commandes = ?, prix_applique = ? WHERE id_ligne_commande = ?', 
      [id_produit, id_commande, qt_commandes, prix_applique, req.params.id], (err, results) => {
      if (err) return res.status(500).send('Erreur interne du serveur');
      if (results.affectedRows === 0) return res.status(404).send('Ligne de commande non trouvée');
      res.send('Ligne de commande mise à jour');
    });
  });
  
  app.delete('/api/ligne_commande/:id', (req, res) => {
    db.query('DELETE FROM ligne_commande WHERE id_ligne_commande = ?', [req.params.id], (err, results) => {
      if (err) return res.status(500).send('Erreur interne du serveur');
      if (results.affectedRows === 0) return res.status(404).send('Ligne de commande non trouvée');
      res.send('Ligne de commande supprimée');
    });
  });

  
  app.get('/api/fournir', (req, res) => {
    db.query('SELECT * FROM fournir', (err, results) => {
      if (err) return res.status(500).send('Erreur interne du serveur');
      res.json(results);
    });
  });
  
  app.get('/api/fournir/:id', (req, res) => {
    db.query('SELECT * FROM fournir WHERE id_fournisseur_fournir = ? AND id_produit_fournir = ?', 
      [req.params.id, req.params.id], (err, results) => {
      if (err) return res.status(500).send('Erreur interne du serveur');
      if (results.length === 0) return res.status(404).send('Fourniture non trouvée');
      res.json(results[0]);
    });
  });
  
  app.post('/api/fournir', (req, res) => {
    const { id_fournisseur_fournir, id_produit_fournir, qt_fournit } = req.body;
    db.query('INSERT INTO fournir (id_fournisseur_fournir, id_produit_fournir, qt_fournit) VALUES (?, ?, ?)', 
      [id_fournisseur_fournir, id_produit_fournir, qt_fournit], (err, results) => {
      if (err) return res.status(500).send('Erreur interne du serveur');
      res.status(201).json({ id_fournisseur_fournir, id_produit_fournir, qt_fournit });
    });
  });
  
  app.put('/api/fournir/:id', (req, res) => {
    const { id_fournisseur_fournir, id_produit_fournir, qt_fournit } = req.body;
    db.query('UPDATE fournir SET id_fournisseur_fournir = ?, id_produit_fournir = ?, qt_fournit = ? WHERE id_fournisseur_fournir = ? AND id_produit_fournir = ?', 
      [id_fournisseur_fournir, id_produit_fournir, qt_fournit, req.params.id, req.params.id], (err, results) => {
      if (err) return res.status(500).send('Erreur interne du serveur');
      if (results.affectedRows === 0) return res.status(404).send('Fourniture non trouvée');
      res.send('Fourniture mise à jour');
    });
  });
  
  app.delete('/api/fournir/:id', (req, res) => {
    db.query('DELETE FROM fournir WHERE id_fournisseur_fournir = ? AND id_produit_fournir = ?', 
      [req.params.id, req.params.id], (err, results) => {
      if (err) return res.status(500).send('Erreur interne du serveur');
      if (results.affectedRows === 0) return res.status(404).send('Fourniture non trouvée');
      res.send('Fourniture supprimée');
    });
  });

  app.get('/api/commandesClients', (req, res) => {
    db.query('SELECT commander.id_commande, clients.coordonnees AS email_client, commander.id_client_commande FROM commander INNER JOIN clients ON commander.id_client_commande = clients.id_client ORDER BY commander.id_client_commande;', (err, results) => {
      if (err) return res.status(500).send('Erreur interne du serveur');
      res.json(results);
    });
  });

  app.get('/api/commandesLignes', (req, res) => {
    db.query('SELECT commander.id_commande, ligne_commande.id_ligne_commande, ligne_commande.id_produit, ligne_commande.qt_commandes, ligne_commande.prix_applique FROM commander INNER JOIN ligne_commande ON commander.id_commande = ligne_commande.id_commande ORDER BY commander.id_commande;', (err, results) => {
      if (err) return res.status(500).send('Erreur interne du serveur');
      res.json(results);
    });
  });

  app.get('/api/commandesClientsById/:id_client', (req, res) => {
    const id_client = req.params.id_client;
    const sql = `
        SELECT commander.id_commande, clients.coordonnees AS email_client, commander.id_client_commande 
        FROM commander 
        INNER JOIN clients ON commander.id_client_commande = clients.id_client
        WHERE commander.id_client_commande = ${id_client};
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur SQL:', err);
            return res.status(500).send('Erreur interne du serveur');
        }
        res.json(results);
    });
});

app.get('/api/commandesLignesById/:id_commande', (req, res) => {
  const id_commande = req.params.id_commande;
  const sql = `
      SELECT commander.id_commande, 
             ligne_commande.id_ligne_commande, 
             ligne_commande.id_produit, 
             ligne_commande.qt_commandes, 
             ligne_commande.prix_applique
      FROM commander
      INNER JOIN ligne_commande ON commander.id_commande = ligne_commande.id_commande
      WHERE commander.id_commande = ${id_commande};
  `;
  db.query(sql, (err, results) => {
      if (err) {
          console.error('Erreur SQL:', err);
          return res.status(500).send('Erreur interne du serveur');
      }
      res.json(results);
  });
});

  
  app.listen(port, () => {
    console.log(`Serveur Express démarré sur http://localhost:${port}`);
  });