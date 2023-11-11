import conexao from "./connection.js";


  export async function listarProdutos() {
    let sql = `select id_produto       as id,
                      nm_produto       as nome,
                      id_tp_produto    as tipo,
                      vl_preco         as preco,
                      qtd_estoque      as estoque,
                      nr_tamanho       as tamanho,
                      ds_detalhes      as detalhes
                from tb_produto `;

    let [resp] = await conexao.query(sql);

    return resp;
}



  export async function InserirProduto(produto) {
    let comando = `
        INSERT INTO TB_PRODUTO(nm_produto, id_tp_produto, vl_preco, qtd_estoque, nr_tamanho, ds_detalhes) VALUES (?, ?, ?, ?, ?, ?)
    `;

    let [resp] = await conexao.query(comando, [
        produto.nome,
        produto.tipo,
        produto.preco,
        produto.estoque,
        produto.tamanho,
        produto.detalhes,
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



  export async function EditarProduto(id, produto) {
      const comando = 
      `update tb_produto
              set nm_produto =    ?,
                  id_tp_produto = ?,
                  vl_preco =      ?,
                  qtd_estoque =   ?,
                  nr_tamanho =    ?,
                  ds_detalhes =   ?
            where id_produto =    ?
      `

      const [r] = await conexao.query(comando, [
        produto.nome,
        produto.tipo,
        produto.preco,
        produto.estoque,
        produto.tamanho,
        produto.detalhes,
        id
      ])

      return r.affectedRows
  }




  export async function InserirImagem(imagem, id) {

    const comando = 
    `update tb_produto
          set IMG_PRODUTO = ?
          where id_produto = ?`
    
    const [r] = await conexao.query(comando, [imagem,id]);
    return r.affectedRows;
  }


  
  

  export async  function ConsultarProduto(nome) {
    let comando = `
        select id_produto       as id,
               nm_produto       as nome,
               id_tp_produto    as tipo,
               vl_preco         as preco,
               qtd_estoque      as estoque,
               nr_tamanho       as tamanho,
               ds_detalhes      as detalhes,
               img_produto      as imagem
          from tb_produto
         where nm_produto like  ?
    `
  
    let [dados] = await conexao.query(comando, [`%${nome}%`])
    return dados;
  };