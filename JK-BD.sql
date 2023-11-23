create database joiasking;
use joiasking;



create table tb_tipo_produto (
	ID_TP_PRODUTO  int primary key auto_increment,
	TP_PRODUTO varchar(50)
);



create table tb_tp_pagamento (
	ID_TP_PAGAMENTO integer primary key auto_increment,
	TP_PAGAMENTO varchar(40)
);


create table tb_cadastro (
	ID_CADASTRO integer primary key auto_increment,
	DS_EMAIL varchar(100),
	DS_SENHA varchar(100),
	DS_TELEFONE varchar(100),
	DS_NOME varchar(100),
	DS_SOBRENOME varchar(100),
	DT_NASCIMENTO varchar(100),
    IMG_PERFIL varchar(1000)
);


create table tb_perfil(
	ID_PERFIL int primary key auto_increment,
	DS_NOME varchar(100),
	DS_SOBRENOME varchar(100),
	DS_EMAIL varchar(100),
	CF_EMAIL varchar(100),
	IMG_PERFIL varchar(10000)
	foreign key(DS_NOME) references tb_cadastro(DS_NOME)
	foreign key(DS_SOBRENOME) references tb_cadastro(DS_SOBRENOME)
	foreign key(DS_EMAIL) references tb_cadastro(DS_EMAIL)
)


create table tb_admin (
	ID_ADMIN integer primary key auto_increment,
	NM_USUARIO	varchar(50),
	DS_EMAIL varchar(200),
	DS_SENHA varchar(200)
);


create table tb_endereco(
	ID_ENDERECO integer primary key auto_increment,
    ID_CADASTRO integer,
	DS_RUA varchar(200),
	DS_CEP varchar(9),
	NR_CASA integer,
	DS_CIDADE varchar(80),
	DS_ESTADO varchar(100),
    foreign key(id_cadastro) references tb_cadastro(id_cadastro)
);


create table tb_comentarios(
id_comentarios	int primary key auto_increment,
ds_comentario	varchar(50),
nr_avaliacao	int,
nm_usuario		varchar(20)
);

create table tb_produto (
	ID_PRODUTO  int primary key auto_increment,
	NM_PRODUTO varchar(100),
	ID_TP_PRODUTO int,
	VL_PRECO decimal(5,2),
	BT_DISPONIVEL boolean,
	QTD_ESTOQUE int,
	NR_TAMANHO int,
	DS_DETALHES varchar(300),
	IMG_PRODUTO varchar(1000),
	COD_PRODUTO varchar(6),
    foreign key(id_tp_produto) references tb_tipo_produto(id_tp_produto)
);


create table tb_carrinho (
	ID_CARRINHO integer primary key auto_increment,
	ID_PRODUTO integer,
    foreign key(id_produto)references tb_produto(id_produto)
);


create table tb_pedido (
	ID_PEDIDO int primary key auto_increment,
	ID_CADASTRO int,
	ID_ENDERECO int,
	ID_TP_PAGAMENTO int,
	DT_PEDIDO date,
	QTD_ITENS int,
	QTD_PARCELA int,
	DS_SITUACAO boolean,
	NR_CARTAO int,
	NR_VERIFICACAO integer,
    foreign key(id_tp_pagamento) references tb_tp_pagamento(id_tp_pagamento),
    foreign key(id_cadastro) references tb_cadastro(id_cadastro),
    foreign key(id_endereco) references tb_endereco(id_endereco)
);
