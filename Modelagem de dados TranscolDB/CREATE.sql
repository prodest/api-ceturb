/*
SCRIPT DE CREATE COPIADO E ADAPTADO DA ESTRUTURA GERADA PELO TYPEORM  DENTRO DO SQL SERVER USANDO DBEAVER.
EXECUTE OS CREATES ABAIXO UM DE CADA VEZ NO DBEAVER.
 */

CREATE TABLE GoogleTransit.dbo.agencia (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2(7) DEFAULT (getdate()) NOT NULL,
	atualizadoem datetime2(7) DEFAULT (getdate()) NOT NULL,
	nome nvarchar(255) NOT NULL,
	url nvarchar(255) NOT NULL,
	telefone nvarchar(255) NOT NULL,
	historico bit DEFAULT ((0)) NOT NULL,
	CONSTRAINT PK_014a655a9dc72831c3712b7eb9b PRIMARY KEY (id)
) go
-----------------
CREATE UNIQUE INDEX IDX_ae6f96e90d951e9e8c68e3930b ON GoogleTransit.dbo.agencia (url) go
--------------------------
CREATE UNIQUE INDEX IDX_c44350547be6b7a422fdfddc7b ON GoogleTransit.dbo.agencia (nome) go;
----------

CREATE TABLE GoogleTransit.dbo.feriado (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2(7) DEFAULT (getdate()) NOT NULL,
	atualizadoem datetime2(7) DEFAULT (getdate()) NOT NULL,
	nome nvarchar(255) NOT NULL,
	data date NOT NULL,
	dataupload date NOT NULL,
	agencia_id int NOT NULL,
	CONSTRAINT PK_2072c517b28f6f679963493663e PRIMARY KEY (id),
	CONSTRAINT FK_feb513ac77758daba4301714e19 FOREIGN KEY (agencia_id) REFERENCES GoogleTransit.dbo.agencia(id)
) go;
------------

CREATE TABLE GoogleTransit.dbo.contato (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2(7) DEFAULT (getdate()) NOT NULL,
	atualizadoem datetime2(7) DEFAULT (getdate()) NOT NULL,
	nome nvarchar(255) NOT NULL,
	email nvarchar(255) NOT NULL,
	ativo bit NOT NULL,
	agencia_id int NOT NULL,
	CONSTRAINT PK_9592a5553a9dfaeebe7d0cd0e5b PRIMARY KEY (id),
	CONSTRAINT FK_97b3a1f6fbd85563941e496cd7e FOREIGN KEY (agencia_id) REFERENCES GoogleTransit.dbo.agencia(id)
) go
----------------------------------------
CREATE UNIQUE INDEX IDX_44d7ccac6a07ce215335a3ade8 ON GoogleTransit.dbo.contato (nome) go
----------------------------
CREATE UNIQUE INDEX IDX_f0323061835775208d577ffabc ON GoogleTransit.dbo.contato (email) go;
-----------------

CREATE TABLE GoogleTransit.dbo.tarifa (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2(7) DEFAULT (getdate()) NOT NULL,
	atualizadoem datetime2(7) DEFAULT (getdate()) NOT NULL,
	preco float NOT NULL,
	dataupload date NOT NULL,
	agencia_id int NOT NULL,
	CONSTRAINT PK_d213dfbdddef2bfd7b47b6c1e24 PRIMARY KEY (id),
	CONSTRAINT FK_b5cbf67b1a9bf52beac00b79f2c FOREIGN KEY (agencia_id) REFERENCES GoogleTransit.dbo.agencia(id)
) go;
-------------------

CREATE TABLE GoogleTransit.dbo.vigencia (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2(7) DEFAULT (getdate()) NOT NULL,
	atualizadoem datetime2(7) DEFAULT (getdate()) NOT NULL,
	domingo bit NOT NULL,
	segunda bit NOT NULL,
	terca bit NOT NULL,
	quarta bit NOT NULL,
	quinta bit NOT NULL,
	sexta bit NOT NULL,
	sabado bit NOT NULL,
	CONSTRAINT PK_1c8a4f959d6653320e43384ac55 PRIMARY KEY (id)
) go;
-----------------------------
CREATE TABLE GoogleTransit.dbo.linha (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2(7) DEFAULT (getdate()) NOT NULL,
	atualizadoem datetime2(7) DEFAULT (getdate()) NOT NULL,
	id_geocontrol int NOT NULL,
	codigo nvarchar(255) NOT NULL,
	descricao nvarchar(255) NOT NULL,
	status bit NOT NULL,
	diautil bit DEFAULT ((0)) NOT NULL,
	sabado bit DEFAULT ((0)) NOT NULL,
	domingo bit DEFAULT ((0)) NOT NULL,
	historico bit DEFAULT ((0)) NOT NULL,
	agencia_id int NOT NULL,
	CONSTRAINT PK_0ffd987432071dbe15c6d4bf52b PRIMARY KEY (id),
	CONSTRAINT FK_ac2b1af8c82fd3914e391b056a1 FOREIGN KEY (agencia_id) REFERENCES GoogleTransit.dbo.agencia(id)
) go;
----------------------

CREATE TABLE GoogleTransit.dbo.linha_tarifa_vigencia (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2(7) DEFAULT (getdate()) NOT NULL,
	atualizadoem datetime2(7) DEFAULT (getdate()) NOT NULL,
	linha_id int NOT NULL,
	vigencia_id int NOT NULL,
	tarifa_id int NOT NULL,
	CONSTRAINT PK_656fe7742c3dcf4c4ce7c7ecf2f PRIMARY KEY (id),
	CONSTRAINT FK_3624a631eca97046e9c6641587a FOREIGN KEY (tarifa_id) REFERENCES GoogleTransit.dbo.tarifa(id),
	CONSTRAINT FK_8808e5cd05ad10200318bebac14 FOREIGN KEY (linha_id) REFERENCES GoogleTransit.dbo.linha(id),
	CONSTRAINT FK_e634a0138a0b393f096a9766ff9 FOREIGN KEY (vigencia_id) REFERENCES GoogleTransit.dbo.vigencia(id)
) go;

