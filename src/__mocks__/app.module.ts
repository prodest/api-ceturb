import { Module } from "@nestjs/common";
import { CeturbModule } from "../ceturb/ceturb.module";
import { TranscolDBModule } from "../transcolDB/transcolDB.module";




@Module( {
  imports: [ CeturbModule, TranscolDBModule ]
} )

export class AppModule { }
