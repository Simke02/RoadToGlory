import { UserInfo } from "./user_info.dto";

export interface AuthDto {
    me: UserInfo;  // Assuming `me` is user data; you should type this based on your `me` object structure.
    token: string;
  }