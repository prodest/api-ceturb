-- Drop table

-- DROP TABLE tempdb.dbo.agencia

CREATE TABLE tempdb.dbo.agencia (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2 GENERATED ALWAYS AS ROW START NOT NULL,
	atualizadoem datetime2 GENERATED ALWAYS AS ROW END NOT NULL,
	nome nvarchar(255) NOT NULL,
	url nvarchar(255) NOT NULL,
	telefone nvarchar(255) NOT NULL,
    PERIOD FOR SYSTEM_TIME (dataregistro, atualizadoem),
	CONSTRAINT PK_014a655a9dc72831c3712b7eb9b PRIMARY KEY (id)
) with ( SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.agencia_historico)) go
CREATE UNIQUE INDEX IDX_ae6f96e90d951e9e8c68e3930b ON tempdb.dbo.agencia (url) go
CREATE UNIQUE INDEX IDX_c44350547be6b7a422fdfddc7b ON tempdb.dbo.agencia (nome) go;

-- Drop table

-- DROP TABLE tempdb.dbo.contato

CREATE TABLE tempdb.dbo.contato (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2 GENERATED ALWAYS AS ROW START NOT NULL,
	atualizadoem datetime2 GENERATED ALWAYS AS ROW END NOT NULL,
	nome nvarchar(255) NOT NULL,
	email nvarchar(255) NOT NULL,
	ativo bit NOT NULL,
	agencia_id int NOT NULL,
	CONSTRAINT PK_9592a5553a9dfaeebe7d0cd0e5b PRIMARY KEY (id),
	CONSTRAINT FK_97b3a1f6fbd85563941e496cd7e FOREIGN KEY (agencia_id) REFERENCES tempdb.dbo.agencia(id) ON DELETE RESTRICT ON UPDATE RESTRICT
) go
CREATE UNIQUE INDEX IDX_44d7ccac6a07ce215335a3ade8 ON tempdb.dbo.contato (nome) go
CREATE UNIQUE INDEX IDX_f0323061835775208d577ffabc ON tempdb.dbo.contato (email) go;

-- Drop table

-- DROP TABLE tempdb.dbo.estimativa

CREATE TABLE tempdb.dbo.estimativa (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2 GENERATED ALWAYS AS ROW START NOT NULL,
	atualizadoem datetime2 GENERATED ALWAYS AS ROW END NOT NULL,
	datadecoleta date(0) NOT NULL,
	horarionoponto time(7) NOT NULL,
	pontofinal bit NOT NULL,
	ponto_id int NOT NULL,
	viagem_id int NOT NULL,
    PERIOD FOR SYSTEM_TIME (dataregistro, atualizadoem),
	CONSTRAINT PK_ca185d548979052034790fb497d PRIMARY KEY (id),
	CONSTRAINT FK_3edd2c6510db1940e5376875932 FOREIGN KEY (viagem_id) REFERENCES tempdb.dbo.viagem(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT FK_c3aa9f12682c09fba4ac5581748 FOREIGN KEY (ponto_id) REFERENCES tempdb.dbo.ponto(id) ON DELETE RESTRICT ON UPDATE RESTRICT
) with ( SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.estimativa_historico)) go;

-- Drop table

-- DROP TABLE tempdb.dbo.feriado

CREATE TABLE tempdb.dbo.feriado (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2 GENERATED ALWAYS AS ROW START NOT NULL,
	atualizadoem datetime2 GENERATED ALWAYS AS ROW END NOT NULL,
	nome nvarchar(255) NOT NULL,
	[data] date(0) NOT NULL,
	dataupload date(0) NOT NULL,
	agencia_id int NOT NULL,
	CONSTRAINT PK_2072c517b28f6f679963493663e PRIMARY KEY (id),
	CONSTRAINT FK_feb513ac77758daba4301714e19 FOREIGN KEY (agencia_id) REFERENCES tempdb.dbo.agencia(id) ON DELETE RESTRICT ON UPDATE RESTRICT
) go;

-- Drop table

-- DROP TABLE tempdb.dbo.itinerario

