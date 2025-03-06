const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Habilita CORS para todas as origens
app.use(cors());

app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('Dados recebidos:', req.body);
  res.status(200).send('Dados recebidos com sucesso!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
