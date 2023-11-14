import { Router } from "express";
import { InserirProduto, DeletarProduto, ConsultarProduto, listarProdutos, InserirImagem, EditarProduto } from "../repositories/ProdutoRepository.js";

import multer from 'multer';

let endpoints = Router();
const upload = multer({ dest: 'storage/imgProdutos' })


endpoints.get('/produtos', async (req, resp) => {
      try {
          const r = await listarProdutos();
          resp.send(r)
      }

      catch (err) {
        resp.status(400).send({
          erro: err.message
        })
      }
})

endpoints.put('/produto/:id', async (req,resp) => {
  try {
      const { id } = req.params;
      const produto = req.body;

      const r = await EditarProduto(id, produto)

      if(r != 1)
        throw new Error('Erro na alteração do produto!')

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

        if(!produto.codigo){
          throw new Error('Insira o código do produto!')
        }

      else 
        resp.status(204).send()
  }

  catch(err) {
    resp.status(400).send({
      erro: err.message
    })
  }
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

    if(!produto.codigo){
      throw new Error('Insira um código ao produto!')
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
      const imagem = req.file.path;

      const r = await InserirImagem(imagem,id);
      if(r != 1){
        throw new Error('A imagem não pode ser salva!') 
      }

      resp.status(204).send();
    }

    catch (err) {
      resp.status(400).send({
        erro: err.message
      })
    }
})


endpoints.get('/produtos/busca', async (req, resp) => {
  try {
    const { nome } = req.query
    const r = await ConsultarProduto(nome);
    
    if(!r)
      throw new Error('Produto não encontrado!') 

    resp.send(r)
  }
  catch (err) {
    resp.status(500).send({ erro: 'Ocorreu um erro!' });
  }
})


endpoints.delete('/produto/:id', async (req, resp) => {
    try {
      const { id } = req.params
      let r = await DeletarProduto(id);
      if (r != 1)
        throw new Error('Não foi possível excluir este item.');
  
      resp.status(204).send();
    }
    catch (err) {
      resp.status(500).send({ erro: err.message });
    }
  });



export default endpoints;