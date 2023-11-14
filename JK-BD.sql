create database joiasking;
use joiasking;

create table TB_TIPO_PRODUTO (
	ID_TP_PRODUTO  int primary key auto_increment,
	TP_PRODUTO varchar(50)
);

create table TB_TP_PAGAMENTO (
	ID_TP_PAGAMENTO integer primary key auto_increment,
	TP_PAGAMENTO varchar(40)
);


create table TB_CADASTRO (
	ID_CADASTRO integer primary key auto_increment,
	DS_EMAIL varchar(100),
	DS_SENHA varchar(100),
	DS_TELEFONE varchar(100),
	DS_NOME varchar(100),
	DS_SOBRENOME varchar(100),
	DT_NASCIMENTO varchar(100)
);

create table TB_PERFIL(
	ID_PERFIL integer primary key auto_increment,
	ID_CADASTRO integer,
	CF_EMAIL varchar(100)
	foreign key(id_cadastro) references tb_cadastro(id_cadastro)
);

create table TB_CLIENTE (
	ID_CLIENTE int primary key auto_increment,
	ID_CADASTRO int,
    foreign key(id_cadastro) references TB_CADASTRO(id_cadastro)
);

create table TB_ADMIN (
	ID_ADMIN integer primary key auto_increment,
	NM_USUARIO	varchar(50),
	DS_EMAIL varchar(200),
	DS_SENHA varchar(200)
);

create table TB_ENDERECO (
	ID_ENDERECO integer primary key auto_increment,
    ID_CLIENTE integer,
	DS_RUA varchar(200),
	DS_CEP varchar(9),
	NR_CASA integer,
	DS_CIDADE varchar(80),
	DS_ESTADO varchar(100),
    foreign key(id_cliente) references TB_CLIENTE(id_cliente)
);

create table tb_comentarios(
id_comentario	int primary key auto_increment,
ds_comentario	varchar(50),
nr_avaliacao	int,
nm_usuario		varchar(20)
);

create table TB_PRODUTO (
	ID_PRODUTO  int primary key auto_increment,
	NM_PRODUTO varchar(100),
	ID_TP_PRODUTO int,
	VL_PRECO decimal(5,2),
	BT_DISPONIVEL boolean,
	QTD_ESTOQUE int,
	NR_TAMANHO int,
	DS_DETALHES varchar(300),
	IMG_PRODUTO varchar(1000),
    foreign key(id_tp_produto) references TB_TIPO_PRODUTO(id_tp_produto)
);

create table TB_CARRINHO (
	ID_CARRINHO integer primary key auto_increment,
	ID_PRODUTO integer,
    foreign key(id_produto)references TB_PRODUTO(id_produto)
);


create table TB_PEDIDO (
	ID_PEDIDO int primary key auto_increment,
	ID_CLIENTE int,
	ID_ENDERECO int,
	ID_TP_PAGAMENTO int,
	DT_PEDIDO date,
	QTD_ITENS int,
	QTD_PARCELA int,
	DS_SITUACAO boolean,
	NR_CARTAO int,
	NR_VERIFICACAO integer,
    foreign key(id_tp_pagamento) references TB_TP_PAGAMENTO(id_tp_pagamento),
    foreign key(id_cliente) references TB_CLIENTE(id_cliente),
    foreign key(id_endereco) references TB_ENDERECO(id_endereco)
);
