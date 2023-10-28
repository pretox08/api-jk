import conexao from "./connection.js";


export async function Clientes() {
    let sql = 'select * from TB_CADASTRO';

    let resp = await conexao.query(sql);
    let dados = resp(0);

    return dados;
}




export async function InserirCliente(cadastro) {
    let comando = `
        INSERT INTO TB_CADASTRO(ds_email, ds_senha, ds_telefone, ds_nome, ds_sobrenome, dt_nascimento) VALUES (?, ?, ?, ?, ?, ?)
    `;

    let [resp] = await conexao.query(comando, [
        cadastro.email,
        cadastro.senha,
        cadastro.telefone,
        cadastro.nome,
        cadastro.sobrenome,
        cadastro.nascimento
    ]);

    cadastro.id = resp.insertId;
    return cadastro;
}



  export async function DeletarCliente(id) {
    let comando = `
        delete from TB_CADASTRO
              where id_cadastro = ?
    `
  
    let [resp] = await conexao.query(comando, [id]);
    return resp.affectedRows;
  };


  

  export async  function ConsultarCliente(nome) {
    let comando = `
        select id_cliente       as id,
               ds_email         as email,
               ds_senha         as senha,
               ds_telefone      as telefone,
               ds_nome          as nome,
               ds_sobrenome     as sobrenome
          from TB_CADASTRO
         where ds_nome like  ?
    `
  
    let [dados] = await conexao.query(comando, ['%' + nome + '%'])
    return dados;
  };