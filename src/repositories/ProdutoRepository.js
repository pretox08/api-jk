import conexao from "./connection.js";


export async function listarProdutos() {
    let sql = 'select * from tb_produto';

    let resp = await conexao.query(sql);
    let dados = resp(0);

    return dados;
}




export async function InserirProduto(produto) {
    let comando = `
        INSERT INTO TB_PRODUTO(nm_produto, id_tp_produto, vl_preco, bt_disponivel, qtd_estoque, nr_tamanho, ds_detalhes, img_produto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    let [resp] = await conexao.query(comando, [
        produto.nome,
        produto.tipo,
        produto.preco,
        produto.disponivel,
        produto.estoque,
        produto.tamanho,
        produto.detalhes,
        produto.imagem
    ]);

    produto.id = resp.insertId;
    return produto;
}



  export async function DeletarProduto(id) {
    let comando = `
        delete from tb_produto
              where id_produto = ?
    `
  
    let [resp] = await conexao.query(comando, [id]);
    return resp.affectedRows;
  };


  

  export async  function ConsultarProduto(nome) {
    let comando = `
        select id_cliente       as id,
               nm_produto       as nome,
               id_tp_produto    as tipo,
               vl_preco         as preco,
               bt_disponivel    as disponivel,
               qtd_estoque      as estoque,
               nr_tamanho       as tamanho,
               ds_detalhes      as detalhes,
               img_produto      as imagem
          from tb_produto
         where nm_produto like  ?
    `
  
    let [dados] = await conexao.query(comando, ['%' + nome + '%'])
    return dados;
  };