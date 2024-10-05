import { Position } from "src/common/models/position/position.model";

export class Map{
    private positions: Position[][];
    private number_of_rows: number;
    private number_of_columns: number;

    constructor() {
        this.positions = this.initializeMap();
    }


    getPosition(x_coor: number, y_coor: number): Position {
        return this.positions[x_coor][y_coor];
    }

    setOwner(x_coor: number, y_coor: number, owner: string) {
        this.positions[x_coor][y_coor].owner = owner;
    }

    getOwner(x_coor: number, y_coor: number): string {
        return this.positions[x_coor][y_coor].owner;
    }

    setType(x_coor: number, y_coor: number, type: string) {
        this.positions[x_coor][y_coor].type = type;
    }

    getType(x_coor: number, y_coor: number): string {
        return this.positions[x_coor][y_coor].type;
    }

    getNumberOfRows(): number {
        return this.number_of_rows;
    }

    getNumberOfColumns(): number {
        return this.number_of_columns;
    }

    //Inicijalizuj mapu
    private initializeMap(): Position[][] {
        return;
    }
}