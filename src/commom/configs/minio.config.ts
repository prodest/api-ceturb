const MINIO_ADDRESS: string = process.env.MINIO_ADDRESS || 'http://127.0.0.1:9000';
const MINIO_SECRETKEY: string = process.env.MINIO_SECRETKEY || 'admin123';
const MINIO_KEY: string = process.env.MINIO_KEY || 'admin';


export class MinioConfig {
    constructor(
        readonly address: string = MINIO_ADDRESS,
        readonly secretKey: string = MINIO_SECRETKEY,
        readonly key: string = MINIO_KEY,
        readonly configHost: string = './mc config host add minio',
        readonly createBucket: string = './mc mb minio/gtfs',
        readonly policyDownload: string = './mc policy download minio/gtfs',
        readonly list: string = './mc ls minio/gtfs'
    ) { }
}
