const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"stock"
});

app.post('/add_product', (req, res) =>{
sql = "INSERT INTO produit(IdProduit, Reference, Nom, Prix, Categorie, Qte_dispo, Emplacement) VALUES (?,?,?,?,?,?,?)";
const values = [
    req.body.idProduit,
    req.body.refProduit,
    req.body.nomProduit,
    req.body.prixProduit,
    req.body.categorieProduit,
    req.body.qteDispo,
    req.body.emplacement
]
db.query(sql, values, (err, result) =>{
    if(err) return res.json("Erreur")
    return res.json("Produit ajouté!")
    });
});

app.get("/produit", (req, res) =>{
    const sql = "SELECT * FROM produit";
    db.query(sql, (err, result) =>{
        if(err) return res.json({"message" : "Erreur au niveau du serveur"});
            return res.json(result);
    });
});

app.get("/get_produit/:id", (req, res) =>{
    const id = req.params.id;
    const sql = "SELECT * FROM produit WHERE 'id'=?";
    db.query(sql,[id], (err, result) =>{
        if(err) return res.json({"message" : "Erreur au niveau du serveur"});
            return res.json(result);
    });
});

app.post("/update_produit/:id", (req, res) =>{
    const id = req.params.id;
    const sql = "UPDATE produit SET 'IdProduit'=?, 'Reference'=?, 'Nom'=?, 'Prix'=?, 'Categorie'=?, 'Qte_dispo'=?, 'Emplacement'=?";
    const values = [req.body.idProduit, req.body.refProduit, req.body.nomProduit, req.body.prixProduit, req.body.categorieProduit, req.body.qteDispo, req.body.emplacement];
    db.query(sql,[id], (err, result) =>{
        if(err) return res.json({"message" : "Erreur au niveau du serveur"});
            return res.json(result);
    });
});

app.delete("/delete/:id", (req, res) =>{
    const id = req.params.id;
    const sql = "DELETE FROM produit WHERE id=?";
    const values = [id];
    db.query(sql,[id], (err, result) =>{
        if(err) return res.json({"message" : "Erreur au niveau du serveur"});
            return res.json(result);
    });
});

app.listen(port, ()=>{
    console.log(`Server listening to port : ${port}`)
});