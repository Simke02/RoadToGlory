import { City } from "../city/city.model";

export interface CreateGameDto {
    first_player: string;
    first_city: City;
    second_player: string;
    second_city: City;
}