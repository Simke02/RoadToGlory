import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import {
    createMap,
    forMember,
    mapFrom,
    Mapper,
    MappingProfile,
    mapWith,
  } from "@automapper/core";
import { UserCreateDto } from "src/common/models/user/dto/user-create.dto";
import { User } from "src/common/models/user/user.entity";
import { MeUserInfoDto } from "src/common/models/user/dto/me-user-info.dto";

export class UserAutomapperProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
      super(mapper);
    }

    get profile(): MappingProfile {
        return (mapper) => {
          createMap(
            mapper,
            UserCreateDto,
            User,
          );
          createMap(
            mapper,
            User,
            MeUserInfoDto
          );
        }
    }

}