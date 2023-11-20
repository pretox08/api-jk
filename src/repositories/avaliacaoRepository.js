import conexao from "./connection.js";

export async function ListarComentarios() {
    let sql = `select id_comentarios       as id,
                      ds_comentario         as comentario,
                      nr_avaliacao         as avaliacao,
                      nm_usuario           as usuario
                from tb_comentarios `;

    let [resp] = await conexao.query(sql);

    return resp;
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