------------


CREATE TABLE GoogleTransit.dbo.ponto (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2(7) DEFAULT (getdate()) NOT NULL,
	atualizadoem datetime2(7) DEFAULT (getdate()) NOT NULL,
	id_geocontrol int,
	terminal bit NOT NULL,
	codigo nvarchar(255) NOT NULL,
	municipio nvarchar(255) NOT NULL,
	logradouro nvarchar(255),
	latitude nvarchar(255) NOT NULL,
	longitude nvarchar(255) NOT NULL,
	referencia nvarchar(255),
	azimute int NOT NULL,
	historico bit DEFAULT ((0)) NOT NULL,
	CONSTRAINT PK_5b69f3e93c4fbf077ad2050682f PRIMARY KEY (id)
) go;
---------------------------

CREATE TABLE GoogleTransit.dbo.itinerario (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2(7) DEFAULT (getdate()) NOT NULL,
	atualizadoem datetime2(7) DEFAULT (getdate()) NOT NULL,
	id_geocontrol int NOT NULL,
	codigo nvarchar(255) NOT NULL,
	bandeira nvarchar(255) NOT NULL,
	historico bit DEFAULT ((0)) NOT NULL,
	linha_id int NOT NULL,
	CONSTRAINT PK_2baffe7dba24ce00639ec81f961 PRIMARY KEY (id),
	CONSTRAINT FK_d0685388290522e49d70b3637d0 FOREIGN KEY (linha_id) REFERENCES GoogleTransit.dbo.linha(id)
) go;

-----------------------
CREATE TABLE GoogleTransit.dbo.itinerario_ponto (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2(7) DEFAULT (getdate()) NOT NULL,
	atualizadoem datetime2(7) DEFAULT (getdate()) NOT NULL,
	embarque bit NOT NULL,
	desembarque bit NOT NULL,
	ordem int NOT NULL,
	historico bit DEFAULT ((0)) NOT NULL,
	ponto_id int NOT NULL,
	itinerario_id int NOT NULL,
	CONSTRAINT PK_b67a74149ef5d05809af31c96d3 PRIMARY KEY (id),
	CONSTRAINT FK_962da8010635564fb00ac2e298a FOREIGN KEY (ponto_id) REFERENCES GoogleTransit.dbo.ponto(id),
	CONSTRAINT FK_db70adc54fcd4b9efb33f318f57 FOREIGN KEY (itinerario_id) REFERENCES GoogleTransit.dbo.itinerario(id)
) go;

---------------------------
CREATE TABLE GoogleTransit.dbo.pontogeografico (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2(7) DEFAULT (getdate()) NOT NULL,
	atualizadoem datetime2(7) DEFAULT (getdate()) NOT NULL,
	latitude nvarchar(255) NOT NULL,
	longitude nvarchar(255) NOT NULL,
	altitude nvarchar(255),
	sequencia int NOT NULL,
	dataupload date NOT NULL,
	itinerario_id int NOT NULL,
	CONSTRAINT PK_857df3651aaa565538448f9c0f7 PRIMARY KEY (id),
	CONSTRAINT FK_934fc10a9593a4d2b57ff6ce9df FOREIGN KEY (itinerario_id) REFERENCES GoogleTransit.dbo.itinerario(id)
) go;
--------------------------
CREATE TABLE GoogleTransit.dbo.viagem (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2(7) DEFAULT (getdate()) NOT NULL,
	atualizadoem datetime2(7) DEFAULT (getdate()) NOT NULL,
	horadasaida datetime NOT NULL,
	horadachegada datetime NOT NULL,
	veiculo nvarchar(255) NOT NULL,
	acessibilidade bit NOT NULL,
	diautil bit DEFAULT ((0)) NOT NULL,
	sabado bit DEFAULT ((0)) NOT NULL,
	domingo bit DEFAULT ((0)) NOT NULL,
	historico bit DEFAULT ((0)) NOT NULL,
	itinerario_id int NOT NULL,
	CONSTRAINT PK_a2191e12f865bbe656e9a958f72 PRIMARY KEY (id),
	CONSTRAINT FK_ef85306fdedfcb0440c71e8e132 FOREIGN KEY (itinerario_id) REFERENCES GoogleTransit.dbo.itinerario(id)
) go;
-------------------------------

CREATE TABLE GoogleTransit.dbo.estimativa (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2(7) DEFAULT (getdate()) NOT NULL,
	atualizadoem datetime2(7) DEFAULT (getdate()) NOT NULL,
	datadecoleta date NOT NULL,
	horarionoponto time(7) NOT NULL,
	pontofinal bit NOT NULL,
	historico bit DEFAULT ((0)) NOT NULL,
	ponto_id int NOT NULL,
	viagem_id int NOT NULL,
	CONSTRAINT PK_ca185d548979052034790fb497d PRIMARY KEY (id),
	CONSTRAINT FK_3edd2c6510db1940e5376875932 FOREIGN KEY (viagem_id) REFERENCES GoogleTransit.dbo.viagem(id),
	CONSTRAINT FK_c3aa9f12682c09fba4ac5581748 FOREIGN KEY (ponto_id) REFERENCES GoogleTransit.dbo.ponto(id)
) go;

