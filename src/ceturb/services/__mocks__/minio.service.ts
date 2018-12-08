import { Injectable } from '@nestjs/common';
import * as shell from 'shelljs';

@Injectable()
export class MinioService {
    private readonly MINIO_ADDRESS: string = process.env.MINIO_ADDRESS || 'http://172.17.0.1:9000';
    private readonly MINIO_SECRETKEY: string = process.env.MINIO_SECRETKEY || 'admin123';
    private readonly MINIO_KEY: string = process.env.MINIO_KEY || 'admin';

    private readonly configHost: string = './mc config host add minio';
    private readonly createBucket: string = './mc mb minio/gtfs';
    private readonly policyDownload: string = './mc policy download minio/gtfs';
    private readonly list: string = './mc ls minio/gtfs';

    public async config () {
        let config = 'Added `minio` successfully.'
        return config;
    }

    public getAddress (): string {
        return this.MINIO_ADDRESS;
    }

    public async ls (): Promise<string> {
        return shell.exec( `${this.list}` ).stdout;
    }
}
