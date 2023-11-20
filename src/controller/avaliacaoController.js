import { Router } from "express";
import { InserirComentario, ListarComentarios } from "../repositories/avaliacaoRepository.js";

let endpoints = Router();

endpoints.get('/comentarios', async (req, resp) => {
  try {
      const r = await ListarComentarios();
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


endpoints.post('/comentar', async (req,resp) => {
  try{
    const coment = req.body;

    if(!coment.usuario) {
      throw new Error('Nome de usuario é obrigatório!')
    }

    if(!coment.avaliacao){
      throw new Error('Avaliação obrigatória!')
    }

    if(!coment.comentario){
      throw new Error('Comentário obrigatório!')
    }

    let dados = await InserirComentario(coment);
    resp.send(dados);
  }

  catch(err) {
    resp.status(400).send({
      erro: err.message
    })
  }
})



export default endpoints;