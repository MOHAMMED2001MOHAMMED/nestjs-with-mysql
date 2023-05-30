import { Injectable } from "@nestjs/common";
import { Payload } from "./payload";
import { sign } from 'jsonwebtoken';
import { UsersService } from "src/users/users.service";
@Injectable()
export class AuthService {
    constructor(private userService: UsersService){}
    async signPayload(payload: Payload) {
        return sign(payload,'Test',{ expiresIn :'12h'})
    }
    async validate(payload: Payload) {
        return await this.userService.findByPayload(payload);
    }
}