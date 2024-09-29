import { Global, Module } from "@nestjs/common";
import { Map } from "./map";

@Global()
@Module({
    providers: [
        {
            provide: 'MAP',
            useClass: Map,
        },
    ],
    exports: ['MAP'],
})

export class MapModule {}