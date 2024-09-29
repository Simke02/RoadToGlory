export interface Unit{
    //id:number;
    //type:string;


    //Mozda da stavis neki bool dal je gotov potez za njega
    x_coor: number;
    y_coor: number;
    health: number;
    strenght: number;
    range: number;
    steps: number;
    steps_left: number;
    upgrade: string;
    can_attack: boolean;  // Da li moze da izvrsi napad u tom potezu
    //On je na pocetku poteza false i mora prvo da se odradi provera da se vidi da li moze
}