import { Global, Module } from "@nestjs/common";
import { Map } from "./map";
import { Maps } from "./maps";

@Global()
@Module({
    providers: [
        {
            provide: 'MAPS',
            useClass: Maps,
        },
    ],
    exports: ['MAPS'],
})

export class MapModule {}