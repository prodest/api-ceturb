import { Injectable } from '@nestjs/common';
const swagger = require( '../../../swagger.json' );

@Injectable()
export class SwaggerService {

    public async getJson () {
        const doc = JSON.stringify( swagger );
        return doc;
    }
}

