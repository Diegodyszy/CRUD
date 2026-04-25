const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());


const db = mysql.createConnection({
    host : '192.168.15.25',
    user : 'site',
    password: 'Better@40',
    database: 'crud'
});

db.connect((err) =>{
    if(err) {
      console.error('Erro ao conectar: ' + err.message);
      return;
    }
    console.log('Banco de dados conectado')
});


app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if(err) return res.status(500).json(err);
        res.json(results); // Envia os dados como JSON para o navegador
    });
});

app.listen(3000, () => {
    console.log('🚀 Servidor API rodando em http://localhost:3000');

    
});
