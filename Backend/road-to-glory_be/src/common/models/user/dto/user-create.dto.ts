import { AutoMap } from "@automapper/classes";
import { MinLength, ValidateNested } from "class-validator";

export class UserCreateDto{
    @AutoMap()
    @MinLength(6)
    username: string;

    @AutoMap()
    @MinLength(6)
    password: string;


    @AutoMap()
    firstName: string;
    
    @AutoMap()
    lastName: string;
    
}