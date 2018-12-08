import { Injectable } from '@nestjs/common';
import * as shell from 'shelljs';
import { MinioConfig } from 'commom/configs/minio.config';

@Injectable()
export class MinioService {

    private minioConf: MinioConfig = new MinioConfig();

    public async config () {
        shell.exec( `${this.minioConf.configHost} ${this.minioConf.address} ${this.minioConf.key} '${this.minioConf.secretKey}'` );
        shell.exec( this.minioConf.createBucket )
        shell.exec( this.minioConf.policyDownload );
    }

    public getAddress (): string {
        return this.minioConf.address;
    }

    public async ls (): Promise<string> {
        return shell.exec( this.minioConf.list ).stdout;
    }
}
