import { Router } from "express";
import { InserirCliente, Clientes, DeletarCliente, ConsultarCliente } from "../repositories/ClienteRepository.js";

let endpoints = Router();


endpoints.get('/clientes', async (resp) => {
    let dados = await Clientes();
    resp.send(dados);
})



endpoints.post('/cadastrar', async (req,resp) => {
    let cadastro = req.body;

    let dados = await InserirCliente(cadastro);
    resp.send(dados);
})



endpoints.delete('/cliente/:id', async (req, resp) => {
    try {
      let id = req.params.id;
      let r = await DeletarCliente(id);
      if (r == 0)
        throw new Error('Nenhum cliente pode ser excluído.');
  
      resp.send();
    }
    catch (err) {
      resp.status(500).send({ erro: err.message });
    }
  });


  endpoints.get('/cliente/busca', async (req, resp) => {
    try {
      let nome = req.query.nome;
      let r = await ConsultarCliente(nome);
      resp.send(r);
    }
    catch (err) {
      resp.status(500).send({ erro: 'Ocorreu um erro!' });
    }
  })


export default endpoints;