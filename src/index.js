import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import ProdutoController from './controller/ProdutoController.js';
import ClienteController from './controller/ClienteController.js';
import avaliacaoController from './controller/avaliacaoController.js';

let servidor = express();
servidor.use(cors());
servidor.use(express.json());

servidor.use(ProdutoController);
servidor.use(ClienteController);
servidor.use(avaliacaoController);

servidor.listen(process.env.PORT, () => console.log('API subiu!'))