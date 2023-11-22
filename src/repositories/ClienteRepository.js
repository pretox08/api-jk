import conexao from "./connection.js";


export async function Login(email, senha) {
  const comando = `select id_cadastro   as id,
                   ds_email             as email,
                   ds_senha             as senha
                from tb_cadastro
                where ds_email = ?
                and ds_senha = ? `

  const [linhas] = await conexao.query(comando, [email, senha])
  return linhas[0];
}


export async function LoginAdm(email, senha) {
  const comando = `select id_admin      as id,
                   ds_email             as email,
                   ds_senha             as senha
                from tb_admin
                where ds_email = ?
                and ds_senha = ? `

  const [linhas] = await conexao.query(comando, [email, senha])
  return linhas[0];
}


export async function InserirCliente(cadastro) {
    let comando = `
        INSERT INTO tb_cadastro(ds_email, ds_senha, ds_telefone, ds_nome, ds_sobrenome, dt_nascimento, ds_cpf) VALUES (?, ?, ?, ?, ?, ?, ?)
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
        delete from tb_cadastro
              where ID_CADASTRO = ?
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
         from tb_cadastro
         where ds_cpf like  ?
    `
  
    let [dados] = await conexao.query(comando, ['%' + cpf + '%'])
    return dados;
  };