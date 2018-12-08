const db_host = process.env.TRANSCOLDB_HOST || '127.0.0.1';
const db_port: number = parseInt( process.env.TRANSCOLDB_PORT ) || 1433;
const db_username = process.env.TRANSCOLDB_USER || 'SA';
const db_password = process.env.TRANSCOLDB_PASSWORD || 'Senh@Dif1cil';
const db_schema = process.env.TRANSCOLDB_SCHEMA || 'tempdb';
const orm_sync = ( process.env.TRANSCOLDB_ORM_SYNC === 'true' ) || false;

export class BancoConfig {
    constructor(
        readonly type: 'mssql' = 'mssql',
        readonly host: string = db_host,
        readonly port: number = db_port,
        readonly login: string = db_username,
        readonly password = db_password,
        readonly schema = db_schema,
        readonly sync = orm_sync
    ) { }
}
