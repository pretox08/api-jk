import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import ProdutoController from './controller/ProdutoController.js';

let servidor = express();
servidor.use(cors());
servidor.use(express.json());

servidor.use(ProdutoController);

servidor.listen(process.env.PORT, () => console.log('API subiu!'))