import { Router } from "express";
import { InserirCliente, DeletarCliente, ConsultarCliente, Login, LoginAdm } from "../repositories/ClienteRepository.js";

let endpoints = Router();


endpoints.post('/login', async (req,resp) => {
  try {
    const { email, senha } = req.body;
    
    const r = await Login(email, senha);

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


endpoints.post('/loginadm', async (req,resp) => {
  try {
    const { email, senha } = req.body;
    
    const r = await LoginAdm(email, senha);

    if(!r) {
      throw new Error('⚠️ Informações incorretas!')
    }
    resp.send(r)
  } 
  
  catch(err) {
    resp.status(401).send({
      erro: err.message
    });
  }
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
      if(resp.status(500))
      {({ err: 'Ocorreu um erro!' })};
    }
  })


export default endpoints;