import mysql from 'mysql2/promise';

const conexao = await mysql.createConnection({
    // host:process.env.MYSQL_HOST,
    // database:process.env.MYSQL_DB,
    // user:process.env.MYSQL_USER,
    // password:process.env.MYSQL_PWD,
    host:process.env.HOST,
    database:process.env.DB,
    user:process.env.USER,
    password:process.env.PWD,
    typeCast: function (field, next) {
        if(field.type === 'TINY' && field.length === 1) {
            return (field.string() === '1');
        } else {
            return next();
        }
    }
})

console.log('DB conectado com sucesso!');
export default conexao;