import { Router } from "express";
import { InserirProduto, DeletarProduto, ConsultarProduto, listarProdutos, InserirImagem } from "../repositories/ProdutoRepository.js";

import multer from 'multer';

let endpoints = Router();
const upload = multer({ dest: 'storage/imgProdutos' })


endpoints.get('/produtos', async (resp) => {
    let dados = await listarProdutos();
    resp.send(dados);
})



endpoints.post('/produto', async (req,resp) => {
  try{
    const produto = req.body;

    if(!produto.nome) {
      throw new Error('Nome do produto é obrigatório!')
    }

    if(!produto.tipo){
      throw new Error('Tipo do produto obrigatório!')
    }

    if(!produto.preco){
      throw new Error('Preço obrigatório!') 
    }

    if(!produto.estoque){
      throw new Error('Coloque a quantidade em estoque!')
    }

    if(!produto.tamanho){
      throw new Error('Tamanho obrigatório!')
    }

    if(!produto.detalhes){
      throw new Error('Insira os detalhes do produto!')
    }

    let dados = await InserirProduto(produto);
    resp.send(dados);
  }

  catch(err) {
    resp.status(400).send({
      erro: err.message
    })
  }
})

endpoints.put('/produto/:id/imagem', upload.single('imagem'), async (req,resp) => {

    try {
      const {id} = req.params;

      const resp = await InserirImagem()
    }

    catch (err) {
      resp.status(400).send({
        erro: err.message
      })
    }
})



endpoints.delete('/produto/:id', async (req, resp) => {
    try {
      let id = req.params.id;
      let r = await DeletarProduto(id);
      if (r == 0)
        throw new Error('Não foi possível excluir este item.');
  
      resp.send();
    }
    catch (err) {
      resp.status(500).send({ erro: err.message });
    }
  });


  endpoints.get('/produtos/busca', async (req, resp) => {
    try {
      let nome = req.query.nome;
      let r = await ConsultarProduto(nome);
      resp.send(r);
    }
    catch (err) {
      resp.status(500).send({ erro: 'Ocorreu um erro!' });
    }
  })


export default endpoints;