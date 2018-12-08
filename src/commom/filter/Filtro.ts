import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch()
export class Filtro implements ExceptionFilter {
    catch ( exception: any, host: ArgumentsHost ) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        if ( status == 404 ) {
            response
                .status( status )
                .json( {
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    message: 'A URL acessada não foi encontrada nesta API.'
                } );
        }
        else if ( status == 500 ) {
            response
                .status( status )
                .json( {
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    message: 'Erro interno do servidor'
                } );
        }
        else {
            response
                .status( status )
                .json( {
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    message: 'Erro não especificado'
                } );
        }
    }
}
