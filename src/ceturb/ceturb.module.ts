import { Module, HttpModule } from "@nestjs/common";
import { PontosController } from './controllers/pontos.controller';
import { LinhasController } from './controllers/linhas.controller';
import { PontoService } from "./services/ponto.ceturb.service";
import { LinhasService } from './services/linhas.service';
import { ViagensController } from "./controllers/viagens.controller";
import { ViagensService } from "./services/viagens.service";
import { ItinerariosController } from "./controllers/itinerarios.controller";
import { ItinerariosService } from "./services/itinerarios.service";
import { EstimativasController } from "./controllers/estimativas.controller";
import { EstimativasService } from "./services/estimativas.service";
import { GtfsService } from './services/gtfs.service';
import { GtfsController } from './controllers/gtfs.controller';
import { MinioService } from './services/minio.service'
import { SwaggerService } from "./services/swagger.service";
import { SwaggerController } from "./controllers/swagger.controller";

@Module( {
  imports: [ HttpModule ],
  controllers: [ PontosController, LinhasController, ViagensController,
    ItinerariosController,
    EstimativasController, GtfsController, SwaggerController ],
  providers: [ PontoService, LinhasService, ViagensService, ItinerariosService,
    EstimativasService, GtfsService, MinioService, SwaggerService ]
} )



export class CeturbModule { }
