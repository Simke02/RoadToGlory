import { AutoMap } from "@automapper/classes";

export class MeUserInfoDto {
  @AutoMap()
  username: string;
}