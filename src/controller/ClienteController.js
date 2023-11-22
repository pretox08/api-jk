import { Router } from "express";
import { InserirCliente, DeletarCliente, ConsultarCliente, Login, LoginAdm } from "../repositories/ClienteRepository.js";

const endpoints = Router();


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
  try{
    const cliente = req.body;

    if(!cliente.email) {
      throw new Error('Email é obrigatório!')
    }

    if(!cliente.senha){
      throw new Error('Senha obrigatória!')
    }

    if(!cliente.telefone){
      throw new Error('Telefone obrigatório!') 
    }

    if(!cliente.nome){
      throw new Error('Nome obrigatório!')
    }

    if(!cliente.sobrenome){
      throw new Error('Sobrenome obrigatório!')
    }

    if(!cliente.nascimento){
      throw new Error('Nascimento obrigatório!')
    }

    if(!cliente.cpf){
      throw new Error('CPF obrigatório!')
    }

    let dados = await InserirCliente(cliente);
    resp.send(dados);
  }

  catch(err) {
    resp.status(400).send({
      erro: err.message
    })
  }
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