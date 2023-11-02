import { Router } from "express";
import { InserirComentario, ListarComentarios } from "../repositories/avaliacaoRepository.js";

let endpoints = Router();

endpoints.get('/comentarios', async (req,resp) => {
    let dados = await ListarComentarios();
    resp.send(dados);
})

endpoints.post('/comentar', async (req,resp) => {
    try {
      const { comentario, avaliacao, usuario } = req.body;
      
      const r = await InserirComentario(comentario, avaliacao, usuario);
  
      if(!r) {
        throw new Error('⚠️ Informações inválidas')
      }
      resp.send(r)
    } 
    
    catch(err) {
      resp.status(401).send({
        erro: err.message
      });
    }
  })

export default endpoints;