CREATE TABLE tempdb.dbo.itinerario (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2 GENERATED ALWAYS AS ROW START NOT NULL,
	atualizadoem datetime2 GENERATED ALWAYS AS ROW END NOT NULL,
	id_geocontrol int NOT NULL,
	codigo nvarchar(255) NOT NULL,
	bandeira nvarchar(255) NOT NULL,
	linha_id int NOT NULL,
    PERIOD FOR SYSTEM_TIME (dataregistro, atualizadoem),
	CONSTRAINT PK_2baffe7dba24ce00639ec81f961 PRIMARY KEY (id),
	CONSTRAINT FK_d0685388290522e49d70b3637d0 FOREIGN KEY (linha_id) REFERENCES tempdb.dbo.linha(id) ON DELETE RESTRICT ON UPDATE RESTRICT
) with ( SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.itinerario_historico)) go;

-- Drop table

-- DROP TABLE tempdb.dbo.itinerario_ponto

CREATE TABLE tempdb.dbo.itinerario_ponto (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2 GENERATED ALWAYS AS ROW START NOT NULL,
	atualizadoem datetime2 GENERATED ALWAYS AS ROW END NOT NULL,
	embarque bit NOT NULL,
	desembarque bit NOT NULL,
	ordem int NOT NULL,
	ponto_id int NOT NULL,
	itinerario_id int NOT NULL,
    PERIOD FOR SYSTEM_TIME (dataregistro, atualizadoem),
	CONSTRAINT PK_b67a74149ef5d05809af31c96d3 PRIMARY KEY (id),
	CONSTRAINT FK_962da8010635564fb00ac2e298a FOREIGN KEY (ponto_id) REFERENCES tempdb.dbo.ponto(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT FK_db70adc54fcd4b9efb33f318f57 FOREIGN KEY (itinerario_id) REFERENCES tempdb.dbo.itinerario(id) ON DELETE RESTRICT ON UPDATE RESTRICT
) with ( SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.itinerario_ponto_historico)) go;

-- Drop table

-- DROP TABLE tempdb.dbo.linha

CREATE TABLE tempdb.dbo.linha (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2 GENERATED ALWAYS AS ROW START NOT NULL,
	atualizadoem datetime2 GENERATED ALWAYS AS ROW END NOT NULL,
	id_geocontrol int NOT NULL,
	codigo nvarchar(255) NOT NULL,
	descricao nvarchar(255) NOT NULL,
	status bit NOT NULL,
	diautil bit DEFAULT ((0)) NOT NULL,
	sabado bit DEFAULT ((0)) NOT NULL,
	domingo bit DEFAULT ((0)) NOT NULL,
	agencia_id int NOT NULL,
    PERIOD FOR SYSTEM_TIME (dataregistro, atualizadoem),
	CONSTRAINT PK_0ffd987432071dbe15c6d4bf52b PRIMARY KEY (id),
	CONSTRAINT FK_ac2b1af8c82fd3914e391b056a1 FOREIGN KEY (agencia_id) REFERENCES tempdb.dbo.agencia(id) ON DELETE RESTRICT ON UPDATE RESTRICT
) with ( SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.linha_historico)) go;

-- Drop table

-- DROP TABLE tempdb.dbo.linha_tarifa_vigencia

