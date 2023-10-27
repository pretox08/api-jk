import conexao from "./connection.js";

export async function listarComentarios() {
    let sql = 'select * from tb_avaliacao';

    let resp = await conexao.query(sql);
    let dados = resp(0);

    return dados;
}

export async function inserirComentario(coment) {
    let sql = 'insert into tb_avaliacao(ds_comentario, nr_avaliacao) values(?, ?)'

    let resp = await conexao.query(sql);
    let dados = resp[0];

    coment.id = dados.insertId;
    return coment;
}