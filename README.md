# Ikk_JecCont

v1 :

bdd :

CREATE DATABASE IF NOT EXISTS Commerce;
USE Commerce;

-- Table des catégories
CREATE TABLE categories (
    id_categorie INT AUTO_INCREMENT PRIMARY KEY,
    libelle_categorie VARCHAR(255) NOT NULL UNIQUE
);

-- Table des produits
CREATE TABLE produits (
    id_produit INT AUTO_INCREMENT PRIMARY KEY,
    prix_unitaire DOUBLE NOT NULL,
    qt_stock INT NOT NULL DEFAULT 0,
    id_categorie_produit INT NOT NULL,
    FOREIGN KEY (id_categorie_produit) REFERENCES categories(id_categorie) ON DELETE CASCADE
);

-- Table des fournisseurs
CREATE TABLE fournisseurs (
    id_fournisseur INT AUTO_INCREMENT PRIMARY KEY,
    nom_fournisseur VARCHAR(255) NOT NULL UNIQUE
);

-- Table des clients
CREATE TABLE clients (
    id_client INT AUTO_INCREMENT PRIMARY KEY,
    qt INT NOT NULL DEFAULT 0,
    adresse VARCHAR(255) NOT NULL,
    coordonnees VARCHAR(255) NOT NULL UNIQUE
);

-- Table des commandes
CREATE TABLE commander (
    id_commande INT AUTO_INCREMENT PRIMARY KEY,
    id_client_commande INT NOT NULL,
    FOREIGN KEY (id_client_commande) REFERENCES clients(id_client) ON DELETE CASCADE
);

-- Table des lignes de commande
CREATE TABLE ligne_commande (
    id_ligne_commande INT AUTO_INCREMENT PRIMARY KEY,
    id_produit INT NOT NULL,
    id_commande INT NOT NULL,
    qt_commandes INT NOT NULL CHECK (qt_commandes > 0),
    prix_applique DOUBLE NOT NULL CHECK (prix_applique >= 0),
    FOREIGN KEY (id_produit) REFERENCES produits(id_produit) ON DELETE CASCADE,
    FOREIGN KEY (id_commande) REFERENCES commander(id_commande) ON DELETE CASCADE
);

-- Table des fournitures
CREATE TABLE fournir (
    id_fournisseur_fournir INT NOT NULL,
    id_produit_fournir INT NOT NULL,
    qt_fournit INT NOT NULL CHECK (qt_fournit > 0),
    PRIMARY KEY (id_fournisseur_fournir, id_produit_fournir),
    FOREIGN KEY (id_fournisseur_fournir) REFERENCES fournisseurs(id_fournisseur) ON DELETE CASCADE,
    FOREIGN KEY (id_produit_fournir) REFERENCES produits(id_produit) ON DELETE CASCADE
);

données :

USE Commerce;

-- Insertion des catégories
INSERT INTO categories (libelle_categorie) VALUES
('Électronique'),
('Mode'),
('Maison et jardin'),
('Alimentation'),
('Sport'),
('Santé et bien-être'),
('Livres'),
('Jouets et jeux'),
('Vêtements'),
('Accessoires');

-- Insertion des fournisseurs
INSERT INTO fournisseurs (nom_fournisseur) VALUES
('Fournisseur A'),
('Fournisseur B'),
('Fournisseur C'),
('Fournisseur D'),
('Fournisseur E');

-- Insertion des produits
INSERT INTO produits (prix_unitaire, qt_stock, id_categorie_produit) VALUES
(99.99, 150, 1), -- Électronique
(25.50, 200, 2), -- Mode
(15.00, 350, 3), -- Maison et jardin
(2.99, 500, 4), -- Alimentation
(59.90, 80, 5), -- Sport
(9.99, 100, 6), -- Santé et bien-être
(19.99, 300, 7), -- Livres
(49.99, 250, 8), -- Jouets et jeux
(89.90, 90, 9), -- Vêtements
(14.99, 400, 10); -- Accessoires

-- Insertion des clients
INSERT INTO clients (adresse, coordonnees) VALUES
('123 Rue de Paris, 75001 Paris', 'contact@client1.com'),
('456 Avenue des Champs, 75008 Paris', 'contact@client2.com'),
('789 Boulevard St Germain, 75005 Paris', 'contact@client3.com'),
('101 Rue de Lyon, 69001 Lyon', 'contact@client4.com'),
('202 Rue de Marseille, 13001 Marseille', 'contact@client5.com'),
('303 Boulevard de la République, 06000 Nice', 'contact@client6.com'),
('404 Rue Victor Hugo, 75016 Paris', 'contact@client7.com'),
('505 Rue de la Liberté, 13002 Marseille', 'contact@client8.com'),
('606 Boulevard de la Côte d'Azur, 06000 Nice', 'contact@client9.com'),
('707 Avenue des Roses, 75018 Paris', 'contact@client10.com');

-- Insertion des commandes
INSERT INTO commander (id_client_commande) VALUES
(1), (2), (3), (4), (5), (6), (7), (8), (9), (10);

-- Insertion des lignes de commande
INSERT INTO ligne_commande (id_produit, id_commande, qt_commandes, prix_applique) VALUES
(1, 1, 2, 99.99),
(2, 1, 3, 25.50),
(3, 2, 1, 15.00),
(4, 2, 5, 2.99),
(5, 3, 2, 59.90),
(6, 3, 1, 9.99),
(7, 4, 4, 19.99),
(8, 4, 3, 49.99),
(9, 5, 2, 89.90),
(10, 6, 5, 14.99);

-- Insertion des fournitures
INSERT INTO fournir (id_fournisseur_fournir, id_produit_fournir, qt_fournit) VALUES
(1, 1, 100),
(2, 2, 150),
(3, 3, 200),
(4, 4, 250),
(5, 5, 120),
(1, 6, 80),
(2, 7, 180),
(3, 8, 220),
(4, 9, 130),
(5, 10, 300);
