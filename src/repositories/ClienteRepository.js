import conexao from "./connection.js";


export async function Clientes() {
    let sql = 'select * from TB_CLIENTE';

    let resp = await conexao.query(sql);
    let dados = resp(0);

    return dados;
}




export async function InserirCliente(cadastro) {
    let comando = `
        INSERT INTO TB_CADASTRO(ds_email, ds_senha, ds_telefone, ds_nome, ds_sobrenome, dt_nascimento, ds_cpf) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    let [resp] = await conexao.query(comando, [
        cadastro.email,
        cadastro.senha,
        cadastro.telefone,
        cadastro.nome,
        cadastro.sobrenome,
        cadastro.nascimento,
        cadastro.cpf
    ]);

    cadastro.id = resp.insertId;
    return cadastro;
}



  export async function DeletarCliente(id) {
    let comando = `
        delete from TB_CLIENTE
              where ID_CLIENTE = ?
    `
  
    let [resp] = await conexao.query(comando, [id]);
    return resp.affectedRows;
  };


  

  export async  function ConsultarCliente(cpf) {
    let comando = `
        select id_cadastro      as id,
               ds_email         as email,
               ds_senha         as senha,
               ds_telefone      as telefone,
               ds_nome          as nome,
               ds_sobrenome     as sobrenome,
               dt_nascimento    as nascimento,
               ds_cpf           as cpf
          from TB_CADASTRO
         where ds_cpf like  ?
    `
  
    let [dados] = await conexao.query(comando, ['%' + cpf + '%'])
    return dados;
  };