import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import ProdutoController from './controller/ProdutoController.js';
import ClienteController from './controller/ClienteController.js';
import CategoriasController from './controller/CategoriasController.js';


let servidor = express();
servidor.use(cors());
servidor.use(express.json());

servidor.use('/storage/imgProdutos', express.static('storage/imgProdutos'));

servidor.use(ProdutoController);
servidor.use(ClienteController);
servidor.use(CategoriasController);

servidor.listen(process.env.PORT, () => console.log('API subiu!'))