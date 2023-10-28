import { Router } from "express";
import { InserirComentario, ListarComentarios } from "../repositories/avaliacaoRepository.js";

let endpoints = Router();

endpoints.get('/comentarios', async (req,resp) => {
    let dados = await ListarComentarios();
    resp.send(dados);
})

endpoints.post('/comentar', async (req,resp) => {
    let coment = req.body;

    let dados = await InserirComentario(coment);
    resp.send(dados);
})

export default endpoints;