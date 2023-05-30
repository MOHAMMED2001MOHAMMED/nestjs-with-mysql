import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class RoleGuards implements CanActivate  {
    constructor(private readonly allowedRoles: string[]){}
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const userRole = request.user.role;
    
        return this.allowedRoles.includes(userRole);
   }
}