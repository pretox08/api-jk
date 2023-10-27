import { Router } from "express";
import { InserirComentario, ListarComentarios } from "../repositories/avaliacaoRepository.js";

let endpoints = Router();

endpoints.get('/clientes', async (req,resp) => {
    let dados = await ListarClientes();
    resp.send(dados);
})

endpoints.post('/cadastrar', async (req,resp) => {
    let comentario = req.body.comentario;

    let dados = await InserirCliente(comentario);
    resp.send(dados);
})

export default endpoints;