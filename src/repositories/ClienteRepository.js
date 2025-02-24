import conexao from "./connection.js";


export async function Login(email, senha) {
  const comando = `
    select tb_usuario.id_usuario      as id,
           nm_usuario                 as nome
        from tb_usuario
        inner join tb_login_usuario on tb_login_usuario.id_usuario = tb_usuario.id_usuario
      where ds_email = ?
        and ds_senha = md5(?)
  `

  const [linhas] = await conexao.query(comando, [email, senha])
  return linhas[0];
}


export async function Cadastro(cliente) {
  const comando = `
    insert into tb_usuario (nm_usuario, dt_nascimento, ds_telefone, ds_cpf, ds_genero)
    values (?, ?, ?, ?, ?)
  `

  const [respUsuario] = await conexao.query(comando,
     [cliente.nome,
      cliente.nascimento, 
      cliente.telefone, 
      cliente.cpf, 
      cliente.genero]);

  const idUsuario = respUsuario.insertId;

  const comandoLogin = `
    insert into tb_login_usuario (id_usuario, ds_email, ds_senha)
    values (?, ?, md5(?))
  `;

  await conexao.query(comandoLogin, [idUsuario, cliente.email, cliente.senha]);

  cliente.id = idUsuario;
  return cliente;
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