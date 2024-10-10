import { Injectable } from "@nestjs/common";
import { Position } from "src/common/models/position/position.model";

@Injectable()
export class Map{
    private positions: Position[][];
    private number_of_rows: number;
    private number_of_columns: number;

    constructor() {
        this.positions = this.initializeMap();
        this.number_of_columns = 25;
        this.number_of_rows = 25;
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

    getTerrain(): string[][] {
        let terrain: string[][] = [];

        for(let i = 0; i < this.number_of_rows; i++){
            terrain[i] = [];
            for(let j = 0; j < this.number_of_columns; j++){
                terrain[i][j] = this.positions[i][j].terrain;
            }
        }

        return terrain;
    }

    //Inicijalizuj mapu
    private initializeMap(): Position[][] {
        let positions: Position[][] = [];
        positions[0] = [];
        positions[0][0] = {x_coor: 0, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[0][1] = {x_coor: 0, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[0][2] = {x_coor: 0, y_coor: 2, terrain: "plains", owner: "", type: ""}
        positions[0][3] = {x_coor: 0, y_coor: 3, terrain: "lake", owner: "", type: ""}
        positions[0][4] = {x_coor: 0, y_coor: 4, terrain: "lake", owner: "", type: ""}
        positions[0][5] = {x_coor: 0, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[0][6] = {x_coor: 0, y_coor: 6, terrain: "plains", owner: "", type: ""}
        positions[0][7] = {x_coor: 0, y_coor: 7, terrain: "plains", owner: "", type: ""}
        positions[0][8] = {x_coor: 0, y_coor: 8, terrain: "plains", owner: "", type: ""}
        positions[0][9] = {x_coor: 0, y_coor: 9, terrain: "plains", owner: "", type: ""}
        positions[0][10] = {x_coor: 0, y_coor: 10, terrain: "plains", owner: "", type: ""}
        positions[0][11] = {x_coor: 0, y_coor: 11, terrain: "plains", owner: "", type: ""}
        positions[0][12] = {x_coor: 0, y_coor: 12, terrain: "plains", owner: "", type: ""}
        positions[0][13] = {x_coor: 0, y_coor: 13, terrain: "plains", owner: "", type: ""}
        positions[0][14] = {x_coor: 0, y_coor: 14, terrain: "plains", owner: "", type: ""}
        positions[0][15] = {x_coor: 0, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[0][16] = {x_coor: 0, y_coor: 16, terrain: "plains", owner: "", type: ""}
        positions[0][17] = {x_coor: 0, y_coor: 17, terrain: "plains", owner: "", type: ""}
        positions[0][18] = {x_coor: 0, y_coor: 18, terrain: "plains", owner: "", type: ""}
        positions[0][19] = {x_coor: 0, y_coor: 19, terrain: "plains", owner: "", type: ""}
        positions[0][20] = {x_coor: 0, y_coor: 20, terrain: "plains", owner: "", type: ""}
        positions[0][21] = {x_coor: 0, y_coor: 21, terrain: "plains", owner: "", type: ""}
        positions[0][22] = {x_coor: 0, y_coor: 22, terrain: "plains", owner: "", type: ""}
        positions[0][23] = {x_coor: 0, y_coor: 23, terrain: "plains", owner: "", type: ""}
        positions[0][24] = {x_coor: 0, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[1] = [];
        positions[1][0] = {x_coor: 1, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[1][1] = {x_coor: 1, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[1][2] = {x_coor: 1, y_coor: 2, terrain: "lake", owner: "", type: ""}
        positions[1][3] = {x_coor: 1, y_coor: 3, terrain: "lake", owner: "", type: ""}
        positions[1][4] = {x_coor: 1, y_coor: 4, terrain: "lake", owner: "", type: ""}
        positions[1][5] = {x_coor: 1, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[1][6] = {x_coor: 1, y_coor: 6, terrain: "plains", owner: "", type: ""}
        positions[1][7] = {x_coor: 1, y_coor: 7, terrain: "plains", owner: "", type: ""}
        positions[1][8] = {x_coor: 1, y_coor: 8, terrain: "plains", owner: "", type: ""}
        positions[1][9] = {x_coor: 1, y_coor: 9, terrain: "plains", owner: "", type: ""}
        positions[1][10] = {x_coor: 1, y_coor: 10, terrain: "plains", owner: "", type: ""}
        positions[1][11] = {x_coor: 1, y_coor: 11, terrain: "plains", owner: "", type: ""}
        positions[1][12] = {x_coor: 1, y_coor: 12, terrain: "plains", owner: "", type: ""}
        positions[1][13] = {x_coor: 1, y_coor: 13, terrain: "plains", owner: "", type: ""}
        positions[1][14] = {x_coor: 1, y_coor: 14, terrain: "plains", owner: "", type: ""}
        positions[1][15] = {x_coor: 1, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[1][16] = {x_coor: 1, y_coor: 16, terrain: "plains", owner: "", type: ""}
        positions[1][17] = {x_coor: 1, y_coor: 17, terrain: "plains", owner: "", type: ""}
        positions[1][18] = {x_coor: 1, y_coor: 18, terrain: "plains", owner: "", type: ""}
        positions[1][19] = {x_coor: 1, y_coor: 19, terrain: "plains", owner: "", type: ""}
        positions[1][20] = {x_coor: 1, y_coor: 20, terrain: "plains", owner: "", type: ""}
        positions[1][21] = {x_coor: 1, y_coor: 21, terrain: "forest", owner: "", type: ""}
        positions[1][22] = {x_coor: 1, y_coor: 22, terrain: "plains", owner: "", type: ""}
        positions[1][23] = {x_coor: 1, y_coor: 23, terrain: "plains", owner: "", type: ""}
        positions[1][24] = {x_coor: 1, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[2] = [];
        positions[2][0] = {x_coor: 2, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[2][1] = {x_coor: 2, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[2][2] = {x_coor: 2, y_coor: 2, terrain: "lake", owner: "", type: ""}
        positions[2][3] = {x_coor: 2, y_coor: 3, terrain: "lake", owner: "", type: ""}
        positions[2][4] = {x_coor: 2, y_coor: 4, terrain: "lake", owner: "", type: ""}
        positions[2][5] = {x_coor: 2, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[2][6] = {x_coor: 2, y_coor: 6, terrain: "plains", owner: "", type: ""}
        positions[2][7] = {x_coor: 2, y_coor: 7, terrain: "plains", owner: "", type: ""}
        positions[2][8] = {x_coor: 2, y_coor: 8, terrain: "plains", owner: "", type: ""}
        positions[2][9] = {x_coor: 2, y_coor: 9, terrain: "plains", owner: "", type: ""}
        positions[2][10] = {x_coor: 2, y_coor: 10, terrain: "plains", owner: "", type: ""}
        positions[2][11] = {x_coor: 2, y_coor: 11, terrain: "plains", owner: "", type: ""}
        positions[2][12] = {x_coor: 2, y_coor: 12, terrain: "plains", owner: "", type: ""}
        positions[2][13] = {x_coor: 2, y_coor: 13, terrain: "plains", owner: "", type: ""}
        positions[2][14] = {x_coor: 2, y_coor: 14, terrain: "plains", owner: "", type: ""}
        positions[2][15] = {x_coor: 2, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[2][16] = {x_coor: 2, y_coor: 16, terrain: "forest", owner: "", type: ""}
        positions[2][17] = {x_coor: 2, y_coor: 17, terrain: "hills", owner: "", type: ""}
        positions[2][18] = {x_coor: 2, y_coor: 18, terrain: "forest", owner: "", type: ""}
        positions[2][19] = {x_coor: 2, y_coor: 19, terrain: "forest", owner: "", type: ""}
        positions[2][20] = {x_coor: 2, y_coor: 20, terrain: "plains", owner: "", type: ""}
        positions[2][21] = {x_coor: 2, y_coor: 21, terrain: "forest", owner: "", type: ""}
        positions[2][22] = {x_coor: 2, y_coor: 22, terrain: "forest", owner: "", type: ""}
        positions[2][23] = {x_coor: 2, y_coor: 23, terrain: "forest", owner: "", type: ""}
        positions[2][24] = {x_coor: 2, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[3] = [];
        positions[3][0] = {x_coor: 3, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[3][1] = {x_coor: 3, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[3][2] = {x_coor: 3, y_coor: 2, terrain: "plains", owner: "", type: ""}
        positions[3][3] = {x_coor: 3, y_coor: 3, terrain: "lake", owner: "", type: ""}
        positions[3][4] = {x_coor: 3, y_coor: 4, terrain: "plains", owner: "", type: ""}
        positions[3][5] = {x_coor: 3, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[3][6] = {x_coor: 3, y_coor: 6, terrain: "plains", owner: "", type: ""}
        positions[3][7] = {x_coor: 3, y_coor: 7, terrain: "plains", owner: "", type: ""}
        positions[3][8] = {x_coor: 3, y_coor: 8, terrain: "forest", owner: "", type: ""}
        positions[3][9] = {x_coor: 3, y_coor: 9, terrain: "forest", owner: "", type: ""}
        positions[3][10] = {x_coor: 3, y_coor: 10, terrain: "forest", owner: "", type: ""}
        positions[3][11] = {x_coor: 3, y_coor: 11, terrain: "forest", owner: "", type: ""}
        positions[3][12] = {x_coor: 3, y_coor: 12, terrain: "plains", owner: "", type: ""}
        positions[3][13] = {x_coor: 3, y_coor: 13, terrain: "plains", owner: "", type: ""}
        positions[3][14] = {x_coor: 3, y_coor: 14, terrain: "plains", owner: "", type: ""}
        positions[3][15] = {x_coor: 3, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[3][16] = {x_coor: 3, y_coor: 16, terrain: "forest", owner: "", type: ""}
        positions[3][17] = {x_coor: 3, y_coor: 17, terrain: "hills", owner: "", type: ""}
        positions[3][18] = {x_coor: 3, y_coor: 18, terrain: "forest", owner: "", type: ""}
        positions[3][19] = {x_coor: 3, y_coor: 19, terrain: "forest", owner: "", type: ""}
        positions[3][20] = {x_coor: 3, y_coor: 20, terrain: "plains", owner: "", type: ""}
        positions[3][21] = {x_coor: 3, y_coor: 21, terrain: "plains", owner: "", type: ""}
        positions[3][22] = {x_coor: 3, y_coor: 22, terrain: "forest", owner: "", type: ""}
        positions[3][23] = {x_coor: 3, y_coor: 23, terrain: "forest", owner: "", type: ""}
        positions[3][24] = {x_coor: 3, y_coor: 24, terrain: "forest", owner: "", type: ""}

        positions[4] = [];
        positions[4][0] = {x_coor: 4, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[4][1] = {x_coor: 4, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[4][2] = {x_coor: 4, y_coor: 2, terrain: "plains", owner: "", type: ""}
        positions[4][3] = {x_coor: 4, y_coor: 3, terrain: "plains", owner: "", type: ""}
        positions[4][4] = {x_coor: 4, y_coor: 4, terrain: "plains", owner: "", type: ""}
        positions[4][5] = {x_coor: 4, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[4][6] = {x_coor: 4, y_coor: 6, terrain: "plains", owner: "", type: ""}
        positions[4][7] = {x_coor: 4, y_coor: 7, terrain: "plains", owner: "", type: ""}
        positions[4][8] = {x_coor: 4, y_coor: 8, terrain: "hills", owner: "", type: ""}
        positions[4][9] = {x_coor: 4, y_coor: 9, terrain: "forest", owner: "", type: ""}
        positions[4][10] = {x_coor: 4, y_coor: 10, terrain: "forest", owner: "", type: ""}
        positions[4][11] = {x_coor: 4, y_coor: 11, terrain: "forest", owner: "", type: ""}
        positions[4][12] = {x_coor: 4, y_coor: 12, terrain: "plains", owner: "", type: ""}
        positions[4][13] = {x_coor: 4, y_coor: 13, terrain: "plains", owner: "", type: ""}
        positions[4][14] = {x_coor: 4, y_coor: 14, terrain: "plains", owner: "", type: ""}
        positions[4][15] = {x_coor: 4, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[4][16] = {x_coor: 4, y_coor: 16, terrain: "forest", owner: "", type: ""}
        positions[4][17] = {x_coor: 4, y_coor: 17, terrain: "hills", owner: "", type: ""}
        positions[4][18] = {x_coor: 4, y_coor: 18, terrain: "hills", owner: "", type: ""}
        positions[4][19] = {x_coor: 4, y_coor: 19, terrain: "forest", owner: "", type: ""}
        positions[4][20] = {x_coor: 4, y_coor: 20, terrain: "plains", owner: "", type: ""}
        positions[4][21] = {x_coor: 4, y_coor: 21, terrain: "plains", owner: "", type: ""}
        positions[4][22] = {x_coor: 4, y_coor: 22, terrain: "forest", owner: "", type: ""}
        positions[4][23] = {x_coor: 4, y_coor: 23, terrain: "forest", owner: "", type: ""}
        positions[4][24] = {x_coor: 4, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[5] = [];
        positions[5][0] = {x_coor: 5, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[5][1] = {x_coor: 5, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[5][2] = {x_coor: 5, y_coor: 2, terrain: "plains", owner: "", type: ""}
        positions[5][3] = {x_coor: 5, y_coor: 3, terrain: "plains", owner: "", type: ""}
        positions[5][4] = {x_coor: 5, y_coor: 4, terrain: "plains", owner: "", type: ""}
        positions[5][5] = {x_coor: 5, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[5][6] = {x_coor: 5, y_coor: 6, terrain: "plains", owner: "", type: ""}
        positions[5][7] = {x_coor: 5, y_coor: 7, terrain: "plains", owner: "", type: ""}
        positions[5][8] = {x_coor: 5, y_coor: 8, terrain: "forest", owner: "", type: ""}
        positions[5][9] = {x_coor: 5, y_coor: 9, terrain: "hills", owner: "", type: ""}
        positions[5][10] = {x_coor: 5, y_coor: 10, terrain: "forest", owner: "", type: ""}
        positions[5][11] = {x_coor: 5, y_coor: 11, terrain: "hills", owner: "", type: ""}
        positions[5][12] = {x_coor: 5, y_coor: 12, terrain: "plains", owner: "", type: ""}
        positions[5][13] = {x_coor: 5, y_coor: 13, terrain: "plains", owner: "", type: ""}
        positions[5][14] = {x_coor: 5, y_coor: 14, terrain: "plains", owner: "", type: ""}
        positions[5][15] = {x_coor: 5, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[5][16] = {x_coor: 5, y_coor: 16, terrain: "forest", owner: "", type: ""}
        positions[5][17] = {x_coor: 5, y_coor: 17, terrain: "forest", owner: "", type: ""}
        positions[5][18] = {x_coor: 5, y_coor: 18, terrain: "hills", owner: "", type: ""}
        positions[5][19] = {x_coor: 5, y_coor: 19, terrain: "hills", owner: "", type: ""}
        positions[5][20] = {x_coor: 5, y_coor: 20, terrain: "plains", owner: "", type: ""}
        positions[5][21] = {x_coor: 5, y_coor: 21, terrain: "forest", owner: "", type: ""}
        positions[5][22] = {x_coor: 5, y_coor: 22, terrain: "plains", owner: "", type: ""}
        positions[5][23] = {x_coor: 5, y_coor: 23, terrain: "plains", owner: "", type: ""}
        positions[5][24] = {x_coor: 5, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[6] = [];
        positions[6][0] = {x_coor: 6, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[6][1] = {x_coor: 6, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[6][2] = {x_coor: 6, y_coor: 2, terrain: "plains", owner: "", type: ""}
        positions[6][3] = {x_coor: 6, y_coor: 3, terrain: "plains", owner: "", type: ""}
        positions[6][4] = {x_coor: 6, y_coor: 4, terrain: "plains", owner: "", type: ""}
        positions[6][5] = {x_coor: 6, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[6][6] = {x_coor: 6, y_coor: 6, terrain: "plains", owner: "", type: ""}
        positions[6][7] = {x_coor: 6, y_coor: 7, terrain: "plains", owner: "", type: ""}
        positions[6][8] = {x_coor: 6, y_coor: 8, terrain: "forest", owner: "", type: ""}
        positions[6][9] = {x_coor: 6, y_coor: 9, terrain: "forest", owner: "", type: ""}
        positions[6][10] = {x_coor: 6, y_coor: 10, terrain: "hills", owner: "", type: ""}
        positions[6][11] = {x_coor: 6, y_coor: 11, terrain: "plains", owner: "", type: ""}
        positions[6][12] = {x_coor: 6, y_coor: 12, terrain: "plains", owner: "", type: ""}
        positions[6][13] = {x_coor: 6, y_coor: 13, terrain: "plains", owner: "", type: ""}
        positions[6][14] = {x_coor: 6, y_coor: 14, terrain: "plains", owner: "", type: ""}
        positions[6][15] = {x_coor: 6, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[6][16] = {x_coor: 6, y_coor: 16, terrain: "forest", owner: "", type: ""}
        positions[6][17] = {x_coor: 6, y_coor: 17, terrain: "forest", owner: "", type: ""}
        positions[6][18] = {x_coor: 6, y_coor: 18, terrain: "hills", owner: "", type: ""}
        positions[6][19] = {x_coor: 6, y_coor: 19, terrain: "hills", owner: "", type: ""}
        positions[6][20] = {x_coor: 6, y_coor: 20, terrain: "plains", owner: "", type: ""}
        positions[6][21] = {x_coor: 6, y_coor: 21, terrain: "plains", owner: "", type: ""}
        positions[6][22] = {x_coor: 6, y_coor: 22, terrain: "plains", owner: "", type: ""}
        positions[6][23] = {x_coor: 6, y_coor: 23, terrain: "plains", owner: "", type: ""}
        positions[6][24] = {x_coor: 6, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[7] = [];
        positions[7][0] = {x_coor: 7, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[7][1] = {x_coor: 7, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[7][2] = {x_coor: 7, y_coor: 2, terrain: "plains", owner: "", type: ""}
        positions[7][3] = {x_coor: 7, y_coor: 3, terrain: "plains", owner: "", type: ""}
        positions[7][4] = {x_coor: 7, y_coor: 4, terrain: "plains", owner: "", type: ""}
        positions[7][5] = {x_coor: 7, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[7][6] = {x_coor: 7, y_coor: 6, terrain: "plains", owner: "", type: ""}
        positions[7][7] = {x_coor: 7, y_coor: 7, terrain: "plains", owner: "", type: ""}
        positions[7][8] = {x_coor: 7, y_coor: 8, terrain: "forest", owner: "", type: ""}
        positions[7][9] = {x_coor: 7, y_coor: 9, terrain: "forest", owner: "", type: ""}
        positions[7][10] = {x_coor: 7, y_coor: 10, terrain: "plains", owner: "", type: ""}
        positions[7][11] = {x_coor: 7, y_coor: 11, terrain: "plains", owner: "", type: ""}
        positions[7][12] = {x_coor: 7, y_coor: 12, terrain: "plains", owner: "", type: ""}
        positions[7][13] = {x_coor: 7, y_coor: 13, terrain: "plains", owner: "", type: ""}
        positions[7][14] = {x_coor: 7, y_coor: 14, terrain: "plains", owner: "", type: ""}
        positions[7][15] = {x_coor: 7, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[7][16] = {x_coor: 7, y_coor: 16, terrain: "forest", owner: "", type: ""}
        positions[7][17] = {x_coor: 7, y_coor: 17, terrain: "forest", owner: "", type: ""}
        positions[7][18] = {x_coor: 7, y_coor: 18, terrain: "forest", owner: "", type: ""}
        positions[7][19] = {x_coor: 7, y_coor: 19, terrain: "forest", owner: "", type: ""}
        positions[7][20] = {x_coor: 7, y_coor: 20, terrain: "plains", owner: "", type: ""}
        positions[7][21] = {x_coor: 7, y_coor: 21, terrain: "plains", owner: "", type: ""}
        positions[7][22] = {x_coor: 7, y_coor: 22, terrain: "plains", owner: "", type: ""}
        positions[7][23] = {x_coor: 7, y_coor: 23, terrain: "plains", owner: "", type: ""}
        positions[7][24] = {x_coor: 7, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[8] = [];
        positions[8][0] = {x_coor: 8, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[8][1] = {x_coor: 8, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[8][2] = {x_coor: 8, y_coor: 2, terrain: "plains", owner: "", type: ""}
        positions[8][3] = {x_coor: 8, y_coor: 3, terrain: "plains", owner: "", type: ""}
        positions[8][4] = {x_coor: 8, y_coor: 4, terrain: "plains", owner: "", type: ""}
        positions[8][5] = {x_coor: 8, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[8][6] = {x_coor: 8, y_coor: 6, terrain: "plains", owner: "", type: ""}
        positions[8][7] = {x_coor: 8, y_coor: 7, terrain: "plains", owner: "", type: ""}
        positions[8][8] = {x_coor: 8, y_coor: 8, terrain: "forest", owner: "", type: ""}
        positions[8][9] = {x_coor: 8, y_coor: 9, terrain: "forest", owner: "", type: ""}
        positions[8][10] = {x_coor: 8, y_coor: 10, terrain: "plains", owner: "", type: ""}
        positions[8][11] = {x_coor: 8, y_coor: 11, terrain: "lake", owner: "", type: ""}
        positions[8][12] = {x_coor: 8, y_coor: 12, terrain: "lake", owner: "", type: ""}
        positions[8][13] = {x_coor: 8, y_coor: 13, terrain: "lake", owner: "", type: ""}
        positions[8][14] = {x_coor: 8, y_coor: 14, terrain: "plains", owner: "", type: ""}
        positions[8][15] = {x_coor: 8, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[8][16] = {x_coor: 8, y_coor: 16, terrain: "forest", owner: "", type: ""}
        positions[8][17] = {x_coor: 8, y_coor: 17, terrain: "forest", owner: "", type: ""}
        positions[8][18] = {x_coor: 8, y_coor: 18, terrain: "forest", owner: "", type: ""}
        positions[8][19] = {x_coor: 8, y_coor: 19, terrain: "forest", owner: "", type: ""}
        positions[8][20] = {x_coor: 8, y_coor: 20, terrain: "forest", owner: "", type: ""}
        positions[8][21] = {x_coor: 8, y_coor: 21, terrain: "plains", owner: "", type: ""}
        positions[8][22] = {x_coor: 8, y_coor: 22, terrain: "plains", owner: "", type: ""}
        positions[8][23] = {x_coor: 8, y_coor: 23, terrain: "plains", owner: "", type: ""}
        positions[8][24] = {x_coor: 8, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[9] = [];
        positions[9][0] = {x_coor: 9, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[9][1] = {x_coor: 9, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[9][2] = {x_coor: 9, y_coor: 2, terrain: "plains", owner: "", type: ""}
        positions[9][3] = {x_coor: 9, y_coor: 3, terrain: "plains", owner: "", type: ""}
        positions[9][4] = {x_coor: 9, y_coor: 4, terrain: "plains", owner: "", type: ""}
        positions[9][5] = {x_coor: 9, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[9][6] = {x_coor: 9, y_coor: 6, terrain: "forest", owner: "", type: ""}
        positions[9][7] = {x_coor: 9, y_coor: 7, terrain: "forest", owner: "", type: ""}
        positions[9][8] = {x_coor: 9, y_coor: 8, terrain: "hills", owner: "", type: ""}
        positions[9][9] = {x_coor: 9, y_coor: 9, terrain: "hills", owner: "", type: ""}
        positions[9][10] = {x_coor: 9, y_coor: 10, terrain: "plains", owner: "", type: ""}
        positions[9][11] = {x_coor: 9, y_coor: 11, terrain: "lake", owner: "", type: ""}
        positions[9][12] = {x_coor: 9, y_coor: 12, terrain: "lake", owner: "", type: ""}
        positions[9][13] = {x_coor: 9, y_coor: 13, terrain: "lake", owner: "", type: ""}
        positions[9][14] = {x_coor: 9, y_coor: 14, terrain: "lake", owner: "", type: ""}
        positions[9][15] = {x_coor: 9, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[9][16] = {x_coor: 9, y_coor: 16, terrain: "forest", owner: "", type: ""}
        positions[9][17] = {x_coor: 9, y_coor: 17, terrain: "forest", owner: "", type: ""}
        positions[9][18] = {x_coor: 9, y_coor: 18, terrain: "forest", owner: "", type: ""}
        positions[9][19] = {x_coor: 9, y_coor: 19, terrain: "forest", owner: "", type: ""}
        positions[9][20] = {x_coor: 9, y_coor: 20, terrain: "forest", owner: "", type: ""}
        positions[9][21] = {x_coor: 9, y_coor: 21, terrain: "plains", owner: "", type: ""}
        positions[9][22] = {x_coor: 9, y_coor: 22, terrain: "plains", owner: "", type: ""}
        positions[9][23] = {x_coor: 9, y_coor: 23, terrain: "plains", owner: "", type: ""}
        positions[9][24] = {x_coor: 9, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[10] = [];
        positions[10][0] = {x_coor: 10, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[10][1] = {x_coor: 10, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[10][2] = {x_coor: 10, y_coor: 2, terrain: "plains", owner: "", type: ""}
        positions[10][3] = {x_coor: 10, y_coor: 3, terrain: "plains", owner: "", type: ""}
        positions[10][4] = {x_coor: 10, y_coor: 4, terrain: "plains", owner: "", type: ""}
        positions[10][5] = {x_coor: 10, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[10][6] = {x_coor: 10, y_coor: 6, terrain: "forest", owner: "", type: ""}
        positions[10][7] = {x_coor: 10, y_coor: 7, terrain: "forest", owner: "", type: ""}
        positions[10][8] = {x_coor: 10, y_coor: 8, terrain: "hills", owner: "", type: ""}
        positions[10][9] = {x_coor: 10, y_coor: 9, terrain: "plains", owner: "", type: ""}
        positions[10][10] = {x_coor: 10, y_coor: 10, terrain: "plains", owner: "", type: ""}
        positions[10][11] = {x_coor: 10, y_coor: 11, terrain: "plains", owner: "", type: ""}
        positions[10][12] = {x_coor: 10, y_coor: 12, terrain: "lake", owner: "", type: ""}
        positions[10][13] = {x_coor: 10, y_coor: 13, terrain: "lake", owner: "", type: ""}
        positions[10][14] = {x_coor: 10, y_coor: 14, terrain: "lake", owner: "", type: ""}
        positions[10][15] = {x_coor: 10, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[10][16] = {x_coor: 10, y_coor: 16, terrain: "forest", owner: "", type: ""}
        positions[10][17] = {x_coor: 10, y_coor: 17, terrain: "forest", owner: "", type: ""}
        positions[10][18] = {x_coor: 10, y_coor: 18, terrain: "hills", owner: "", type: ""}
        positions[10][19] = {x_coor: 10, y_coor: 19, terrain: "forest", owner: "", type: ""}
        positions[10][20] = {x_coor: 10, y_coor: 20, terrain: "forest", owner: "", type: ""}
        positions[10][21] = {x_coor: 10, y_coor: 21, terrain: "plains", owner: "", type: ""}
        positions[10][22] = {x_coor: 10, y_coor: 22, terrain: "plains", owner: "", type: ""}
        positions[10][23] = {x_coor: 10, y_coor: 23, terrain: "plains", owner: "", type: ""}
        positions[10][24] = {x_coor: 10, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[11] = [];
        positions[11][0] = {x_coor: 11, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[11][1] = {x_coor: 11, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[11][2] = {x_coor: 11, y_coor: 2, terrain: "plains", owner: "", type: ""}
        positions[11][3] = {x_coor: 11, y_coor: 3, terrain: "plains", owner: "", type: ""}
        positions[11][4] = {x_coor: 11, y_coor: 4, terrain: "plains", owner: "", type: ""}
        positions[11][5] = {x_coor: 11, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[11][6] = {x_coor: 11, y_coor: 6, terrain: "forest", owner: "", type: ""}
        positions[11][7] = {x_coor: 11, y_coor: 7, terrain: "forest", owner: "", type: ""}
        positions[11][8] = {x_coor: 11, y_coor: 8, terrain: "hills", owner: "", type: ""}
        positions[11][9] = {x_coor: 11, y_coor: 9, terrain: "plains", owner: "", type: ""}
        positions[11][10] = {x_coor: 11, y_coor: 10, terrain: "plains", owner: "", type: ""}
        positions[11][11] = {x_coor: 11, y_coor: 11, terrain: "plains", owner: "", type: ""}
        positions[11][12] = {x_coor: 11, y_coor: 12, terrain: "lake", owner: "", type: ""}
        positions[11][13] = {x_coor: 11, y_coor: 13, terrain: "lake", owner: "", type: ""}
        positions[11][14] = {x_coor: 11, y_coor: 14, terrain: "lake", owner: "", type: ""}
        positions[11][15] = {x_coor: 11, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[11][16] = {x_coor: 11, y_coor: 16, terrain: "forest", owner: "", type: ""}
        positions[11][17] = {x_coor: 11, y_coor: 17, terrain: "forest", owner: "", type: ""}
        positions[11][18] = {x_coor: 11, y_coor: 18, terrain: "hills", owner: "", type: ""}
        positions[11][19] = {x_coor: 11, y_coor: 19, terrain: "forest", owner: "", type: ""}
        positions[11][20] = {x_coor: 11, y_coor: 20, terrain: "hills", owner: "", type: ""}
        positions[11][21] = {x_coor: 11, y_coor: 21, terrain: "plains", owner: "", type: ""}
        positions[11][22] = {x_coor: 11, y_coor: 22, terrain: "plains", owner: "", type: ""}
        positions[11][23] = {x_coor: 11, y_coor: 23, terrain: "plains", owner: "", type: ""}
        positions[11][24] = {x_coor: 11, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[12] = [];
        positions[12][0] = {x_coor: 12, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[12][1] = {x_coor: 12, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[12][2] = {x_coor: 12, y_coor: 2, terrain: "plains", owner: "", type: ""}
        positions[12][3] = {x_coor: 12, y_coor: 3, terrain: "plains", owner: "", type: ""}
        positions[12][4] = {x_coor: 12, y_coor: 4, terrain: "plains", owner: "", type: ""}
        positions[12][5] = {x_coor: 12, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[12][6] = {x_coor: 12, y_coor: 6, terrain: "forest", owner: "", type: ""}
        positions[12][7] = {x_coor: 12, y_coor: 7, terrain: "forest", owner: "", type: ""}
        positions[12][8] = {x_coor: 12, y_coor: 8, terrain: "hills", owner: "", type: ""}
        positions[12][9] = {x_coor: 12, y_coor: 9, terrain: "plains", owner: "", type: ""}
        positions[12][10] = {x_coor: 12, y_coor: 10, terrain: "plains", owner: "", type: ""}
        positions[12][11] = {x_coor: 12, y_coor: 11, terrain: "lake", owner: "", type: ""}
        positions[12][12] = {x_coor: 12, y_coor: 12, terrain: "lake", owner: "", type: ""}
        positions[12][13] = {x_coor: 12, y_coor: 13, terrain: "lake", owner: "", type: ""}
        positions[12][14] = {x_coor: 12, y_coor: 14, terrain: "plains", owner: "", type: ""}
        positions[12][15] = {x_coor: 12, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[12][16] = {x_coor: 12, y_coor: 16, terrain: "plains", owner: "", type: ""}
        positions[12][17] = {x_coor: 12, y_coor: 17, terrain: "plains", owner: "", type: ""}
        positions[12][18] = {x_coor: 12, y_coor: 18, terrain: "plains", owner: "", type: ""}
        positions[12][19] = {x_coor: 12, y_coor: 19, terrain: "hills", owner: "", type: ""}
        positions[12][20] = {x_coor: 12, y_coor: 20, terrain: "plains", owner: "", type: ""}
        positions[12][21] = {x_coor: 12, y_coor: 21, terrain: "plains", owner: "", type: ""}
        positions[12][22] = {x_coor: 12, y_coor: 22, terrain: "plains", owner: "", type: ""}
        positions[12][23] = {x_coor: 12, y_coor: 23, terrain: "plains", owner: "", type: ""}
        positions[12][24] = {x_coor: 12, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[13] = [];
        positions[13][0] = {x_coor: 13, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[13][1] = {x_coor: 13, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[13][2] = {x_coor: 13, y_coor: 2, terrain: "plains", owner: "", type: ""}
        positions[13][3] = {x_coor: 13, y_coor: 3, terrain: "plains", owner: "", type: ""}
        positions[13][4] = {x_coor: 13, y_coor: 4, terrain: "hills", owner: "", type: ""}
        positions[13][5] = {x_coor: 13, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[13][6] = {x_coor: 13, y_coor: 6, terrain: "forest", owner: "", type: ""}
        positions[13][7] = {x_coor: 13, y_coor: 7, terrain: "hills", owner: "", type: ""}
        positions[13][8] = {x_coor: 13, y_coor: 8, terrain: "plains", owner: "", type: ""}
        positions[13][9] = {x_coor: 13, y_coor: 9, terrain: "plains", owner: "", type: ""}
        positions[13][10] = {x_coor: 13, y_coor: 10, terrain: "plains", owner: "", type: ""}
        positions[13][11] = {x_coor: 13, y_coor: 11, terrain: "lake", owner: "", type: ""}
        positions[13][12] = {x_coor: 13, y_coor: 12, terrain: "lake", owner: "", type: ""}
        positions[13][13] = {x_coor: 13, y_coor: 13, terrain: "lake", owner: "", type: ""}
        positions[13][14] = {x_coor: 13, y_coor: 14, terrain: "plains", owner: "", type: ""}
        positions[13][15] = {x_coor: 13, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[13][16] = {x_coor: 13, y_coor: 16, terrain: "plains", owner: "", type: ""}
        positions[13][17] = {x_coor: 13, y_coor: 17, terrain: "plains", owner: "", type: ""}
        positions[13][18] = {x_coor: 13, y_coor: 18, terrain: "plains", owner: "", type: ""}
        positions[13][19] = {x_coor: 13, y_coor: 19, terrain: "plains", owner: "", type: ""}
        positions[13][20] = {x_coor: 13, y_coor: 20, terrain: "plains", owner: "", type: ""}
        positions[13][21] = {x_coor: 13, y_coor: 21, terrain: "plains", owner: "", type: ""}
        positions[13][22] = {x_coor: 13, y_coor: 22, terrain: "plains", owner: "", type: ""}
        positions[13][23] = {x_coor: 13, y_coor: 23, terrain: "plains", owner: "", type: ""}
        positions[13][24] = {x_coor: 13, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[14] = [];
        positions[14][0] = {x_coor: 14, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[14][1] = {x_coor: 14, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[14][2] = {x_coor: 14, y_coor: 2, terrain: "plains", owner: "", type: ""}
        positions[14][3] = {x_coor: 14, y_coor: 3, terrain: "hills", owner: "", type: ""}
        positions[14][4] = {x_coor: 14, y_coor: 4, terrain: "hills", owner: "", type: ""}
        positions[14][5] = {x_coor: 14, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[14][6] = {x_coor: 14, y_coor: 6, terrain: "plains", owner: "", type: ""}
        positions[14][7] = {x_coor: 14, y_coor: 7, terrain: "plains", owner: "", type: ""}
        positions[14][8] = {x_coor: 14, y_coor: 8, terrain: "plains", owner: "", type: ""}
        positions[14][9] = {x_coor: 14, y_coor: 9, terrain: "plains", owner: "", type: ""}
        positions[14][10] = {x_coor: 14, y_coor: 10, terrain: "plains", owner: "", type: ""}
        positions[14][11] = {x_coor: 14, y_coor: 11, terrain: "plains", owner: "", type: ""}
        positions[14][12] = {x_coor: 14, y_coor: 12, terrain: "plains", owner: "", type: ""}
        positions[14][13] = {x_coor: 14, y_coor: 13, terrain: "plains", owner: "", type: ""}
        positions[14][14] = {x_coor: 14, y_coor: 14, terrain: "plains", owner: "", type: ""}
        positions[14][15] = {x_coor: 14, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[14][16] = {x_coor: 14, y_coor: 16, terrain: "plains", owner: "", type: ""}
        positions[14][17] = {x_coor: 14, y_coor: 17, terrain: "plains", owner: "", type: ""}
        positions[14][18] = {x_coor: 14, y_coor: 18, terrain: "plains", owner: "", type: ""}
        positions[14][19] = {x_coor: 14, y_coor: 19, terrain: "plains", owner: "", type: ""}
        positions[14][20] = {x_coor: 14, y_coor: 20, terrain: "plains", owner: "", type: ""}
        positions[14][21] = {x_coor: 14, y_coor: 21, terrain: "plains", owner: "", type: ""}
        positions[14][22] = {x_coor: 14, y_coor: 22, terrain: "plains", owner: "", type: ""}
        positions[14][23] = {x_coor: 14, y_coor: 23, terrain: "plains", owner: "", type: ""}
        positions[14][24] = {x_coor: 14, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[15] = [];
        positions[15][0] = {x_coor: 15, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[15][1] = {x_coor: 15, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[15][2] = {x_coor: 15, y_coor: 2, terrain: "plains", owner: "", type: ""}
        positions[15][3] = {x_coor: 15, y_coor: 3, terrain: "hills", owner: "", type: ""}
        positions[15][4] = {x_coor: 15, y_coor: 4, terrain: "forest", owner: "", type: ""}
        positions[15][5] = {x_coor: 15, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[15][6] = {x_coor: 15, y_coor: 6, terrain: "plains", owner: "", type: ""}
        positions[15][7] = {x_coor: 15, y_coor: 7, terrain: "plains", owner: "", type: ""}
        positions[15][8] = {x_coor: 15, y_coor: 8, terrain: "plains", owner: "", type: ""}
        positions[15][9] = {x_coor: 15, y_coor: 9, terrain: "plains", owner: "", type: ""}
        positions[15][10] = {x_coor: 15, y_coor: 10, terrain: "plains", owner: "", type: ""}
        positions[15][11] = {x_coor: 15, y_coor: 11, terrain: "plains", owner: "", type: ""}
        positions[15][12] = {x_coor: 15, y_coor: 12, terrain: "plains", owner: "", type: ""}
        positions[15][13] = {x_coor: 15, y_coor: 13, terrain: "plains", owner: "", type: ""}
        positions[15][14] = {x_coor: 15, y_coor: 14, terrain: "hills", owner: "", type: ""}
        positions[15][15] = {x_coor: 15, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[15][16] = {x_coor: 15, y_coor: 16, terrain: "plains", owner: "", type: ""}
        positions[15][17] = {x_coor: 15, y_coor: 17, terrain: "plains", owner: "", type: ""}
        positions[15][18] = {x_coor: 15, y_coor: 18, terrain: "plains", owner: "", type: ""}
        positions[15][19] = {x_coor: 15, y_coor: 19, terrain: "plains", owner: "", type: ""}
        positions[15][20] = {x_coor: 15, y_coor: 20, terrain: "plains", owner: "", type: ""}
        positions[15][21] = {x_coor: 15, y_coor: 21, terrain: "plains", owner: "", type: ""}
        positions[15][22] = {x_coor: 15, y_coor: 22, terrain: "plains", owner: "", type: ""}
        positions[15][23] = {x_coor: 15, y_coor: 23, terrain: "plains", owner: "", type: ""}
        positions[15][24] = {x_coor: 15, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[16] = [];
        positions[16][0] = {x_coor: 16, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[16][1] = {x_coor: 16, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[16][2] = {x_coor: 16, y_coor: 2, terrain: "hills", owner: "", type: ""}
        positions[16][3] = {x_coor: 16, y_coor: 3, terrain: "hills", owner: "", type: ""}
        positions[16][4] = {x_coor: 16, y_coor: 4, terrain: "forest", owner: "", type: ""}
        positions[16][5] = {x_coor: 16, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[16][6] = {x_coor: 16, y_coor: 6, terrain: "plains", owner: "", type: ""}
        positions[16][7] = {x_coor: 16, y_coor: 7, terrain: "plains", owner: "", type: ""}
        positions[16][8] = {x_coor: 16, y_coor: 8, terrain: "plains", owner: "", type: ""}
        positions[16][9] = {x_coor: 16, y_coor: 9, terrain: "plains", owner: "", type: ""}
        positions[16][10] = {x_coor: 16, y_coor: 10, terrain: "plains", owner: "", type: ""}
        positions[16][11] = {x_coor: 16, y_coor: 11, terrain: "plains", owner: "", type: ""}
        positions[16][12] = {x_coor: 16, y_coor: 12, terrain: "plains", owner: "", type: ""}
        positions[16][13] = {x_coor: 16, y_coor: 13, terrain: "hills", owner: "", type: ""}
        positions[16][14] = {x_coor: 16, y_coor: 14, terrain: "hills", owner: "", type: ""}
        positions[16][15] = {x_coor: 16, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[16][16] = {x_coor: 16, y_coor: 16, terrain: "plains", owner: "", type: ""}
        positions[16][17] = {x_coor: 16, y_coor: 17, terrain: "plains", owner: "", type: ""}
        positions[16][18] = {x_coor: 16, y_coor: 18, terrain: "plains", owner: "", type: ""}
        positions[16][19] = {x_coor: 16, y_coor: 19, terrain: "plains", owner: "", type: ""}
        positions[16][20] = {x_coor: 16, y_coor: 20, terrain: "plains", owner: "", type: ""}
        positions[16][21] = {x_coor: 16, y_coor: 21, terrain: "plains", owner: "", type: ""}
        positions[16][22] = {x_coor: 16, y_coor: 22, terrain: "plains", owner: "", type: ""}
        positions[16][23] = {x_coor: 16, y_coor: 23, terrain: "plains", owner: "", type: ""}
        positions[16][24] = {x_coor: 16, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[17] = [];
        positions[17][0] = {x_coor: 17, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[17][1] = {x_coor: 17, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[17][2] = {x_coor: 17, y_coor: 2, terrain: "forest", owner: "", type: ""}
        positions[17][3] = {x_coor: 17, y_coor: 3, terrain: "forest", owner: "", type: ""}
        positions[17][4] = {x_coor: 17, y_coor: 4, terrain: "forest", owner: "", type: ""}
        positions[17][5] = {x_coor: 17, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[17][6] = {x_coor: 17, y_coor: 6, terrain: "plains", owner: "", type: ""}
        positions[17][7] = {x_coor: 17, y_coor: 7, terrain: "plains", owner: "", type: ""}
        positions[17][8] = {x_coor: 17, y_coor: 8, terrain: "plains", owner: "", type: ""}
        positions[17][9] = {x_coor: 17, y_coor: 9, terrain: "plains", owner: "", type: ""}
        positions[17][10] = {x_coor: 17, y_coor: 10, terrain: "plains", owner: "", type: ""}
        positions[17][11] = {x_coor: 17, y_coor: 11, terrain: "plains", owner: "", type: ""}
        positions[17][12] = {x_coor: 17, y_coor: 12, terrain: "hills", owner: "", type: ""}
        positions[17][13] = {x_coor: 17, y_coor: 13, terrain: "forest", owner: "", type: ""}
        positions[17][14] = {x_coor: 17, y_coor: 14, terrain: "forest", owner: "", type: ""}
        positions[17][15] = {x_coor: 17, y_coor: 15, terrain: "hills", owner: "", type: ""}
        positions[17][16] = {x_coor: 17, y_coor: 16, terrain: "plains", owner: "", type: ""}
        positions[17][17] = {x_coor: 17, y_coor: 17, terrain: "plains", owner: "", type: ""}
        positions[17][18] = {x_coor: 17, y_coor: 18, terrain: "plains", owner: "", type: ""}
        positions[17][19] = {x_coor: 17, y_coor: 19, terrain: "plains", owner: "", type: ""}
        positions[17][20] = {x_coor: 17, y_coor: 20, terrain: "plains", owner: "", type: ""}
        positions[17][21] = {x_coor: 17, y_coor: 21, terrain: "plains", owner: "", type: ""}
        positions[17][22] = {x_coor: 17, y_coor: 22, terrain: "plains", owner: "", type: ""}
        positions[17][23] = {x_coor: 17, y_coor: 23, terrain: "plains", owner: "", type: ""}
        positions[17][24] = {x_coor: 17, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[18] = [];
        positions[18][0] = {x_coor: 18, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[18][1] = {x_coor: 18, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[18][2] = {x_coor: 18, y_coor: 2, terrain: "plains", owner: "", type: ""}
        positions[18][3] = {x_coor: 18, y_coor: 3, terrain: "plains", owner: "", type: ""}
        positions[18][4] = {x_coor: 18, y_coor: 4, terrain: "plains", owner: "", type: ""}
        positions[18][5] = {x_coor: 18, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[18][6] = {x_coor: 18, y_coor: 6, terrain: "forest", owner: "", type: ""}
        positions[18][7] = {x_coor: 18, y_coor: 7, terrain: "forest", owner: "", type: ""}
        positions[18][8] = {x_coor: 18, y_coor: 8, terrain: "forest", owner: "", type: ""}
        positions[18][9] = {x_coor: 18, y_coor: 9, terrain: "plains", owner: "", type: ""}
        positions[18][10] = {x_coor: 18, y_coor: 10, terrain: "plains", owner: "", type: ""}
        positions[18][11] = {x_coor: 18, y_coor: 11, terrain: "plains", owner: "", type: ""}
        positions[18][12] = {x_coor: 18, y_coor: 12, terrain: "plains", owner: "", type: ""}
        positions[18][13] = {x_coor: 18, y_coor: 13, terrain: "plains", owner: "", type: ""}
        positions[18][14] = {x_coor: 18, y_coor: 14, terrain: "plains", owner: "", type: ""}
        positions[18][15] = {x_coor: 18, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[18][16] = {x_coor: 18, y_coor: 16, terrain: "plains", owner: "", type: ""}
        positions[18][17] = {x_coor: 18, y_coor: 17, terrain: "plains", owner: "", type: ""}
        positions[18][18] = {x_coor: 18, y_coor: 18, terrain: "plains", owner: "", type: ""}
        positions[18][19] = {x_coor: 18, y_coor: 19, terrain: "plains", owner: "", type: ""}
        positions[18][20] = {x_coor: 18, y_coor: 20, terrain: "plains", owner: "", type: ""}
        positions[18][21] = {x_coor: 18, y_coor: 21, terrain: "plains", owner: "", type: ""}
        positions[18][22] = {x_coor: 18, y_coor: 22, terrain: "plains", owner: "", type: ""}
        positions[18][23] = {x_coor: 18, y_coor: 23, terrain: "plains", owner: "", type: ""}
        positions[18][24] = {x_coor: 18, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[19] = [];
        positions[19][0] = {x_coor: 19, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[19][1] = {x_coor: 19, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[19][2] = {x_coor: 19, y_coor: 2, terrain: "plains", owner: "", type: ""}
        positions[19][3] = {x_coor: 19, y_coor: 3, terrain: "plains", owner: "", type: ""}
        positions[19][4] = {x_coor: 19, y_coor: 4, terrain: "plains", owner: "", type: ""}
        positions[19][5] = {x_coor: 19, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[19][6] = {x_coor: 19, y_coor: 6, terrain: "forest", owner: "", type: ""}
        positions[19][7] = {x_coor: 19, y_coor: 7, terrain: "forest", owner: "", type: ""}
        positions[19][8] = {x_coor: 19, y_coor: 8, terrain: "forest", owner: "", type: ""}
        positions[19][9] = {x_coor: 19, y_coor: 9, terrain: "forest", owner: "", type: ""}
        positions[19][10] = {x_coor: 19, y_coor: 10, terrain: "plains", owner: "", type: ""}
        positions[19][11] = {x_coor: 19, y_coor: 11, terrain: "plains", owner: "", type: ""}
        positions[19][12] = {x_coor: 19, y_coor: 12, terrain: "plains", owner: "", type: ""}
        positions[19][13] = {x_coor: 19, y_coor: 13, terrain: "plains", owner: "", type: ""}
        positions[19][14] = {x_coor: 19, y_coor: 14, terrain: "plains", owner: "", type: ""}
        positions[19][15] = {x_coor: 19, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[19][16] = {x_coor: 19, y_coor: 16, terrain: "plains", owner: "", type: ""}
        positions[19][17] = {x_coor: 19, y_coor: 17, terrain: "lake", owner: "", type: ""}
        positions[19][18] = {x_coor: 19, y_coor: 18, terrain: "lake", owner: "", type: ""}
        positions[19][19] = {x_coor: 19, y_coor: 19, terrain: "lake", owner: "", type: ""}
        positions[19][20] = {x_coor: 19, y_coor: 20, terrain: "plains", owner: "", type: ""}
        positions[19][21] = {x_coor: 19, y_coor: 21, terrain: "plains", owner: "", type: ""}
        positions[19][22] = {x_coor: 19, y_coor: 22, terrain: "plains", owner: "", type: ""}
        positions[19][23] = {x_coor: 19, y_coor: 23, terrain: "plains", owner: "", type: ""}
        positions[19][24] = {x_coor: 19, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[20] = [];
        positions[20][0] = {x_coor: 20, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[20][1] = {x_coor: 20, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[20][2] = {x_coor: 20, y_coor: 2, terrain: "plains", owner: "", type: ""}
        positions[20][3] = {x_coor: 20, y_coor: 3, terrain: "plains", owner: "", type: ""}
        positions[20][4] = {x_coor: 20, y_coor: 4, terrain: "plains", owner: "", type: ""}
        positions[20][5] = {x_coor: 20, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[20][6] = {x_coor: 20, y_coor: 6, terrain: "plains", owner: "", type: ""}
        positions[20][7] = {x_coor: 20, y_coor: 7, terrain: "forest", owner: "", type: ""}
        positions[20][8] = {x_coor: 20, y_coor: 8, terrain: "forest", owner: "", type: ""}
        positions[20][9] = {x_coor: 20, y_coor: 9, terrain: "forest", owner: "", type: ""}
        positions[20][10] = {x_coor: 20, y_coor: 10, terrain: "plains", owner: "", type: ""}
        positions[20][11] = {x_coor: 20, y_coor: 11, terrain: "plains", owner: "", type: ""}
        positions[20][12] = {x_coor: 20, y_coor: 12, terrain: "plains", owner: "", type: ""}
        positions[20][13] = {x_coor: 20, y_coor: 13, terrain: "plains", owner: "", type: ""}
        positions[20][14] = {x_coor: 20, y_coor: 14, terrain: "plains", owner: "", type: ""}
        positions[20][15] = {x_coor: 20, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[20][16] = {x_coor: 20, y_coor: 16, terrain: "lake", owner: "", type: ""}
        positions[20][17] = {x_coor: 20, y_coor: 17, terrain: "lake", owner: "", type: ""}
        positions[20][18] = {x_coor: 20, y_coor: 18, terrain: "lake", owner: "", type: ""}
        positions[20][19] = {x_coor: 20, y_coor: 19, terrain: "lake", owner: "", type: ""}
        positions[20][20] = {x_coor: 20, y_coor: 20, terrain: "plains", owner: "", type: ""}
        positions[20][21] = {x_coor: 20, y_coor: 21, terrain: "plains", owner: "", type: ""}
        positions[20][22] = {x_coor: 20, y_coor: 22, terrain: "plains", owner: "", type: ""}
        positions[20][23] = {x_coor: 20, y_coor: 23, terrain: "plains", owner: "", type: ""}
        positions[20][24] = {x_coor: 20, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[21] = [];
        positions[21][0] = {x_coor: 21, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[21][1] = {x_coor: 21, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[21][2] = {x_coor: 21, y_coor: 2, terrain: "plains", owner: "", type: ""}
        positions[21][3] = {x_coor: 21, y_coor: 3, terrain: "plains", owner: "", type: ""}
        positions[21][4] = {x_coor: 21, y_coor: 4, terrain: "plains", owner: "", type: ""}
        positions[21][5] = {x_coor: 21, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[21][6] = {x_coor: 21, y_coor: 6, terrain: "plains", owner: "", type: ""}
        positions[21][7] = {x_coor: 21, y_coor: 7, terrain: "forest", owner: "", type: ""}
        positions[21][8] = {x_coor: 21, y_coor: 8, terrain: "forest", owner: "", type: ""}
        positions[21][9] = {x_coor: 21, y_coor: 9, terrain: "plains", owner: "", type: ""}
        positions[21][10] = {x_coor: 21, y_coor: 10, terrain: "plains", owner: "", type: ""}
        positions[21][11] = {x_coor: 21, y_coor: 11, terrain: "plains", owner: "", type: ""}
        positions[21][12] = {x_coor: 21, y_coor: 12, terrain: "plains", owner: "", type: ""}
        positions[21][13] = {x_coor: 21, y_coor: 13, terrain: "plains", owner: "", type: ""}
        positions[21][14] = {x_coor: 21, y_coor: 14, terrain: "plains", owner: "", type: ""}
        positions[21][15] = {x_coor: 21, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[21][16] = {x_coor: 21, y_coor: 16, terrain: "lake", owner: "", type: ""}
        positions[21][17] = {x_coor: 21, y_coor: 17, terrain: "lake", owner: "", type: ""}
        positions[21][18] = {x_coor: 21, y_coor: 18, terrain: "lake", owner: "", type: ""}
        positions[21][19] = {x_coor: 21, y_coor: 19, terrain: "lake", owner: "", type: ""}
        positions[21][20] = {x_coor: 21, y_coor: 20, terrain: "plains", owner: "", type: ""}
        positions[21][21] = {x_coor: 21, y_coor: 21, terrain: "plains", owner: "", type: ""}
        positions[21][22] = {x_coor: 21, y_coor: 22, terrain: "plains", owner: "", type: ""}
        positions[21][23] = {x_coor: 21, y_coor: 23, terrain: "plains", owner: "", type: ""}
        positions[21][24] = {x_coor: 21, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[22] = [];
        positions[22][0] = {x_coor: 22, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[22][1] = {x_coor: 22, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[22][2] = {x_coor: 22, y_coor: 2, terrain: "plains", owner: "", type: ""}
        positions[22][3] = {x_coor: 22, y_coor: 3, terrain: "plains", owner: "", type: ""}
        positions[22][4] = {x_coor: 22, y_coor: 4, terrain: "plains", owner: "", type: ""}
        positions[22][5] = {x_coor: 22, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[22][6] = {x_coor: 22, y_coor: 6, terrain: "plains", owner: "", type: ""}
        positions[22][7] = {x_coor: 22, y_coor: 7, terrain: "plains", owner: "", type: ""}
        positions[22][8] = {x_coor: 22, y_coor: 8, terrain: "forest", owner: "", type: ""}
        positions[22][9] = {x_coor: 22, y_coor: 9, terrain: "plains", owner: "", type: ""}
        positions[22][10] = {x_coor: 22, y_coor: 10, terrain: "plains", owner: "", type: ""}
        positions[22][11] = {x_coor: 22, y_coor: 11, terrain: "plains", owner: "", type: ""}
        positions[22][12] = {x_coor: 22, y_coor: 12, terrain: "plains", owner: "", type: ""}
        positions[22][13] = {x_coor: 22, y_coor: 13, terrain: "plains", owner: "", type: ""}
        positions[22][14] = {x_coor: 22, y_coor: 14, terrain: "plains", owner: "", type: ""}
        positions[22][15] = {x_coor: 22, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[22][16] = {x_coor: 22, y_coor: 16, terrain: "plains", owner: "", type: ""}
        positions[22][17] = {x_coor: 22, y_coor: 17, terrain: "lake", owner: "", type: ""}
        positions[22][18] = {x_coor: 22, y_coor: 18, terrain: "lake", owner: "", type: ""}
        positions[22][19] = {x_coor: 22, y_coor: 19, terrain: "lake", owner: "", type: ""}
        positions[22][20] = {x_coor: 22, y_coor: 20, terrain: "plains", owner: "", type: ""}
        positions[22][21] = {x_coor: 22, y_coor: 21, terrain: "plains", owner: "", type: ""}
        positions[22][22] = {x_coor: 22, y_coor: 22, terrain: "plains", owner: "", type: ""}
        positions[22][23] = {x_coor: 22, y_coor: 23, terrain: "plains", owner: "", type: ""}
        positions[22][24] = {x_coor: 22, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[23] = [];
        positions[23][0] = {x_coor: 23, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[23][1] = {x_coor: 23, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[23][2] = {x_coor: 23, y_coor: 2, terrain: "plains", owner: "", type: ""}
        positions[23][3] = {x_coor: 23, y_coor: 3, terrain: "plains", owner: "", type: ""}
        positions[23][4] = {x_coor: 23, y_coor: 4, terrain: "plains", owner: "", type: ""}
        positions[23][5] = {x_coor: 23, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[23][6] = {x_coor: 23, y_coor: 6, terrain: "plains", owner: "", type: ""}
        positions[23][7] = {x_coor: 23, y_coor: 7, terrain: "plains", owner: "", type: ""}
        positions[23][8] = {x_coor: 23, y_coor: 8, terrain: "plains", owner: "", type: ""}
        positions[23][9] = {x_coor: 23, y_coor: 9, terrain: "plains", owner: "", type: ""}
        positions[23][10] = {x_coor: 23, y_coor: 10, terrain: "plains", owner: "", type: ""}
        positions[23][11] = {x_coor: 23, y_coor: 11, terrain: "plains", owner: "", type: ""}
        positions[23][12] = {x_coor: 23, y_coor: 12, terrain: "plains", owner: "", type: ""}
        positions[23][13] = {x_coor: 23, y_coor: 13, terrain: "plains", owner: "", type: ""}
        positions[23][14] = {x_coor: 23, y_coor: 14, terrain: "plains", owner: "", type: ""}
        positions[23][15] = {x_coor: 23, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[23][16] = {x_coor: 23, y_coor: 16, terrain: "plains", owner: "", type: ""}
        positions[23][17] = {x_coor: 23, y_coor: 17, terrain: "lake", owner: "", type: ""}
        positions[23][18] = {x_coor: 23, y_coor: 18, terrain: "lake", owner: "", type: ""}
        positions[23][19] = {x_coor: 23, y_coor: 19, terrain: "plains", owner: "", type: ""}
        positions[23][20] = {x_coor: 23, y_coor: 20, terrain: "plains", owner: "", type: ""}
        positions[23][21] = {x_coor: 23, y_coor: 21, terrain: "plains", owner: "", type: ""}
        positions[23][22] = {x_coor: 23, y_coor: 22, terrain: "plains", owner: "", type: ""}
        positions[23][23] = {x_coor: 23, y_coor: 23, terrain: "plains", owner: "", type: ""}
        positions[23][24] = {x_coor: 23, y_coor: 24, terrain: "plains", owner: "", type: ""}

        positions[24] = [];
        positions[24][0] = {x_coor: 24, y_coor: 0, terrain: "plains", owner: "", type: ""}
        positions[24][1] = {x_coor: 24, y_coor: 1, terrain: "plains", owner: "", type: ""}
        positions[24][2] = {x_coor: 24, y_coor: 2, terrain: "plains", owner: "", type: ""}
        positions[24][3] = {x_coor: 24, y_coor: 3, terrain: "plains", owner: "", type: ""}
        positions[24][4] = {x_coor: 24, y_coor: 4, terrain: "plains", owner: "", type: ""}
        positions[24][5] = {x_coor: 24, y_coor: 5, terrain: "plains", owner: "", type: ""}
        positions[24][6] = {x_coor: 24, y_coor: 6, terrain: "plains", owner: "", type: ""}
        positions[24][7] = {x_coor: 24, y_coor: 7, terrain: "plains", owner: "", type: ""}
        positions[24][8] = {x_coor: 24, y_coor: 8, terrain: "plains", owner: "", type: ""}
        positions[24][9] = {x_coor: 24, y_coor: 9, terrain: "plains", owner: "", type: ""}
        positions[24][10] = {x_coor: 24, y_coor: 10, terrain: "plains", owner: "", type: ""}
        positions[24][11] = {x_coor: 24, y_coor: 11, terrain: "plains", owner: "", type: ""}
        positions[24][12] = {x_coor: 24, y_coor: 12, terrain: "plains", owner: "", type: ""}
        positions[24][13] = {x_coor: 24, y_coor: 13, terrain: "plains", owner: "", type: ""}
        positions[24][14] = {x_coor: 24, y_coor: 14, terrain: "plains", owner: "", type: ""}
        positions[24][15] = {x_coor: 24, y_coor: 15, terrain: "plains", owner: "", type: ""}
        positions[24][16] = {x_coor: 24, y_coor: 16, terrain: "plains", owner: "", type: ""}
        positions[24][17] = {x_coor: 24, y_coor: 17, terrain: "plains", owner: "", type: ""}
        positions[24][18] = {x_coor: 24, y_coor: 18, terrain: "plains", owner: "", type: ""}
        positions[24][19] = {x_coor: 24, y_coor: 19, terrain: "plains", owner: "", type: ""}
        positions[24][20] = {x_coor: 24, y_coor: 20, terrain: "plains", owner: "", type: ""}
        positions[24][21] = {x_coor: 24, y_coor: 21, terrain: "plains", owner: "", type: ""}
        positions[24][22] = {x_coor: 24, y_coor: 22, terrain: "plains", owner: "", type: ""}
        positions[24][23] = {x_coor: 24, y_coor: 23, terrain: "plains", owner: "", type: ""}
        positions[24][24] = {x_coor: 24, y_coor: 24, terrain: "plains", owner: "", type: ""}

        return positions;
    }
}