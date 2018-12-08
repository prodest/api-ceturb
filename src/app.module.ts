import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { CeturbModule } from "./ceturb/ceturb.module";
import { TranscolDBModule } from "./transcolDB/transcolDB.module";
import { PontosController } from "./ceturb/controllers/pontos.controller";
import { ItinerariosController } from "./ceturb/controllers/itinerarios.controller";
import { ViagensController } from "./ceturb/controllers/viagens.controller";
import { LinhasController } from "./ceturb/controllers/linhas.controller";
import { EstimativasController } from "./ceturb/controllers/estimativas.controller";
import { BDAgenciaController } from "./transcolDB/controllers/bd.agencia.controller";
import { BDItinerarioController } from "./transcolDB/controllers/bd.itinerario.controller";
import { DefaultController } from "./default.controller";
import { RedisConfig } from "./commom/configs/redis.config";
import { SwaggerController } from "ceturb/controllers/swagger.controller";
const redisConf = new RedisConfig();


@Module( {
  imports: [ CeturbModule, TranscolDBModule ],
  controllers: [ DefaultController ]
} )

export class AppModule implements NestModule {
  configure ( consumer: MiddlewareConsumer ) {
    consumer
      .apply( redisConf.cacheWithRedis( '3 hours' ) )
      .forRoutes( PontosController );
    consumer
      .apply( redisConf.cacheWithRedis( '3 hours' ) )
      .forRoutes( ItinerariosController );
    consumer
      .apply( redisConf.cacheWithRedis( '3 hours' ) )
      .forRoutes( ViagensController );
    consumer
      .apply( redisConf.cacheWithRedis( '3 hours' ) )
      .forRoutes( LinhasController );
    consumer
      .apply( redisConf.cacheWithRedis( '10 seconds' ) )
      .forRoutes( EstimativasController );
    consumer
      .apply( redisConf.cacheWithRedis( '3 hours' ) )
      .forRoutes( BDAgenciaController );
    consumer
      .apply( redisConf.cacheWithRedis( '3 hours' ) )
      .forRoutes( BDItinerarioController );
    consumer
      .apply( redisConf.cacheWithRedis( '24 hours' ) )
      .forRoutes( SwaggerController );
  }
}
