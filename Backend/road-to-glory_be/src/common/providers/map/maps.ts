import { Injectable } from "@nestjs/common";
import { Map } from 'src/common/providers/map/map';

@Injectable()
export class Maps{
    private maps: {[room: string]: Map} = {};

    constructor() {}

    getMap(room: string): Map {
        return this.maps[room];
    }

    doesMapExist(room: string): boolean{
        if(this.maps.hasOwnProperty(room))
            return true;
        else
            return false;
    }

    createMap(room: string) {
        this.maps[room] = new Map();
    }

    deleteMap(room: string) {
        delete this.maps[room];
    }
}