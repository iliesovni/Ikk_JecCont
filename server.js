const express = require('express');
const db = require('./db');
const produitsRoutes = require('./Tables/produits');
const categoriesRoutes = require('./Tables/categories');
const fournisseursRoutes = require('./Tables/fournisseurs');
const clientsRoutes = require('./Tables/clients');
const commandesRoutes = require('./Tables/commandes');
const lignesCommandesRoutes = require('./Tables/lignesCommandes');
const fournir = require('./Tables/fournir');
const meti = require('./Tables/meti');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/produits', produitsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/fournisseurs', fournisseursRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/commandes', commandesRoutes);
app.use('/api/lignesCommandes', lignesCommandesRoutes);
app.use('/api/fournir', fournir);
app.use('/api/meti', meti);
  
  app.listen(port, () => {
    console.log(`Serveur Express démarré sur http://localhost:${port}`);
  });