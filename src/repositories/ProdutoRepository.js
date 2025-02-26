import conexao from "./connection.js";
import randomString from 'randomstring';

  export async function listarProdutos() {
    const comando = `select id_produto       as id,
                      nm_produto       as nome,
                      id_categoria     as categoria,
                      vl_preco         as preco,
                      qtd_estoque      as estoque,
                      ds_detalhes      as detalhes,
                      cod_produto      as codigo
                from tb_produto `;

    let [resp] = await conexao.query(comando);

    return resp;
}



  export async function InserirProduto(produto) {
    const comando = `
        INSERT INTO tb_produto(nm_produto, id_categoria, vl_preco, qtd_estoque, ds_detalhes, cod_produto, dt_criacao) 
                    VALUES(?, ?, ?, ?, ?, ?, ?)
    `;

    const codigoproduto = randomString.generate(7);
    const dataAtual = new Date();

    const [resp] = await conexao.query(comando, [
        produto.nome,
        produto.categoria,
        produto.preco,
        produto.estoque,
        produto.detalhes,
        codigoproduto,
        dataAtual
    ]);

    produto.id = resp.insertId;
    produto.codigo = codigoproduto;
    produto.data = dataAtual;
    return produto;
}

export async function SalvarProdutoCategoria(idProduto, idCategoria) {
  const comando = `
              insert into tb_produto_categoria(id_produto, id_categoria)  
                      values (?, ?)
              `
  await conexao.query(comando, [idProduto, idCategoria]); 
}



  export async function DeletarProduto(id) {
    const comando = `
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
                  id_categoria =  ?,
                  vl_preco =      ?,
                  qtd_estoque =   ?,
                  ds_detalhes =   ?,
                  cod_produto =   ?
            where id_produto =    ?
      `

      const [r] = await conexao.query(comando, [
        produto.nome,
        produto.categoria,
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

    const comando = `
        update tb_produto
          set IMG_PRODUTO = ?
          where ID_PRODUTO = ?`
    
    const [r] = await conexao.query(comando, [imagem, id]);
    return r.affectedRows;
  }


  
  

  export async  function ConsultarProduto(nome) {
    const comando = `
        select ID_PRODUTO       as id,
               NM_PRODUTO       as nome,
               ID_CATEGORIA     as categoria,
               VL_PRECO         as preco,
               QTD_ESTOQUE      as estoque,
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
                      ID_CATEGORIA     as categoria,
                      VL_PRECO         as preco,
                      QTD_ESTOQUE      as estoque,
                      DS_DETALHES      as detalhes,
                      IMG_PRODUTO      as imagem,
                      COD_PRODUTO      as codigo
              from tb_produto
              where id_produto = ? `;

    let [resp] = await conexao.query(comando, [id]);
    return resp[0];
  }