CREATE TABLE tempdb.dbo.linha_tarifa_vigencia (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2 GENERATED ALWAYS AS ROW START NOT NULL,
	atualizadoem datetime2 GENERATED ALWAYS AS ROW END NOT NULL,
	linha_id int NOT NULL,
	vigencia_id int NOT NULL,
	tarifa_id int NOT NULL,
	CONSTRAINT PK_656fe7742c3dcf4c4ce7c7ecf2f PRIMARY KEY (id),
	CONSTRAINT FK_3624a631eca97046e9c6641587a FOREIGN KEY (tarifa_id) REFERENCES tempdb.dbo.tarifa(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT FK_8808e5cd05ad10200318bebac14 FOREIGN KEY (linha_id) REFERENCES tempdb.dbo.linha(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT FK_e634a0138a0b393f096a9766ff9 FOREIGN KEY (vigencia_id) REFERENCES tempdb.dbo.vigencia(id) ON DELETE RESTRICT ON UPDATE RESTRICT
) go;

-- Drop table

-- DROP TABLE tempdb.dbo.ponto

CREATE TABLE tempdb.dbo.ponto (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2 GENERATED ALWAYS AS ROW START NOT NULL,
	atualizadoem datetime2 GENERATED ALWAYS AS ROW END NOT NULL,
	id_geocontrol int,
	terminal bit NOT NULL,
	codigo nvarchar(255) NOT NULL,
	municipio nvarchar(255) NOT NULL,
	logradouro nvarchar(255),
	latitude nvarchar(255) NOT NULL,
	longitude nvarchar(255) NOT NULL,
	referencia nvarchar(255),
	azimute int NOT NULL,
    PERIOD FOR SYSTEM_TIME (dataregistro, atualizadoem),
	CONSTRAINT PK_5b69f3e93c4fbf077ad2050682f PRIMARY KEY (id)
) with ( SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.ponto_historico)) go;

-- Drop table

-- DROP TABLE tempdb.dbo.pontogeografico

CREATE TABLE tempdb.dbo.pontogeografico (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2 GENERATED ALWAYS AS ROW START NOT NULL,
	atualizadoem datetime2 GENERATED ALWAYS AS ROW END NOT NULL,
	latitude nvarchar(255) NOT NULL,
	longitude nvarchar(255) NOT NULL,
	altitude nvarchar(255),
	sequencia int NOT NULL,
	dataupload date(0) NOT NULL,
	itinerario_id int NOT NULL,
	CONSTRAINT PK_857df3651aaa565538448f9c0f7 PRIMARY KEY (id),
	CONSTRAINT FK_934fc10a9593a4d2b57ff6ce9df FOREIGN KEY (itinerario_id) REFERENCES tempdb.dbo.itinerario(id) ON DELETE RESTRICT ON UPDATE RESTRICT
) go;

-- Drop table

-- DROP TABLE tempdb.dbo.tarifa

CREATE TABLE tempdb.dbo.tarifa (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2 GENERATED ALWAYS AS ROW START NOT NULL,
	atualizadoem datetime2 GENERATED ALWAYS AS ROW END NOT NULL,
	preco float NOT NULL,
	dataupload date(0) NOT NULL,
	agencia_id int NOT NULL,
	CONSTRAINT PK_d213dfbdddef2bfd7b47b6c1e24 PRIMARY KEY (id),
	CONSTRAINT FK_b5cbf67b1a9bf52beac00b79f2c FOREIGN KEY (agencia_id) REFERENCES tempdb.dbo.agencia(id) ON DELETE RESTRICT ON UPDATE RESTRICT
) go;

-- Drop table

-- DROP TABLE tempdb.dbo.viagem

CREATE TABLE tempdb.dbo.viagem (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2 GENERATED ALWAYS AS ROW START NOT NULL,
	atualizadoem datetime2 GENERATED ALWAYS AS ROW END NOT NULL,
	horadasaida datetime(3) NOT NULL,
	horadachegada datetime(3) NOT NULL,
	veiculo nvarchar(255) NOT NULL,
	acessibilidade bit NOT NULL,
	diautil bit DEFAULT ((0)) NOT NULL,
	sabado bit DEFAULT ((0)) NOT NULL,
	domingo bit DEFAULT ((0)) NOT NULL,
	itinerario_id int NOT NULL,
    PERIOD FOR SYSTEM_TIME (dataregistro, atualizadoem),
	CONSTRAINT PK_a2191e12f865bbe656e9a958f72 PRIMARY KEY (id),
	CONSTRAINT FK_ef85306fdedfcb0440c71e8e132 FOREIGN KEY (itinerario_id) REFERENCES tempdb.dbo.itinerario(id) ON DELETE RESTRICT ON UPDATE RESTRICT
) with ( SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.viagem_historico)) go;

-- Drop table

-- DROP TABLE tempdb.dbo.vigencia

CREATE TABLE tempdb.dbo.vigencia (
	id int NOT NULL IDENTITY(1,1),
	dataregistro datetime2 GENERATED ALWAYS AS ROW START NOT NULL,
	atualizadoem datetime2 GENERATED ALWAYS AS ROW END NOT NULL,
	domingo bit NOT NULL,
	segunda bit NOT NULL,
	terca bit NOT NULL,
	quarta bit NOT NULL,
	quinta bit NOT NULL,
	sexta bit NOT NULL,
	sabado bit NOT NULL,
	CONSTRAINT PK_1c8a4f959d6653320e43384ac55 PRIMARY KEY (id)
) go;
