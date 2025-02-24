import { Router } from "express";
import { Cadastro, Login, LoginAdm } from "../repositories/ClienteRepository.js";

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
    resp.status(400).send({
      erro: err.message
    });
  }
})


endpoints.post('/cadastro', async (req, resp) => {
  try {
    const cliente = req.body;
    
    if (!cliente.nome)
      throw new Error('Nome é obrigatório');

    if (!cliente.nascimento)
      throw new Error('Data de nascimento é obrigatória');

    if (!cliente.telefone)
      throw new Error('Telefone é obrigatório');

    if (!cliente.cpf)
      throw new Error('CPF é obrigatório');

    if (!cliente.genero)
      throw new Error('Gênero é obrigatório');

    if (!cliente.email)
      throw new Error('Email é obrigatório');

    if (!cliente.senha)
      throw new Error('Senha é obrigatória');

    const r = await Cadastro(cliente);
    resp.send(r);
  } catch (err) {
    resp.status(400).send({
      erro: err.message
    });
  }
});


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
    resp.status(400).send({
      erro: err.message
    });
  }
})



export default endpoints;