export interface Position{
    x_coor: number;
    y_coor: number;
    terrain: string;
    owner: string;
    type: string; //Sta se nalazi na polju (city, unit, facility, resource)
}