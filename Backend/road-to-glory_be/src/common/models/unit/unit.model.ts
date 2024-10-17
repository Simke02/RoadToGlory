export interface Unit{
    id:number;
    x_coor: number;
    y_coor: number;
    health: number;
    strenght: number;
    range: number;
    steps: number;
    steps_left: number;
    upgrade: string;
    finished_turn: boolean;  //Da li je istrosio potez
    icon: string;

    //type:string;
}