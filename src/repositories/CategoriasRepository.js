import conexao from "./connection.js";

  

export async function ConsultarAlianca() {
  let sql = `select   id_produto       as id,
                          nm_produto       as nome,
                          id_tp_produto    as tipo,
                          vl_preco         as preco,
                          qtd_estoque      as estoque,
                          nr_tamanho       as tamanho,
                          ds_detalhes      as detalhes,
                          img_produto      as imagem,
                          cod_produto      as codigo
                        from tb_produto
                        where id_tp_produto = 1`;
      
      let [resp] = await conexao.query(sql);
      return resp;
}

export async function ConsultarPet() {
  let sql = `select   id_produto           as id,
                          nm_produto       as nome,
                          id_tp_produto    as tipo,
                          vl_preco         as preco,
                          qtd_estoque      as estoque,
                          nr_tamanho       as tamanho,
                          ds_detalhes      as detalhes,
                          img_produto      as imagem,
                          cod_produto      as codigo
                        from tb_produto
                        where id_tp_produto = 2`;
      
      let [resp] = await conexao.query(sql);
      return resp;
}

export async function ConsultarColar() {
  let sql = `select       id_produto       as id,
                          nm_produto       as nome,
                          id_tp_produto    as tipo,
                          vl_preco         as preco,
                          qtd_estoque      as estoque,
                          nr_tamanho       as tamanho,
                          ds_detalhes      as detalhes,
                          img_produto      as imagem,
                          cod_produto      as codigo
                        from tb_produto
                        where id_tp_produto = 3`;
      
      let [resp] = await conexao.query(sql);
      return resp;
}

export async function ConsultarAnel() {
  let sql = `select       id_produto       as id,
                          nm_produto       as nome,
                          id_tp_produto    as tipo,
                          vl_preco         as preco,
                          qtd_estoque      as estoque,
                          nr_tamanho       as tamanho,
                          ds_detalhes      as detalhes,
                          img_produto      as imagem,
                          cod_produto      as codigo
                        from tb_produto
                        where id_tp_produto = 4`;
      
      let [resp] = await conexao.query(sql);
      return resp;
}

export async function ConsultarBrinco() {
  let sql = `select       id_produto       as id,
                          nm_produto       as nome,
                          id_tp_produto    as tipo,
                          vl_preco         as preco,
                          qtd_estoque      as estoque,
                          nr_tamanho       as tamanho,
                          ds_detalhes      as detalhes,
                          img_produto      as imagem,
                          cod_produto      as codigo
                        from tb_produto
                        where id_tp_produto = 5`;
      
      let [resp] = await conexao.query(sql);
      return resp;
}

export async function ConsultarNamorados() {
  let sql = `select       id_produto       as id,
                          nm_produto       as nome,
                          id_tp_produto    as tipo,
                          vl_preco         as preco,
                          qtd_estoque      as estoque,
                          nr_tamanho       as tamanho,
                          ds_detalhes      as detalhes,
                          img_produto      as imagem,
                          cod_produto      as codigo
                        from tb_produto
                        where id_tp_produto = 6`;
      
      let [resp] = await conexao.query(sql);
      return resp;
}