require('dotenv').config();
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const produtoRouter = require('./routes/produto');
const categoriaRouter = require('./routes/categoria');
const usuarioRouter = require('./routes/usuario');
const loginRouter = require('./routes/login');
const freteRouter = require('./routes/frete');
const enderecoRouter = require('./routes/endereco');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/produtos', produtoRouter);
app.use('/categorias', categoriaRouter);
app.use('/usuarios', usuarioRouter);
app.use('/login', loginRouter);
app.use('/calcula-frete', freteRouter);
app.use('/endereco', enderecoRouter);

app.listen(port, "0.0.0.0", function () {
  console.log(`Berlocaria API escutando na porta ${process.env.PORT}!`);
});



