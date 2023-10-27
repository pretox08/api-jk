import { Router } from "express";
import { InserirProduto, DeletarProduto, ConsultarProduto, listarProdutos } from "../repositories/ProdutoRepository.js";

let endpoints = Router();


endpoints.get('/produtos', async (resp) => {
    let dados = await listarProdutos();
    resp.send(dados);
})



endpoints.post('/produtos', async (req,resp) => {
    let produto = req.body;

    let dados = await InserirProduto(produto);
    resp.send(dados);
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