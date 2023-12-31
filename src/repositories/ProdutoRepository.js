import conexao from "./connection.js";


  export async function listarProdutos() {
    let sql = `select id_produto       as id,
                      nm_produto       as nome,
                      id_tp_produto    as tipo,
                      vl_preco         as preco,
                      qtd_estoque      as estoque,
                      nr_tamanho       as tamanho,
                      ds_detalhes      as detalhes,
                      cod_produto      as codigo
                from tb_produto `;

    let [resp] = await conexao.query(sql);

    return resp;
}



  export async function InserirProduto(produto) {
    let comando = `
        INSERT INTO tb_produto(nm_produto, id_tp_produto, vl_preco, qtd_estoque, nr_tamanho, ds_detalhes, cod_produto) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    let [resp] = await conexao.query(comando, [
        produto.nome,
        produto.tipo,
        produto.preco,
        produto.estoque,
        produto.tamanho,
        produto.detalhes,
        produto.codigo
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
                  ds_detalhes =   ?,
                  cod_produto =   ?
            where id_produto =    ?
      `

      const [r] = await conexao.query(comando, [
        produto.nome,
        produto.tipo,
        produto.preco,
        produto.estoque,
        produto.tamanho,
        produto.detalhes,
        produto.codigo,
        id
      ])

      return r.affectedRows
  }




  export async function InserirImagem(imagem, id) {

    const comando = 
    `update tb_produto
          set IMG_PRODUTO = ?
          where ID_PRODUTO = ?`
    
    const [r] = await conexao.query(comando, [imagem,id]);
    return r.affectedRows;
  }


  
  

  export async  function ConsultarProduto(nome) {
    let comando = `
        select ID_PRODUTO       as id,
               NM_PRODUTO       as nome,
               ID_TP_PRODUTO    as tipo,
               VL_PRECO         as preco,
               QTD_ESTOQUE      as estoque,
               NR_TAMANHO       as tamanho,
               DS_DETALHES      as detalhes,
               COD_PRODUTO      as codigo
          from tb_produto
         where nm_produto like  ?
    `
  
    let [dados] = await conexao.query(comando, [`%${nome}%`])
    return dados;
  };


  export async function BuscarPorID(id) {
    const comando = 
            `select   ID_PRODUTO       as id,
                      NM_PRODUTO       as nome,
                      ID_TP_PRODUTO    as tipo,
                      VL_PRECO         as preco,
                      QTD_ESTOQUE      as estoque,
                      NR_TAMANHO       as tamanho,
                      DS_DETALHES      as detalhes,
                      IMG_PRODUTO      as imagem,
                      COD_PRODUTO      as codigo
              from tb_produto
              where id_produto = ? `;

    let [resp] = await conexao.query(comando, [id]);
    return resp[0];
  }