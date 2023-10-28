import conexao from "./connection.js";

export async function ListarComentarios() {
    let sql = 'select * from tb_comentarios';

    let resp = await conexao.query(sql);
    let dados = resp(0);

    return dados;
}

export async function InserirComentario(coment) {
    let comando = 'insert into tb_comentarios(ds_comentario, nr_avaliacao, nm_usuario) values(?, ?, ?)'

    let [resp] = await conexao.query(comando, [
        coment.comentario,
        coment.avaliacao,
        coment.usuario
    ]);

    coment.id = resp.insertId;
    return coment;
}